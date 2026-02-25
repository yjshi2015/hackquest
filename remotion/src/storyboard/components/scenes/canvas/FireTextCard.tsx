import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {z} from 'zod';

import type {LessonBlockContext} from '../../../../lesson-config';
import {colors, fonts, motion, tokens} from '../../../../theme';
import type {StoryboardInjected} from '../../../types';
import {SceneScaffold} from '../../shared/scaffolds/SceneScaffold';

/* ── tokens shorthand ─────────────────────────────────── */

const ft = tokens.storyboard.fireText;

/* ── schema ───────────────────────────────────────────── */

const HighlightSchema = z.object({
  word: z.string(),
  tone: z.enum(['accent', 'danger', 'muted']).optional(),
  /** Seconds (relative to line appearance) when this highlight activates. */
  appearAt: z.number().nonnegative().optional(),
});

const FireLineSchema = z.object({
  text: z.string(),
  /** How the line enters the scene. */
  entrance: z
    .enum([
      'slam',
      'slideUp',
      'slideDown',
      'pop',
      'typewriter',
      'fadeIn',
      'glitch',
      'wordByWord',
      'karaoke',
    ])
    .optional(),
  /** How the line exits (if at all). */
  exit: z.enum(['fadeOut', 'slideUp', 'shrink', 'none']).optional(),
  /** When this line appears (seconds). Auto-staggered if omitted. */
  appearAt: z.number().nonnegative().optional(),
  /** When this line exits (seconds). Stays forever if omitted. */
  exitAt: z.number().nonnegative().optional(),
  /** Text size preset. */
  size: z.enum(['hero', 'title', 'body']).optional(),
  /** Font weight preset. */
  weight: z.enum(['black', 'bold', 'regular']).optional(),
  /** Subtle continuous pulse while visible. */
  pulse: z.boolean().optional(),
  /** Words to visually emphasise. */
  highlights: z.array(HighlightSchema).optional(),
  /** Seconds between words (wordByWord) or chars/frame scale (typewriter). */
  wordInterval: z.number().nonnegative().optional(),
});

export const FireTextCardPropsSchema = z
  .object({
    lines: z.array(FireLineSchema).min(1),
    /** Text alignment. */
    align: z.enum(['center', 'left']).optional(),
    /** Auto-stagger between lines when no explicit `appearAt` (seconds). */
    stagger: z.number().nonnegative().optional(),
    /** Light or dark canvas. */
    variant: z.enum(['light', 'dark']).optional(),
    eyebrow: z.string().optional(),
  })
  .strict();

export type FireTextCardProps = z.infer<typeof FireTextCardPropsSchema>;

/* ── constants ────────────────────────────────────────── */

const SIZE_MAP = {hero: ft.heroSize, title: ft.titleSize, body: ft.bodySize} as const;
const WEIGHT_MAP = {black: 900, bold: 700, regular: 400} as const;
const TYPEWRITER_CHARS_PER_FRAME = 1.2;

/* ── punchier spring presets ──────────────────────────── */

const slamSpring = {damping: 16, stiffness: 220, mass: 0.7};
const popSpring = {damping: 14, stiffness: 200, mass: 0.6};

/* ── entrance / exit style helpers ────────────────────── */

function entranceStyle(
  kind: string,
  progress: number,
  frame: number,
): React.CSSProperties {
  switch (kind) {
    case 'slam': {
      const s = interpolate(progress, [0, 1], [1.5, 1]);
      const y = interpolate(progress, [0, 1], [-24, 0]);
      return {opacity: Math.min(progress * 4, 1), transform: `scale(${s}) translateY(${y}px)`};
    }
    case 'slideUp': {
      const y = interpolate(progress, [0, 1], [48, 0]);
      return {opacity: progress, transform: `translateY(${y}px)`};
    }
    case 'slideDown': {
      const y = interpolate(progress, [0, 1], [-48, 0]);
      return {opacity: progress, transform: `translateY(${y}px)`};
    }
    case 'pop': {
      const s = interpolate(progress, [0, 1], [0, 1]);
      return {opacity: Math.min(progress * 3, 1), transform: `scale(${s})`};
    }
    case 'fadeIn':
      return {opacity: progress, transform: 'none'};
    case 'glitch': {
      if (progress >= 0.85) return {opacity: 1, transform: 'none'};
      const jx = Math.sin(frame * 47) * interpolate(progress, [0, 0.85], [12, 0]);
      const jy = Math.cos(frame * 31) * interpolate(progress, [0, 0.85], [8, 0]);
      const flicker = Math.sin(frame * 17) > -0.3 ? 1 : 0;
      return {
        opacity: progress > 0.05 ? flicker : 0,
        transform: `translate(${jx}px, ${jy}px)`,
      };
    }
    /* wordByWord / typewriter / karaoke animate at the word/char level, not container */
    case 'wordByWord':
    case 'typewriter':
    case 'karaoke':
      return {opacity: 1, transform: 'none'};
    default:
      return {opacity: progress, transform: 'none'};
  }
}

