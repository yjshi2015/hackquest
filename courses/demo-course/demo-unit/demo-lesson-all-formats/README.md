# Demo Lesson: All Formats

This lesson is a design and engineering coverage test for the Remotion lesson pipeline.

## What It Covers

- `Scene Type: Slide` (markdown-driven slides)
- `Scene Type: Animation` (flow diagrams rendered as slides today)
- `Scene Type: Chart` (JSON-driven chart card)
- `Scene Type: Video` (full-screen video playback)
- Image rendering via `SplitImage` component (inline `images[]` prop)
- Cover + Outro (from `source/lesson.meta.json`)
- Captions (`generated/captions/lines.json`)
- Section overlay + header + progress bar (composition overlays)

## Key Files

- `source/script.md`
- `source/lesson.meta.json`
- `assets/fake-ide-walkthrough.mp4`
- `assets/fake-explorer-callout.mp4`
- `assets/diagram-system-boundary.png`
- `generated/voiceover-en-segments.json`
- `generated/voiceover-en-segment-timings.json`
- `generated/captions/lines.json`

## Segment Map (Formats)

- 01 Slide
- 02 Animation
- 03 Slide
- 04 Chart
- 05 Video
- 06 Image (via `SplitImage`)
- 07-09 Slide (definition, warning, code)
- 10 Animation
- 11-13 Slide (comparison, references, bilingual terms)
- 14 Video
- 15-18 Slide (assets, QA, recap, next)

