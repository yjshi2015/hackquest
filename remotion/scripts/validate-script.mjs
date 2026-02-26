import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

import {parseScriptMd} from '../src/storyboard/parse-script-md.ts';
import {legacyCardNameMap} from '../src/storyboard/legacy-names.ts';
import {resolveDefaultLessonRoot} from './lib/default-lesson-root.mjs';
import {resolveMetaFileAbsPath} from './lib/resolve-meta-path.mjs';
import {z} from 'zod';

// Bun can import TS directly; this keeps runtime + build-time schema in sync.
import {registry as storyboardComponentsRegistry} from '../src/storyboard/registry.ts';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..', '..');
const coursesRoot = path.join(repoRoot, 'courses');

const args = process.argv.slice(2);
const getArg = (flag) => {
  const index = args.indexOf(flag);
  if (index === -1) return null;
  return args[index + 1] ?? null;
};

const defaultLessonRoot = await resolveDefaultLessonRoot(coursesRoot);

const lessonRoot = path.resolve(getArg('--lesson-root') ?? defaultLessonRoot);

const metaPath = path.join(lessonRoot, 'source', 'lesson.meta.json');
const mdPath = path.join(lessonRoot, 'source', 'script.md');
const jsonPath = path.join(lessonRoot, 'source', 'script.json');
let scriptPath = mdPath;
try {
  await fs.access(mdPath);
} catch {
  scriptPath = jsonPath;
}

const meta = JSON.parse(await fs.readFile(metaPath, 'utf8'));
const scriptRaw = await fs.readFile(scriptPath, 'utf8');
const script = scriptPath.toLowerCase().endsWith('.md')
  ? {segments: parseScriptMd(scriptRaw)}
  : JSON.parse(scriptRaw);

if (!meta.id || typeof meta.id !== 'string') {
  throw new Error(`Invalid meta.id in ${metaPath}`);
}
if (!meta.assets?.segmentTimings) {
  throw new Error(`Missing meta.assets.segmentTimings in ${metaPath}`);
}
if (!Array.isArray(script.segments) || script.segments.length === 0) {
  throw new Error(`No segments in ${scriptPath}`);
}

const scriptIds = script.segments.map((s) => Number(s.id)).filter((n) => Number.isFinite(n));
const scriptSet = new Set(scriptIds);
if (scriptSet.size !== scriptIds.length) {
  throw new Error(`Duplicate segment ids in ${scriptPath}`);
}

const timingsPath =
  resolveMetaFileAbsPath({
    repoRoot,
    coursesRoot,
    metaAbsPath: metaPath,
    value: meta.assets.segmentTimings,
  }) ?? path.join(coursesRoot, meta.assets.segmentTimings);
const timings = JSON.parse(await fs.readFile(timingsPath, 'utf8'));
const timingIds = (Array.isArray(timings) ? timings : []).map((t) => Number(t.id));
const timingSet = new Set(timingIds);

const missingInTimings = scriptIds.filter((id) => !timingSet.has(id)).sort((a, b) => a - b);
const extraInTimings = timingIds.filter((id) => !scriptSet.has(id)).sort((a, b) => a - b);
if (missingInTimings.length) {
  throw new Error(
    `Timings missing ids from script: ${missingInTimings.slice(0, 10).join(', ')}`,
  );
}
if (extraInTimings.length) {
  throw new Error(
    `Timings has extra ids not in script: ${extraInTimings.slice(0, 10).join(', ')}`,
  );
}

const timingsById = new Map(
  (Array.isArray(timings) ? timings : []).map((t) => [Number(t.id), t]),
);

/**
 * Try to resolve a relative asset path to an absolute location and check it exists on disk.
 * Returns null if the file exists (or we can't determine the path), or an error
 * string if the file is clearly missing.
 */