function exitStyleFor(kind: string, progress: number): React.CSSProperties {
  switch (kind) {
    case 'fadeOut':
      return {opacity: 1 - progress, transform: 'none'};
    case 'slideUp': {
      const y = interpolate(progress, [0, 1], [0, -48]);
      return {opacity: 1 - progress, transform: `translateY(${y}px)`};
    }
    case 'shrink': {
      const s = interpolate(progress, [0, 1], [1, 0]);
      return {opacity: 1 - progress * 0.6, transform: `scale(${s})`};
    }
    default:
      return {opacity: 1, transform: 'none'};
  }
}

/* ── highlight styling ────────────────────────────────── */

function hlStyle(tone: string, isDark: boolean): React.CSSProperties {
  if (tone === 'accent') {
    return isDark
      ? {color: tokens.colors.accent, fontWeight: 900}
      : {
          backgroundColor: tokens.colors.accentSoft,
          color: tokens.colors.text,
          padding: '2px 10px',
          borderRadius: tokens.radii.sm / 2,
          fontWeight: 900,
        };
  }
  if (tone === 'danger') {
    return {color: '#E53935', fontWeight: 900};
  }
  /* muted */
  return {color: isDark ? 'rgba(255,255,255,0.45)' : tokens.colors.muted};
}

/* ── inline highlight renderer ────────────────────────── */

function renderHighlighted(
  text: string,
  highlights: Array<{word: string; tone?: string; appearAt?: number}> | undefined,
  isDark: boolean,
  /** Elapsed frames since line appeared — used for timed highlights. */
  elapsedFrames?: number,
  fps?: number,
): React.ReactNode {
  if (!highlights?.length) return text;

  const segs: Array<{text: string; tone?: string; appearAtF?: number}> = [];
  let rest = text;
  const sorted = [...highlights].sort(
    (a, b) => rest.indexOf(a.word) - rest.indexOf(b.word),
  );

  for (const h of sorted) {
    const i = rest.indexOf(h.word);
    if (i < 0) continue;
    if (i > 0) segs.push({text: rest.slice(0, i)});
    segs.push({
      text: h.word,
      tone: h.tone ?? 'accent',
      appearAtF: h.appearAt != null && fps ? Math.round(h.appearAt * fps) : undefined,
    });
    rest = rest.slice(i + h.word.length);
  }
  if (rest) segs.push({text: rest});

  return (
    <>
      {segs.map((seg, i) => {
        if (!seg.tone) return <span key={i}>{seg.text}</span>;

        /* Timed highlight: not yet active → render as plain text */
        if (seg.appearAtF != null && elapsedFrames != null && elapsedFrames < seg.appearAtF) {
          return <span key={i}>{seg.text}</span>;
        }

        /* Timed highlight: pop scale when it just activated */
        let popScale = 1;
        if (seg.appearAtF != null && elapsedFrames != null && fps) {
          const since = elapsedFrames - seg.appearAtF;
          const p = spring({frame: Math.max(0, since), fps, config: popSpring});
          popScale = interpolate(p, [0, 1], [1.15, 1]);
        }

        return (
          <span
            key={i}
            style={{
              ...hlStyle(seg.tone, isDark),
              display: popScale !== 1 ? 'inline-block' : undefined,
              transform: popScale !== 1 ? `scale(${popScale})` : undefined,
            }}
          >
            {seg.text}
          </span>
        );
      })}
    </>
  );
}

/* ── progressive text (wordByWord / typewriter) ───────── */

