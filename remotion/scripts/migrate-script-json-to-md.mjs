import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

import {resolveDefaultLessonRoot} from './lib/default-lesson-root.mjs';

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
const jsonPath = path.join(lessonRoot, 'source', 'script.json');
const outPath = path.join(lessonRoot, 'source', 'script.md');

const script = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
const segments = Array.isArray(script.segments) ? script.segments : [];

const pad2 = (n) => String(n).padStart(2, '0');

const lines = [];
lines.push('# Lesson Script (EN)');
lines.push('');

for (const seg of segments) {
  const id = Number(seg.id);
  lines.push(`## Segment ${pad2(id)}`);
  lines.push('Voiceover:');
  lines.push(String(seg.voiceover?.text ?? '').trim());
  lines.push('');

  const v = seg.visual ?? null;
  if (v) {
    if (v.sceneType) lines.push(`Scene Type: ${v.sceneType}`);
    if (v.sceneContent) lines.push(`Scene Content: ${v.sceneContent}`);
    if (v.assetRef) lines.push(`Asset Ref: ${v.assetRef}`);
    if (v.prompt) lines.push(`Prompt: ${v.prompt}`);
    if (v.component) lines.push(`Component: ${v.component}`);
    if (typeof seg.voiceover?.postGapMs === 'number') {
      lines.push(`Post Gap Ms: ${seg.voiceover.postGapMs}`);
    }

    if (v.markdown) {
      lines.push('```markdown');
      lines.push(String(v.markdown).trim());
      lines.push('```');
    }

    if (v.json) {
      lines.push('```json');
      lines.push(JSON.stringify(v.json, null, 2));
      lines.push('```');
    }

    lines.push('');
  }
}

await fs.writeFile(outPath, lines.join('\n').trimEnd() + '\n', 'utf8');
console.log(`Wrote ${segments.length} segments to ${path.relative(repoRoot, outPath)}`);