const checkAssetExists = async (assetPath, metaAbsPath) => {
  if (!assetPath) return null;
  if (/^https?:\/\//i.test(assetPath)) return null; // remote URL, skip
  const lessonSourceDir = path.dirname(metaAbsPath);
  const lessonRoot2 = path.dirname(lessonSourceDir);
  const candidates = [
    path.resolve(lessonRoot2, assetPath),
    path.resolve(lessonSourceDir, assetPath),
    path.resolve(repoRoot, 'remotion', '.hq-public', assetPath),
  ];
  for (const c of candidates) {
    try {
      await fs.access(c);
      return null; // found
    } catch { /* next */ }
  }
  return `Asset file not found: "${assetPath}" (checked ${candidates.length} locations)`;
};

const ChartSchema = z
  .object({
    title: z.string(),
    series: z.array(z.object({label: z.string(), value: z.number()})),
    maxValue: z.number().optional(),
  })
  .passthrough();

const formatZodIssues = (err) => {
  const issues = err?.issues;
  if (!Array.isArray(issues) || issues.length === 0) return String(err?.message ?? err);
  return issues
    .slice(0, 12)
    .map((i) => `${i.path?.length ? i.path.join('.') : '(root)'}: ${i.message}`)
    .join('; ');
};

const pathToString = (parts) =>
  parts
    .map((p) => (typeof p === 'number' ? `[${p}]` : String(p)))
    .join('.');

const countWords = (input) => {
  const normalized = String(input ?? '')
    .replace(/[\u3000\t\r\n]+/g, ' ')
    .trim();
  if (!normalized) return 0;
  return normalized.split(/\s+/u).length;
};

const textLimitsForPath = (parts) => {
  const key = String(parts[parts.length - 1] ?? '');
  const parent = String(parts[parts.length - 2] ?? '');

  if (key === 'code') return null;

  if (key === 'title' || key === 'term') {
    return {maxChars: 54, maxWords: 9, kind: 'title/term'};
  }

  if (key === 'subtitle' || key === 'definition' || key === 'message' || key === 'body') {
    return {maxChars: 120, maxWords: 22, kind: 'long text'};
  }

  if (key === 'text' || key === 'detail' || key === 'note' || key === 'verdict') {
    return {maxChars: 96, maxWords: 18, kind: 'bullet/detail'};
  }

  if (key === 'label' || key === 'badge' || key === 'eyebrow' || key === 'cn' || key === 'en') {
    return {maxChars: 36, maxWords: 6, kind: 'label'};
  }

  if (parent === 'rows') {
    return {maxChars: 36, maxWords: 6, kind: 'table cell'};
  }

  return {maxChars: 96, maxWords: 16, kind: 'text'};
};

const arrayItemLimits = {
  bullets: 4,
  notes: 4,
  explain: 4,
  steps: 5,
  items: 6,
  rows: 6,
};

const collectPropsDensityIssues = (props) => {
  const issues = [];

  const walk = (value, parts = []) => {
    if (typeof value === 'string') {
      const limits = textLimitsForPath(parts);
      if (!limits) return;

      const trimmed = value.trim();
      if (!trimmed) return;

      if (trimmed.length > limits.maxChars) {
        issues.push(
          `${pathToString(parts)} exceeds ${limits.maxChars} chars (${limits.kind}); split into shorter lines`,
        );
      }

      if (trimmed.includes(' ') && countWords(trimmed) > limits.maxWords) {
        issues.push(
          `${pathToString(parts)} exceeds ${limits.maxWords} words (${limits.kind}); avoid dense long sentences`,
        );
      }
      return;
    }

    if (Array.isArray(value)) {
      const key = String(parts[parts.length - 1] ?? '');
      const maxItems = arrayItemLimits[key];
      if (maxItems && value.length > maxItems) {
        issues.push(`${pathToString(parts)} has ${value.length} items (max ${maxItems})`);
      }

      value.forEach((item, idx) => walk(item, [...parts, idx]));
      return;
    }

    if (value && typeof value === 'object') {
      for (const [k, v] of Object.entries(value)) {
        walk(v, [...parts, k]);
      }
    }
  };

  walk(props, []);
  return issues;
};

const scriptSegments = script.segments ?? [];
const errors = [];
const warnings = [];

for (const seg of scriptSegments) {
  const id = Number(seg.id);
  const visual = seg.visual ?? {};
  const sceneType = String(visual.sceneType ?? '').toLowerCase();
  const componentName = visual.component ? String(visual.component).trim() : '';
  const json = visual.json;

  if (componentName) {
    const migratedName = legacyCardNameMap[componentName];
    if (migratedName) {
      errors.push(
        `Segment ${id}: Component "${componentName}" is deprecated. Use "${migratedName}" instead.`,
      );
      continue;
    }

    const def = storyboardComponentsRegistry[componentName];
    if (!def) {
      errors.push(
        `Segment ${id}: Unknown component "${componentName}". Add it to src/storyboard/registry.ts`,
      );
      continue;
    }
    if (!json || typeof json !== 'object') {
      errors.push(
        `Segment ${id}: Component "${componentName}" requires a \`\`\`json block with {"props": {...}}`,
      );
      continue;
    }
    const props = json?.props;
    if (!props || typeof props !== 'object' || Array.isArray(props)) {
      errors.push(
        `Segment ${id}: Component "${componentName}" requires JSON envelope {"props": {...}} (top-level props are not allowed)`,
      );
      continue;
    }

    const parsed = def.propsSchema.safeParse(props);
    if (!parsed.success) {
      errors.push(
        `Segment ${id}: Invalid props for "${componentName}": ${formatZodIssues(parsed.error)}`,
      );
      continue;
    }

    const densityIssues = collectPropsDensityIssues(parsed.data);
    if (densityIssues.length) {
      // Density issues are warnings, not hard errors — AI-generated content can be verbose
      warnings.push(
        `Segment ${id}: Props density for "${componentName}": ${densityIssues
          .slice(0, 8)
          .join('; ')}`,
      );
    }

    // ── appearAt range check: warn if any value exceeds segment duration ──
    const segTiming = timingsById.get(id);
    if (segTiming) {
      const segDurationSec = segTiming.durationMs / 1000;
      const collectAppearAt = (val, parts = []) => {
        if (val && typeof val === 'object' && !Array.isArray(val)) {
          for (const [k, v] of Object.entries(val)) {
            collectAppearAt(v, [...parts, k]);
          }
        } else if (Array.isArray(val)) {
          val.forEach((item, idx) => collectAppearAt(item, [...parts, idx]));
        } else if (typeof val === 'number') {
          const key = String(parts[parts.length - 1] ?? '');
          if (/appearAt/i.test(key) && val > segDurationSec) {
            warnings.push(
              `Segment ${id}: ${pathToString(parts)} = ${val}s exceeds segment duration (${segDurationSec.toFixed(1)}s)`,
            );
          }
        }
      };
      collectAppearAt(parsed.data);
    }

    // ── ArchitectureDiagram: cross-validate edge from/to against node IDs ──
    if (componentName === 'ArchitectureDiagram' && parsed.data.nodes && parsed.data.edges) {
      const nodeIds = new Set(parsed.data.nodes.map((n) => n.id));
      for (const edge of parsed.data.edges) {
        if (edge.from && !nodeIds.has(edge.from)) {
          errors.push(
            `Segment ${id}: ArchitectureDiagram edge "from" references unknown node "${edge.from}". Valid IDs: ${[...nodeIds].join(', ')}`,
          );
        }
        if (edge.to && !nodeIds.has(edge.to)) {
          errors.push(
            `Segment ${id}: ArchitectureDiagram edge "to" references unknown node "${edge.to}". Valid IDs: ${[...nodeIds].join(', ')}`,
          );
        }
      }
    }

    // ── Asset existence checks: inspect known props for file references ──
    const propsData = parsed.data;
    if (propsData.videoSrc && typeof propsData.videoSrc === 'string') {
      const missing = await checkAssetExists(propsData.videoSrc, metaPath);
      if (missing) warnings.push(`Segment ${id}: ${missing}`);
    }
    if (propsData.sidecarFile && typeof propsData.sidecarFile === 'string') {
      const missing = await checkAssetExists(propsData.sidecarFile, metaPath);
      if (missing) warnings.push(`Segment ${id}: ${missing}`);
    }
    if (Array.isArray(propsData.images)) {
      for (const img of propsData.images) {
        const src = typeof img === 'string' ? img : img?.src;
        if (src) {
          const missing = await checkAssetExists(src, metaPath);
          if (missing) warnings.push(`Segment ${id}: ${missing}`);
        }
      }
    }
    continue;
  }

  const isSlideLikeScene =
    /slide|outline|ppt|deck|card/.test(sceneType) ||
    Boolean(visual.markdown) ||
    Boolean(visual.sceneContent);
  if (isSlideLikeScene) {
    errors.push(
      `Segment ${id}: Slide/markdown scenes are disabled. Use "Component: <Name>" with JSON {"props": {...}}.`,
    );
    continue;
  }

  if (/video/.test(sceneType)) {
    errors.push(
      `Segment ${id}: Bare "Scene Type: Video" is deprecated. Use "Component: DemoOverlay" with {"props": {"videoSrc": "..."}}.`,
    );
    continue;
  }

  if (/chart|graph/.test(sceneType)) {
    if (!json || typeof json !== 'object') {
      errors.push(`Segment ${id}: Scene Type Chart requires a JSON block.`);
      continue;
    }
    const chartCandidate = json.chart ?? json;
    const chartParsed = ChartSchema.safeParse(chartCandidate);
    if (!chartParsed.success) {
      errors.push(`Segment ${id}: Invalid chart JSON: ${formatZodIssues(chartParsed.error)}`);
    }
  }
}

// ── Report ──
if (warnings.length) {
  console.warn(`\n⚠️  ${warnings.length} warning(s):`);
  for (const w of warnings) console.warn(`  ⚠️  ${w}`);
  console.warn('');
}
if (errors.length) {
  console.error(`\n❌ ${errors.length} error(s):`);
  for (const e of errors) console.error(`  ❌ ${e}`);
  console.error('');
  process.exit(1);
}
console.log('✅ Validation passed.');
