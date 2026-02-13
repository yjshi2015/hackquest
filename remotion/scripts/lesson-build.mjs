import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import crypto from "node:crypto";

import { resolveDefaultLessonRoot } from "./lib/default-lesson-root.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..", "..");
const coursesRoot = path.join(repoRoot, "courses");

const args = process.argv.slice(2);
const getArg = (flag) => {
  const index = args.indexOf(flag);
  if (index === -1) return null;
  return args[index + 1] ?? null;
};

const hasFlag = (flag) => args.includes(flag);

const defaultLessonRoot = await resolveDefaultLessonRoot(coursesRoot);
const lessonRoot = getArg("--lesson-root")
  ? path.resolve(getArg("--lesson-root"))
  : defaultLessonRoot;

const skipTts = hasFlag("--skip-tts");
const sourceDir = path.join(lessonRoot, "source");
const generatedDir = path.join(lessonRoot, "generated");

const run = (scriptName, extraArgs = []) => {
  const scriptPath = path.join(scriptDir, scriptName);
  const result = spawnSync("bun", [scriptPath, ...extraArgs], {
    stdio: "inherit",
  });
  if (result.status !== 0) {
    throw new Error(
      `Failed: bun ${path.relative(repoRoot, scriptPath)} ${extraArgs.join(" ")}`,
    );
  }
};

const sha256 = (value) =>
  crypto.createHash("sha256").update(String(value)).digest("hex");

const readJsonIfExists = async (p) => {
  try {
    const raw = await fs.readFile(p, "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const exists = async (p) => {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
};

const resolveTtsOutputDir = async (configPath) => {
  const config = await readJsonIfExists(configPath);
  if (!config) return null;

  const configDir = path.dirname(configPath);
  const lessonRootFromConfig = path.resolve(configDir, "..");
  const outputDirRaw = String(config.outputDir ?? "").trim();
  if (!outputDirRaw) return null;

  const outputDir = path.isAbsolute(outputDirRaw)
    ? outputDirRaw
    : outputDirRaw.replace(/\\/g, "/").startsWith("courses/")
      ? path.join(repoRoot, outputDirRaw)
      : path.join(lessonRootFromConfig, outputDirRaw);

  return { configPath, config, outputDir };
};

const pickTtsScriptName = (ttsConfig) => {
  const provider = String(ttsConfig?.provider ?? "minimax").trim().toLowerCase();
  if (!provider || provider === "minimax") return "tts-minimax.mjs";
  if (provider === "doubao") return "tts-doubao.mjs";
  if (provider === "google") return "tts-google.mjs";
  throw new Error(
    `Unsupported TTS provider "${provider}". Supported: minimax, doubao, google.`,
  );
};

const readSegments = async (segmentsPath) => {
  const segments = await readJsonIfExists(segmentsPath);
  if (!Array.isArray(segments)) return [];
  return segments
    .map((s) => ({ id: Number(s.id), text: String(s.text ?? "") }))
    .filter((s) => Number.isFinite(s.id) && s.id > 0 && s.text.trim());
};

const detectLangFromScriptFilename = (filename) => {
  if (filename === "script.md" || filename === "script.json") return "en";
  const match = /^script-([a-z0-9-]+)\.(md|json)$/i.exec(filename);
  return match ? match[1].toLowerCase() : null;
};

const listScriptVariants = async () => {
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });
  const byLang = new Map();

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const lang = detectLangFromScriptFilename(entry.name);
    if (!lang) continue;
    const current = byLang.get(lang) ?? {};
    const abs = path.join(sourceDir, entry.name);
    if (entry.name.endsWith(".md")) current.md = abs;
    if (entry.name.endsWith(".json")) current.json = abs;
    byLang.set(lang, current);
  }

  const variants = [];
  for (const [lang, files] of byLang.entries()) {
    variants.push({
      lang,
      scriptPath: files.md ?? files.json,
      segmentsPath: path.join(generatedDir, `voiceover-${lang}-segments.json`),
      timingsPath: path.join(
        generatedDir,
        `voiceover-${lang}-segment-timings.json`,
      ),
      captionsPath:
        lang === "en"
          ? path.join(generatedDir, "captions", "lines.json")
          : path.join(generatedDir, "captions", `lines-${lang}.json`),
      mergedAudioPath:
        lang === "en"
          ? path.join(generatedDir, "audio", "voiceover.mp3")
          : path.join(generatedDir, "audio", `voiceover-${lang}.mp3`),
      configPath: path.join(sourceDir, `voiceover-${lang}-tts-config.json`),
    });
  }

  variants.sort((a, b) => {
    if (a.lang === "en") return -1;
    if (b.lang === "en") return 1;
    return a.lang.localeCompare(b.lang);
  });
  return variants;
};

