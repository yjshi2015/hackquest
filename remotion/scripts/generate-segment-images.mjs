#!/usr/bin/env bun
/**
 * generate-segment-images.mjs
 *
 * Directly calls Google GenAI API (no gemini CLI, no skill wrapper)
 * to generate images for segments with a `Prompt:` field in script.md.
 *
 * Models (pick via --model):
 *   gemini-3-pro-image-preview      — Nano Banana Pro, best quality + thinking (default)
 *   gemini-2.5-flash-image           — Nano Banana, fast/efficient
 *   imagen-4.0-ultra-generate-001    — Imagen 4 Ultra (dedicated, no thinking)
 *
 * Usage:
 *   GEMINI_API_KEY=... bun scripts/generate-segment-images.mjs --lesson-root <path>
 *   GEMINI_API_KEY=... bun scripts/generate-segment-images.mjs --lesson-root <path> --dry-run
 *   GEMINI_API_KEY=... bun scripts/generate-segment-images.mjs --lesson-root <path> --segment 3
 *   GEMINI_API_KEY=... bun scripts/generate-segment-images.mjs --lesson-root <path> --model gemini-2.0-flash-exp-image-generation
 *
 * Options:
 *   --lesson-root   Path to the lesson directory (required)
 *   --dry-run       Print prompts without generating
 *   --segment N     Only generate for segment N
 *   --force         Overwrite existing images
 *   --model NAME    Override model (default: gemini-3-pro-image-preview)
 *   --size  RES     Image resolution: 1K, 2K, 4K (default: 2K, Gemini 3 Pro only)
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {GoogleGenAI, Modality} from '@google/genai';

import {parseScriptMd} from '../src/storyboard/parse-script-md.ts';
import {resolveDefaultLessonRoot} from './lib/default-lesson-root.mjs';

// ────────────────────────────────────────────────────────────
// HackQuest visual style — baked into every image request
// Adapted from docs/notebooklm-video-prompt.md Prompt B
// ────────────────────────────────────────────────────────────
const HQ_STYLE_SYSTEM = `You are an image generation engine for HackQuest educational videos.
You MUST follow these visual rules with ZERO exceptions:

FORMAT: 1920×1080 landscape (16:9). Fill the full canvas.

PALETTE — ONLY these colors, nothing else:
  • Background: pure white #FFFFFF
  • All linework / text: black #0B0B0B
  • Secondary labels: dark gray #1A1A1A or medium gray #6B6B6B
  • ONE accent: yellow #FFE866 — used ONLY as a text highlight marker
  • NO other colors. No blue, no green, no red, no purple.

AESTHETIC: Modern editorial infographic — clean and precise.
  • Clean, uniform-weight vector lines — crisp and modern, NOT sketchy or hand-drawn
  • White background, high contrast, spacious
  • Feels like a premium tech publication illustration (like The Economist or Stripe's blog)

HEADLINE TEXT (when a title or statement appears):
  • Font: Noto Sans, bold weight
  • Large, sentence case — NOT all-caps
  • Key words highlighted with a yellow #FFE866 marker/highlighter effect behind the text
  • The highlight should look like a physical yellow marker swiped behind words

LABELS & ANNOTATIONS:
  • Font: Noto Sans, regular weight, smaller size, sentence case
  • Placed near the relevant illustration element
  • Connected by thin dashed arrows or lines when needed
  • Keep labels minimal — only essential terms

ILLUSTRATION STYLE: Clean 3D block objects with precise lines.
  • Objects rendered as clean rounded rectangular solids (blocks, containers, stacks)
  • Slight perspective — objects have visible top and side faces, like isometric-lite
  • Lines are uniform weight (2-3px), crisp, and perfectly clean — NO wobble or roughness
  • Internal detail: small clean line icons (gears, arrows, coins, locks) drawn INSIDE objects
  • Objects can be stacked, connected, or arranged to form visual metaphors
  • Think: modern vector illustration, NOT hand-drawn sketch

LAYOUT:
  • Headline/statement text at top (if applicable)
  • Illustrations centered below, with generous whitespace
  • Multiple concepts separated by thin vertical or horizontal divider lines
  • Each concept cluster gets a centered label underneath
  • Overall composition: balanced, editorial, magazine-quality
  • NO border, frame, or outline around the image edges — content bleeds to white

CONCEPTUAL APPROACH:
  • Use visual METAPHORS, not literal diagrams
  • Example: a stack of blocks = fragile system; a locked vault = security
  • Arrows, loops, and flow indicators in clean vector style
  • Every visual element must map to a concept from the voiceover

ICONS (inside illustrations):
  • Small, clean line icons — gears, locks, coins, arrows, calculators
  • Uniform stroke weight, precise geometry
  • Monochrome black stroke only

BANNED — hard no, ZERO tolerance:
  ✗ No shadows or drop-shadows
  ✗ No color gradients
  ✗ No photographs or photorealistic rendering
  ✗ No hand-drawn, sketchy, or rough linework — lines must be clean and precise
  ✗ No glitch, neon, particles, cyberpunk, or sci-fi decoration
  ✗ No crypto logos, token icons, or brand marks
  ✗ No "tech feel" backgrounds (circuits, data streams, matrix rain)
  ✗ No logo, watermark, branding, captions, subtitles, or UI chrome
  ✗ No decorative clutter — every element must map to the concept
  ✗ No all-caps headlines — use sentence case
  ✗ No yellow fill on shapes — yellow is ONLY for text highlight markers
  ✗ No border, frame, or outline around the image canvas — edges must be clean white

QUALITY CHECK before outputting:
  ✓ Background is pure white?
  ✓ Only black/gray linework + yellow text highlights?
  ✓ Lines are clean, uniform, and precise — not sketchy?
  ✓ Objects have slight 3D depth (visible top/side faces)?
  ✓ Yellow used only as text marker highlight, never as shape fill?
  ✓ Headlines are Noto Sans bold, sentence case, with yellow-highlighted key words?
  ✓ Labels are small Noto Sans regular?
  ✓ Overall feels like a modern editorial tech illustration?`;

// ────────────────────────────────────────────────────────────
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..', '..');
const coursesRoot = path.join(repoRoot, 'courses');

// ── CLI args ──
const args = process.argv.slice(2);
const getArg = (flag) => {
  const idx = args.indexOf(flag);
  return idx === -1 ? null : (args[idx + 1] ?? null);
};
const hasFlag = (flag) => args.includes(flag);

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('✗ GEMINI_API_KEY env var is required.');
  process.exit(1);
}

const defaultLessonRoot = await resolveDefaultLessonRoot(coursesRoot);
const lessonRoot = path.resolve(getArg('--lesson-root') ?? defaultLessonRoot);
const dryRun = hasFlag('--dry-run');
const force = hasFlag('--force');
const onlySegment = getArg('--segment') ? Number(getArg('--segment')) : null;

const DEFAULT_MODEL = 'gemini-3-pro-image-preview';
const model = getArg('--model') ?? DEFAULT_MODEL;
const imageSize = getArg('--size') ?? '2K'; // 1K, 2K, 4K (Gemini 3 Pro only)
const isImagen = /^imagen/i.test(model);

// ── Parse script ──
const scriptPath = path.join(lessonRoot, 'source', 'script.md');
const raw = await fs.readFile(scriptPath, 'utf8');
const segments = parseScriptMd(raw);

const promptSegments = segments.filter((seg) => {
  if (!seg.visual?.prompt) return false;
  if (onlySegment !== null && seg.id !== onlySegment) return false;
  return true;
});

if (!promptSegments.length) {
  console.log('No segments with Prompt: fields found.');
  process.exit(0);
}

// ── Output dir ──
const outDir = path.join(lessonRoot, 'assets', 'generated');
await fs.mkdir(outDir, {recursive: true});

// ── Init SDK ──
const ai = new GoogleGenAI({apiKey});

console.log(`┌─ generate-segment-images ─────────────────────`);
console.log(`│ Lesson:   ${path.relative(repoRoot, lessonRoot)}`);
console.log(`│ Model:    ${model}`);
console.log(`│ Strategy: ${isImagen ? 'Imagen (dedicated image gen)' : 'Gemini multimodal (generateContent)'}`);
console.log(`│ Size:     ${isImagen ? 'N/A' : imageSize} (16:9)`);
console.log(`│ Segments: ${promptSegments.map((s) => s.id).join(', ')}`);
console.log(`│ Force:    ${force}`);
console.log(`└────────────────────────────────────────────────\n`);

// ────────────────────────────────────────────────────────────
// Imagen API — dedicated image generation
// ────────────────────────────────────────────────────────────
async function generateWithImagen(prompt, outFile) {
  // Imagen takes a single prompt string — prepend style rules
  const fullPrompt = HQ_STYLE_SYSTEM + '\n\nGENERATE THIS:\n' + prompt;

  const response = await ai.models.generateImages({
    model,
    prompt: fullPrompt,
    config: {
      numberOfImages: 1,
      aspectRatio: '16:9',
    },
  });

  const img = response.generatedImages?.[0];
  if (!img?.image?.imageBytes) {
    throw new Error('No image bytes in Imagen response');
  }
  const buf = Buffer.from(img.image.imageBytes, 'base64');
  await fs.writeFile(outFile, buf);
  return buf.length;
}

// ────────────────────────────────────────────────────────────
// Gemini multimodal — generateContent with IMAGE modality
// Supports gemini-3-pro-image-preview (Nano Banana Pro) with
// imageConfig for aspectRatio + imageSize (1K/2K/4K).
// Filters out "thought" parts to get the final rendered image.
// ────────────────────────────────────────────────────────────
async function generateWithGemini(prompt, outFile) {
  const response = await ai.models.generateContent({
    model,
    contents: [
      {
        role: 'user',
        parts: [
          {text: HQ_STYLE_SYSTEM + '\n\nGENERATE THIS IMAGE:\n' + prompt},
        ],
      },
    ],
    config: {
      responseModalities: [Modality.IMAGE, Modality.TEXT],
      imageConfig: {
        aspectRatio: '16:9',
        imageSize,           // '1K' | '2K' | '4K'
      },
    },
  });

  const parts = response.candidates?.[0]?.content?.parts ?? [];

  // Gemini 3 Pro is a thinking model — filter out thought parts.
  // The final (non-thought) image part is the actual output.
  const finalParts = parts.filter((p) => !p.thought);
  const imagePart = finalParts
    .filter((p) => p.inlineData?.mimeType?.startsWith('image/'))
    .pop(); // last non-thought image = final render

  if (!imagePart?.inlineData?.data) {
    const textSnippet = finalParts
      .filter((p) => p.text)
      .map((p) => p.text)
      .join(' ')
      .slice(0, 300);
    throw new Error(`No image in response. Model said: ${textSnippet || '(empty)'}`);
  }

  const buf = Buffer.from(imagePart.inlineData.data, 'base64');
  await fs.writeFile(outFile, buf);
  return buf.length;
}

const generate = isImagen ? generateWithImagen : generateWithGemini;

// ── Main loop ──
let ok = 0;
let fail = 0;

for (const seg of promptSegments) {
  const padId = String(seg.id).padStart(2, '0');
  const outFile = path.join(outDir, `segment-${padId}.png`);
  const prompt = seg.visual.prompt;

  console.log(`── Segment ${padId} ──`);
  console.log(`   ${prompt.slice(0, 100)}…`);

  // Skip existing?
  try {
    await fs.access(outFile);
    if (!force) {
      console.log(`   ✓ Exists (--force to redo)\n`);
      ok++;
      continue;
    }
  } catch { /* doesn't exist, proceed */ }

  if (dryRun) {
    console.log(`   [dry-run] → ${path.relative(lessonRoot, outFile)}\n`);
    continue;
  }

  try {
    const t0 = Date.now();
    const bytes = await generate(prompt, outFile);
    const sec = ((Date.now() - t0) / 1000).toFixed(1);
    console.log(`   ✓ ${(bytes / 1024).toFixed(0)}KB → ${path.relative(lessonRoot, outFile)} (${sec}s)\n`);
    ok++;
  } catch (err) {
    console.error(`   ✗ ${err.message}\n`);
    fail++;
    if (isImagen && /safety|blocked|policy/i.test(err.message)) {
      console.error(`   💡 Imagen may block abstract diagrams. Try --model gemini-3-pro-image-preview\n`);
    }
  }
}

console.log(`\n${ok} succeeded, ${fail} failed.`);
if (fail > 0) process.exit(1);
