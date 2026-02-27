# HackQuest — NotebookLM 双 Prompt

使用方式：将 script.md 作为 source 上传，下面两段分别贴入。

---

## Prompt A — Content（控制内容生成行为）

```
CONTENT RULES for this video:

1. VOICEOVER IS LOCKED — use my script text VERBATIM. Zero rewrites, zero paraphrasing, zero trimming, zero "improvements." Every word stays exactly as written.

2. ONE IDEA PER SCREEN — each segment gets one core visual. Don't cram multiple concepts into a single frame.

3. IF THE VOICEOVER DOESN'T SAY IT, DON'T SHOW IT — no decorative illustrations, no extra icons, no metaphor art. A segment about "why stablecoins are infrastructure" needs only text, not a picture of buildings or gears.

4. DENSITY CAPS — title ≤9 words, bullet ≤18 words, max 4 bullets, max 5 steps, max 6 table rows.

5. PROGRESSIVE REVEAL — items appear one-by-one synced to narration timing, never all at once. New visual element every 6-8 seconds.

6. NO BLANK SCREENS — every moment of voiceover must have a corresponding visual on screen.
```

---

## Prompt B — Style（控制视觉风格）

```
VISUAL STYLE for HackQuest:

FORMAT: 1080×1920 portrait (9:16).

PALETTE: White bg #FFF, text #0B0B0B / #1A1A1A / #6B6B6B, single accent #FFE866. Code blocks only: dark bg #0B0B0B + white monospace.

FONTS: NEXT BOOK (titles), Noto Sans (body ≥30px).

LAYOUT: All content centered horizontally and vertically. Keep generous whitespace around content. The viewer's eye should land on one focal point per frame, dead center.

AESTHETIC: Flat, borderless Swiss minimalism. White background + faint grid texture (blueprint feel) + optional subtle yellow radial wash. Pill-shaped accent badges: yellow fill, black border, uppercase bold.

DIAGRAMS: Wireframe only — labeled rounded rectangles + 2px arrows, black/white/gray + yellow highlight. No icons inside diagram nodes, text labels only. Centered on canvas.

ICONS: Only when voiceover explicitly names the concept. Stroke-only, monochrome (Lucide/Feather style). Never decorative icon collages.

DO NOT ADD — we handle these in post-production:
• No logo / watermark / branding mark anywhere
• No captions / subtitles / transcript text
• No lower-thirds or name cards
• No progress bars or navigation indicators
• No corner badges or header/footer chrome
Leave those areas clean — we composite them ourselves.

BANNED — hard no, zero tolerance:
• No shadows (drop, box, or text)
• No gradients (except the faint yellow wash)
• No 3D, isometric, or perspective effects
• No stock photos, human illustrations, or realistic imagery
• No glitch, neon, particles, or cyberpunk elements
• No crypto-logo mosaics or random token icons
• No "tech feel" backgrounds (circuits, data streams, matrix)
• No mixed styles — all visuals must share one consistent flat wireframe language

MOTION: Spring physics easing. No linear slides.

SELF-CHECK every frame: ✓ No logo/caption/chrome? ✓ Content centered? ✓ Palette only? ✓ Zero shadow/gradient/3D? ✓ Every element traceable to voiceover? ✓ Consistent style?
```