const ensureIncrementalTtsInputs = async ({ lessonRootAbs, segments, tts }) => {
  const segmentsDir = tts.outputDir;
  await fs.mkdir(segmentsDir, { recursive: true });

  // Hash all synthesis-impacting fields and ignore output directory only.
  const { outputDir: _outputDir, ...ttsFingerprint } = tts.config ?? {};
  const configHash = sha256(JSON.stringify(ttsFingerprint));

  const manifestPath = path.join(segmentsDir, ".tts-manifest.json");
  const previous = await readJsonIfExists(manifestPath);
  const prevSegments =
    previous?.segments && typeof previous.segments === "object"
      ? previous.segments
      : {};

  const desired = {};
  const presentIds = new Set();

  for (const seg of segments) {
    const key = String(seg.id).padStart(3, "0");
    presentIds.add(key);
    desired[key] = sha256(`${configHash}\n${seg.text}`);
  }

  // If we have a previous manifest, delete only the mp3s that are now stale.
  if (
    previous &&
    previous.version === 1 &&
    typeof previous.configHash === "string"
  ) {
    for (const [id, oldHash] of Object.entries(prevSegments)) {
      const newHash = desired[id];
      const shouldDelete =
        !newHash || (typeof oldHash === "string" && oldHash !== newHash);
      if (!shouldDelete) continue;
      const mp3 = path.join(segmentsDir, `${id}.mp3`);
      try {
        // eslint-disable-next-line no-await-in-loop
        await fs.unlink(mp3);
      } catch {
        // ignore
      }
    }
  }

  // Also delete mp3 files for segments that no longer exist (manifest-less cleanup).
  // This prevents merge/timings from using orphaned audio if IDs were removed.
  try {
    const entries = await fs.readdir(segmentsDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isFile()) continue;
      const m = /^(\d{3})\.mp3$/.exec(entry.name);
      if (!m) continue;
      const id = m[1];
      if (presentIds.has(id)) continue;
      // eslint-disable-next-line no-await-in-loop
      await fs.unlink(path.join(segmentsDir, entry.name));
    }
  } catch {
    // ignore
  }

  const nextManifest = {
    version: 1,
    configHash,
    segments: desired,
  };
  await fs.writeFile(
    manifestPath,
    JSON.stringify(nextManifest, null, 2),
    "utf8",
  );
};

const ensureAllAudioSegmentsExist = async ({ segments, segmentsDir }) => {
  const missing = [];
  for (const seg of segments) {
    const id = String(seg.id).padStart(3, "0");
    const mp3 = path.join(segmentsDir, `${id}.mp3`);
    // eslint-disable-next-line no-await-in-loop
    if (!(await exists(mp3))) missing.push(`${id}.mp3`);
  }
  if (missing.length) {
    throw new Error(
      `Missing ${missing.length} TTS segment(s) under ${segmentsDir}: ${missing.slice(0, 8).join(", ")}`,
    );
  }
};

const variants = await listScriptVariants();
if (!variants.length) {
  throw new Error(
    `No script variants found under ${sourceDir}. Expected script.md or script-<lang>.md/json`,
  );
}

// Validate only canonical English script to preserve existing checks.
const hasEn = variants.some((v) => v.lang === "en");
if (hasEn) {
  const enTimingsPath = path.join(
    generatedDir,
    "voiceover-en-segment-timings.json",
  );
  if (await exists(enTimingsPath)) {
    run("validate-script.mjs", ["--lesson-root", lessonRoot]);
  } else {
    console.log(
      `Skip validate-script: missing ${path.relative(repoRoot, enTimingsPath)} on clean build.`,
    );
  }
}

for (const variant of variants) {
  const segmentsDirDefault =
    variant.lang === "en"
      ? path.join(lessonRoot, "generated", "audio", "segments")
      : path.join(lessonRoot, "generated", "audio", `segments-${variant.lang}`);

  // 1) Build language-specific segments from matching script source.
  run("build-segments-from-script.mjs", [
    "--lesson-root",
    lessonRoot,
    "--script",
    variant.scriptPath,
    "--out",
    variant.segmentsPath,
  ]);

  const segments = await readSegments(variant.segmentsPath);
  if (!segments.length) {
    throw new Error(
      `No segments found for lang=${variant.lang}: ${variant.segmentsPath}`,
    );
  }

  // 2) TTS per language (if config exists).
  const tts = await resolveTtsOutputDir(variant.configPath);
  if (!tts && !skipTts) {
    throw new Error(
      `Missing TTS config for lang=${variant.lang}: ${variant.configPath}. ` +
        "Add this file or run with --skip-tts only when audio already exists.",
    );
  }
  if (!skipTts && tts) {
    await ensureIncrementalTtsInputs({
      lessonRootAbs: lessonRoot,
      segments,
      tts,
    });
    run(pickTtsScriptName(tts.config), [
      "--lesson-root",
      lessonRoot,
      "--config",
      tts.configPath,
      "--segments",
      variant.segmentsPath,
    ]);
  }

  // 3) Merge voiceover + timings + captions for each language.
  const segmentsDir = tts?.outputDir ?? segmentsDirDefault;
  if (!skipTts) {
    await ensureAllAudioSegmentsExist({ segments, segmentsDir });
    run("merge-voiceover.mjs", [
      "--lesson-root",
      lessonRoot,
      "--segments",
      variant.segmentsPath,
      "--audio-dir",
      segmentsDir,
      "--out",
      variant.mergedAudioPath,
    ]);
  }
  run("build-segment-timings.mjs", [
    "--lesson-root",
    lessonRoot,
    "--segments",
    variant.segmentsPath,
    "--segments-dir",
    segmentsDir,
    "--output",
    variant.timingsPath,
    ...(skipTts ? ["--estimate-duration-ms", "6000"] : []),
  ]);
  if (!skipTts) {
    run("build-line-captions.mjs", [
      "--lesson-root",
      lessonRoot,
      "--segments",
      variant.segmentsPath,
      "--audio-dir",
      segmentsDir,
      "--out",
      variant.captionsPath,
    ]);
  }
}

run("build-lesson-manifest.mjs");

console.log(
  `Lesson build complete for ${variants.length} variant(s): ${variants.map((v) => v.lang).join(", ")}. Manifest refreshed.`,
);
