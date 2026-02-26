# Demo Lesson: Stablecoin Visual Explainer

This lesson demonstrates the **AI-illustrated** workflow: most segments use
nano-banana–generated images as the primary visual, instead of code-driven
components.

## What Makes This Different

| Traditional (demo-lesson-all-formats) | Visual (this lesson) |
|----------------------------------------|--------------------------------------|
| Every segment uses a coded component | Most segments show a generated image |
| Props define layout & animation | A `Prompt:` field drives image gen |
| Best for data-heavy / interactive | Best for conceptual / narrative |

## Workflow

```
1. Write script.md  →  Voiceover + Prompt + Component per segment
2. Generate images   →  bun run generate:images -- --lesson-root <this-dir>
3. Generate TTS      →  bun run tts (same as usual)
4. Render            →  bun run start / bun run render
```

### Step-by-step

1. **Author `source/script.md`** — each image segment has:
   - `Voiceover:` — narration text (sent to TTS)
   - `Prompt:` — image generation prompt (sent to nano-banana)
   - `Component: SplitImage` + `layout: hero` — renders the image full-screen

2. **Run `generate-segment-images.mjs`** — extracts `Prompt:` fields,
   calls nano-banana via Gemini CLI, saves images to `assets/generated/`.

3. **Normal pipeline** — TTS → segment timings → captions → render.

## Segment Map

| # | Type | Visual |
|---|------|--------|
| 01 | **FireText** (component) | Opening hook animation |
| 02 | **Image** (prompt) | What is a stablecoin |
| 03 | **Image** (prompt) | Three stablecoin types |
| 04 | **Image** (prompt) | Fiat-backed mechanics |
| 05 | **Image** (prompt) | CDP vault cross-section |
| 06 | **Bullet** (component) | Five design pillars |
| 07 | **Image** (prompt) | Liquidation cascade |
| 08 | **Image** (prompt) | Oracle network |
| 09 | **Compare** (component) | Centralized vs Decentralized |
| 10 | **Image** (prompt) | Future bridge concept |

## Key Files

- `source/script.md` — single source of truth (voiceover + prompts + components)
- `source/lesson.meta.json` — lesson metadata
- `assets/generated/segment-*.png` — AI-generated images (created by workflow)
- `generated/voiceover-en-segments.json` — TTS input
- `generated/voiceover-en-segment-timings.json` — timing data

## Image Generation

```bash
# From repo root
cd remotion
bun scripts/generate-segment-images.mjs --lesson-root ../courses/demo-course-visual/demo-unit/demo-lesson-visual
```

This reads `Prompt:` fields from `script.md`, generates images with nano-banana,
and writes them to `assets/generated/segment-{id}.png`.

## When to Use Image Segments vs Component Segments

**Use image (Prompt:)** when:
- Explaining abstract concepts that benefit from visual metaphor
- Narrative / storytelling segments
- Diagrams that are too custom for ArchitectureDiagram
- Atmosphere / mood-setting scenes

**Keep component** when:
- Structured data (Bullet, Table, Steps, Compare)
- Interactive code walkthroughs (CodeHike)
- Opening hooks (FireText)
- System diagrams with precise node positioning (ArchitectureDiagram)