function renderProgressive(
  text: string,
  entrance: string,
  elapsed: number,
  fps: number,
  wordInterval: number,
  highlights: Array<{word: string; tone?: string; appearAt?: number}> | undefined,
  isDark: boolean,
): React.ReactNode {
  /* typewriter ─ reveal char by char */
  if (entrance === 'typewriter') {
    const visible = Math.floor(elapsed * TYPEWRITER_CHARS_PER_FRAME);
    const shown = text.slice(0, Math.min(visible, text.length));
    const showCursor = visible < text.length;
    return (
      <>
        {renderHighlighted(shown, highlights, isDark, elapsed, fps)}
        {showCursor && (
          <span
            style={{
              opacity: Math.sin(elapsed * 0.4) > 0 ? 1 : 0,
              color: tokens.colors.accent,
              fontWeight: 400,
            }}
          >
            |
          </span>
        )}
      </>
    );
  }

  /* wordByWord ─ each word springs in sequentially */
  const parts = text.split(/(\s+)/);
  const intFrames = Math.max(1, Math.round(wordInterval * fps));
  let wordIdx = 0;

  return (
    <>
      {parts.map((part, i) => {
        /* preserve whitespace as-is */
        if (/^\s+$/.test(part)) return <span key={i}>{part}</span>;

        const delay = wordIdx * intFrames;
        wordIdx++;
        const e = Math.max(0, elapsed - delay);
        const p = spring({frame: e, fps, config: motion.spring.fast});
        const y = interpolate(p, [0, 1], [18, 0]);

        const hl = highlights?.find((h) => part.includes(h.word));
        const base: React.CSSProperties = {
          display: 'inline-block',
          opacity: p,
          transform: `translateY(${y}px)`,
        };
        if (hl) Object.assign(base, hlStyle(hl.tone ?? 'accent', isDark));

        return (
          <span key={i} style={base}>
            {part}
          </span>
        );
      })}
    </>
  );
}

/* ── karaoke renderer ─────────────────────────────────── */

function renderKaraoke(
  text: string,
  elapsed: number,
  fps: number,
  wordInterval: number,
  highlights: Array<{word: string; tone?: string; appearAt?: number}> | undefined,
  isDark: boolean,
): React.ReactNode {
  const parts = text.split(/\b/);
  const intFrames = Math.max(1, Math.round(wordInterval * fps));
  let wordIdx = 0;

  /* Build a lookup: lowercased word → highlight entry */
  const hlMap = new Map<string, {tone: string; overrideDelay?: number}>();
  if (highlights) {
    for (const h of highlights) {
      hlMap.set(h.word.toLowerCase(), {
        tone: h.tone ?? 'accent',
        overrideDelay: h.appearAt != null ? Math.round(h.appearAt * fps) : undefined,
      });
    }
  }

  const dimColor = isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.22)';
  const litColor = isDark ? '#FFFFFF' : tokens.colors.text;

  return (
    <>
      {parts.map((part, i) => {
        /* whitespace / punctuation — always visible */
        if (/^[\s\W]*$/.test(part)) {
          return <span key={i}>{part}</span>;
        }

        const hl = hlMap.get(part.toLowerCase());
        const delay = hl?.overrideDelay ?? wordIdx * intFrames;
        const since = elapsed - delay;
        const isLit = since >= 0;
        const justLit = isLit && since < intFrames * 2;
        wordIdx++;

        /* pop spring for the moment a word lights up */
        let scale = 1;
        if (justLit) {
          const p = spring({frame: Math.max(0, since), fps, config: popSpring});
          scale = interpolate(p, [0, 1], [1.18, 1]);
        }

        const isAccentWord = isLit && hl;
        const color = isLit ? (isAccentWord ? undefined : litColor) : dimColor;
        const style: React.CSSProperties = {
          display: 'inline-block',
          color,
          transition: 'color 0.08s',
          transform: scale !== 1 ? `scale(${scale})` : undefined,
          ...(isAccentWord ? hlStyle(hl.tone, isDark) : {}),
        };

        return (
          <span key={i} style={style}>
            {part}
          </span>
        );
      })}
    </>
  );
}

/* ── single animated line ─────────────────────────────── */

