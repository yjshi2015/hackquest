# Storyboard Timing Conventions

## Goal

Keep scene timing predictable for instructors and avoid per-component naming drift.

## Segment Transitions (lesson.meta.json)

Use `transitions.style` to control segment-to-segment pacing:

- `cut`: no overlap, hard cut
- `snap`: very short crossfade (recommended default)
- `fade`: longer crossfade for soft transitions

Example:

```json
{
  "transitions": {
    "enabled": true,
    "style": "snap",
    "durationFrames": 6
  }
}
```

## Scene-Level Timing Props (seconds)

These timing props are expressed in seconds, not frames.

Prefer a minimal scene-level API. Instructors usually do not need a top-level `appearAt`.

- `noteAppearAt`: delay a follow-up note block

## Item-Level Timing Props (seconds)

For lists, steps, glossary entries, roadmap phases, etc.:

- `items[].appearAt`
- `bullets[].appearAt`
- `steps[].appearAt`
- `phases[].appearAt`

If omitted, components should use a short built-in stagger.

## Image-Level Timing Props (seconds) — SplitImage

- `images[].appearAt`: when the image fades in (relative to segment start).
- `images[].exitAt`: when the image fades out. Match to the next image's `appearAt` for seamless rapid switching.

Three patterns:
1. **Sequential reveal** (gallery/compare): each image appears, none exit. Grid fills progressively.
2. **Rapid montage** (hero/text-image/image-text): images stack in place; `exitAt[n] = appearAt[n+1]` for zero-gap switching. Last image omits `exitAt` to hold.
3. **Timed single**: one image with delayed appear and optional exit.

## Step-Level Timing (frames) — CodeHike

- `!duration <frames>` in sidecar `.md`: how long a code step stays on screen (in frames, not seconds).
- Must align with voiceover: each step's duration ≈ the time the narrator spends describing that code change.
- If omitted, the timeline engine distributes total segment time evenly across steps.

## Authoring Guidance

- Prefer `snap` transitions + item-level `appearAt` for a sharper, faster rhythm.
- Use `appearAt` to sequence meaning, not decoration.
- Keep intervals short (roughly `0.08s` to `0.25s`) unless the narration explicitly pauses.