const FireLine: React.FC<{
  line: z.infer<typeof FireLineSchema>;
  frame: number;
  fps: number;
  align: string;
  autoDelay: number;
  isDark: boolean;
}> = ({line, frame, fps, align, autoDelay, isDark}) => {
  const entrance = line.entrance ?? 'slideUp';
  const exit = line.exit ?? 'none';
  const size = line.size ?? 'title';
  const weight = line.weight ?? 'bold';
  const pulse = line.pulse ?? false;
  const wordInterval = line.wordInterval ?? ft.defaultWordInterval;
  const highlights = line.highlights;

  const delayF = line.appearAt != null ? Math.round(line.appearAt * fps) : autoDelay;
  const exitF = line.exitAt != null ? Math.round(line.exitAt * fps) : null;

  /* not yet visible */
  if (frame < delayF) return null;

  const elapsed = frame - delayF;

  /* entrance progress */
  const springCfg =
    entrance === 'slam' ? slamSpring : entrance === 'pop' ? popSpring : motion.spring.standard;
  const eProg = spring({frame: elapsed, fps, config: springCfg});

  /* exit progress */
  let xProg = 0;
  if (exitF != null && exit !== 'none' && frame >= exitF) {
    xProg = spring({frame: frame - exitF, fps, config: motion.spring.fast});
  }
  if (xProg >= 0.99) return null;

  const eS = entranceStyle(entrance, eProg, frame);
  const xS = exitF != null && frame >= exitF ? exitStyleFor(exit, xProg) : null;

  const opacity =
    ((eS.opacity as number) ?? 1) * (xS ? ((xS.opacity as number) ?? 1) : 1);

  let transform = xS ? (xS.transform ?? '') : (eS.transform ?? '');

  /* subtle scale pulse while resting */
  if (pulse && eProg >= 0.95 && xProg < 0.01) {
    transform += ` scale(${1 + Math.sin(frame * 0.12) * 0.015})`;
  }

  const isProgressive = entrance === 'wordByWord' || entrance === 'typewriter';
  const isKaraoke = entrance === 'karaoke';
  const fontSize = SIZE_MAP[size] ?? SIZE_MAP.title;
  const fontWeight = WEIGHT_MAP[weight] ?? WEIGHT_MAP.bold;
  const textColor = isDark ? '#FFFFFF' : tokens.colors.text;

  let content: React.ReactNode;
  if (isKaraoke) {
    content = renderKaraoke(line.text, elapsed, fps, wordInterval, highlights, isDark);
  } else if (isProgressive) {
    content = renderProgressive(line.text, entrance, elapsed, fps, wordInterval, highlights, isDark);
  } else {
    content = renderHighlighted(line.text, highlights, isDark, elapsed, fps);
  }

  return (
    <div
      style={{
        fontFamily: fonts.display,
        fontSize,
        fontWeight,
        lineHeight: 1.12,
        letterSpacing: size === 'hero' ? '-0.03em' : '-0.01em',
        color: textColor,
        textAlign: align as React.CSSProperties['textAlign'],
        opacity,
        transform: transform || 'none',
        willChange: 'transform, opacity',
      }}
    >
      {content}
    </div>
  );
};

/* ── main component ───────────────────────────────────── */

export const FireTextCard: React.FC<
  FireTextCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({lines, align, stagger, variant, eyebrow, context}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const a = align ?? 'center';
  const st = stagger ?? 0.4;
  const isDark = variant === 'dark';
  const bg = isDark ? tokens.colors.text : tokens.colors.bg;

  /* In dark mode SceneScaffold's muted eyebrow is barely visible,
     so we render it ourselves with an inverted colour. */
  const scaffoldEyebrow = isDark ? undefined : eyebrow;
  const customEyebrow = isDark ? eyebrow : undefined;

  return (
    <SceneScaffold background={bg} eyebrow={scaffoldEyebrow} contentTop={0}>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: a === 'center' ? 'center' : 'flex-start',
          gap: ft.lineGap,
        }}
      >
        {/* Dark-mode eyebrow */}
        {customEyebrow ? (
          <div
            style={{
              fontFamily: fonts.brand,
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase' as const,
              color: 'rgba(255, 255, 255, 0.5)',
              alignSelf: a === 'center' ? 'center' : 'flex-start',
            }}
          >
            {customEyebrow}
          </div>
        ) : null}

        {lines.map((line, idx) => (
          <FireLine
            key={`${idx}-${line.text}`}
            line={line}
            frame={frame}
            fps={fps}
            align={a}
            autoDelay={Math.round(idx * st * fps)}
            isDark={isDark}
          />
        ))}
      </div>
    </SceneScaffold>
  );
};
