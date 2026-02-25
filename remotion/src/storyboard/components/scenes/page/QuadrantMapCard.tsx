import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {z} from 'zod';
import {
  TokenDAI,
  TokenUSDT,
  TokenUSDC,
  TokenLUNA,
  TokenFRAX,
  TokenLUSD,
  TokenFEI,
  TokenMIM,
  TokenIRON,
  TokenSUSD,
  TokenRAI,
  TokenUSTC,
  TokenTUSD,
} from '@web3icons/react';

import type {IconComponentProps} from '@web3icons/react';

import type {LessonBlockContext} from '../../../../lesson-config';
import {colors, fonts, motion, tokens} from '../../../../theme';
import type {StoryboardInjected} from '../../../types';
import {SceneScaffold} from '../../shared/scaffolds/SceneScaffold';

/* ── Icon lookup ─────────────────────────────────────────────── */

type Web3Icon = React.ForwardRefExoticComponent<
  Omit<IconComponentProps, 'ref'> & React.RefAttributes<SVGSVGElement>
>;

const ICON_MAP: Record<string, Web3Icon> = {
  DAI: TokenDAI,
  USDT: TokenUSDT,
  USDC: TokenUSDC,
  LUNA: TokenLUNA,
  UST: TokenUSTC,
  USTC: TokenUSTC,
  FRAX: TokenFRAX,
  LUSD: TokenLUSD,
  FEI: TokenFEI,
  MIM: TokenMIM,
  IRON: TokenIRON,
  SUSD: TokenSUSD,
  RAI: TokenRAI,
  TUSD: TokenTUSD,
};

/* ── Zod schema ──────────────────────────────────────────────── */

const QuadrantToneSchema = z.enum(['default', 'accent', 'danger', 'muted']);

const MarkerSchema = z
  .object({
    /** Symbol used both as label and to resolve the web3icon (e.g. "DAI") */
    symbol: z.string(),
    /** 0-1 normalised X position (0 = left axis, 1 = right axis) */
    x: z.number().min(0).max(1),
    /** 0-1 normalised Y position (0 = top axis, 1 = bottom axis) */
    y: z.number().min(0).max(1),
    /** Visual tone override */
    tone: QuadrantToneSchema.optional(),
    /** Seconds into the segment when this marker appears */
    appearAt: z.number().nonnegative().optional(),
    /** Optional subtitle shown below the icon */
    subtitle: z.string().optional(),
  })
  .strict();

export const QuadrantMapCardPropsSchema = z
  .object({
    eyebrow: z.string().optional(),
    title: z.string(),
    /** Labels for the four ends of the two axes */
    xAxisLeft: z.string(),
    xAxisRight: z.string(),
    yAxisTop: z.string(),
    yAxisBottom: z.string(),
    /** Optional quadrant labels (TL, TR, BL, BR) */
    quadrantLabels: z
      .object({
        topLeft: z.string().optional(),
        topRight: z.string().optional(),
        bottomLeft: z.string().optional(),
        bottomRight: z.string().optional(),
      })
      .optional(),
    /** Which quadrant to highlight as "our design" */
    highlightQuadrant: z.enum(['topLeft', 'topRight', 'bottomLeft', 'bottomRight']).optional(),
    /** Which quadrant to render with a collapse / danger effect */
    dangerQuadrant: z.enum(['topLeft', 'topRight', 'bottomLeft', 'bottomRight']).optional(),
    /** Seconds when the Y-axis (collateral origin) labels highlight */
    yAxisHighlightAt: z.number().nonnegative().optional(),
    /** Seconds when the X-axis (stability mechanism) labels highlight */
    xAxisHighlightAt: z.number().nonnegative().optional(),
    /** Token markers placed on the grid */
    markers: z.array(MarkerSchema).default([]),
    /** Optional footer note */
    note: z.string().optional(),
    noteAppearAt: z.number().nonnegative().optional(),
  })
  .strict();

export type QuadrantMapCardProps = z.infer<typeof QuadrantMapCardPropsSchema>;

/* ── Tone colours ────────────────────────────────────────────── */

const toneColors = {
  default: {bg: 'rgba(255, 255, 255, 0.86)', border: tokens.colors.borderSoft},
  accent: {bg: tokens.colors.accentSoft, border: 'rgba(255, 210, 0, 0.52)'},
  danger: {bg: 'rgba(255, 80, 80, 0.12)', border: 'rgba(255, 80, 80, 0.40)'},
  muted: {bg: 'rgba(0, 0, 0, 0.04)', border: tokens.colors.borderSoft},
} as const;

/* ── Constants ───────────────────────────────────────────────── */

const GRID_W = 980; // px – landscape width
const GRID_H = 520; // px – shorter height to fit 1080p
const AXIS_OVERSHOOT = 32; // px – axes extend beyond the grid
const MARKER_SIZE = 72;
const PAD_L = 80; // left padding for axis labels
const PAD_T = 50; // top padding for axis labels

/* ── Component ───────────────────────────────────────────────── */

export const QuadrantMapCard: React.FC<
  QuadrantMapCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({
  eyebrow,
  title,
  xAxisLeft,
  xAxisRight,
  yAxisTop,
  yAxisBottom,
  quadrantLabels,
  highlightQuadrant,
  dangerQuadrant,
  yAxisHighlightAt,
  xAxisHighlightAt,
  markers,
  note,
  noteAppearAt,
  context,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  /* ── grid reveal ── */
  const gridReveal = spring({frame, fps, config: motion.spring.standard});
  const gridOpacity = interpolate(gridReveal, [0, 1], [0, 1]);
  const gridScale = interpolate(gridReveal, [0, 1], [0.92, 1]);

  /* ── highlight quadrant pulse ── */
  const pulsePhase = Math.sin(frame / fps * 1.6) * 0.5 + 0.5; // 0-1 sine wave

  /* ── axis label highlight ── */
  const yAxisDelay = yAxisHighlightAt != null ? Math.round(yAxisHighlightAt * fps) : -1;
  const yAxisProg = yAxisDelay >= 0
    ? spring({frame: Math.max(0, frame - yAxisDelay), fps, config: motion.spring.fast})
    : 0;
  const yAxisGlow = interpolate(yAxisProg, [0, 1], [0, 1]);

  const xAxisDelay = xAxisHighlightAt != null ? Math.round(xAxisHighlightAt * fps) : -1;
  const xAxisProg = xAxisDelay >= 0
    ? spring({frame: Math.max(0, frame - xAxisDelay), fps, config: motion.spring.fast})
    : 0;
  const xAxisGlow = interpolate(xAxisProg, [0, 1], [0, 1]);

  return (
    <SceneScaffold
      background="radial-gradient(circle at 12% 22%, rgba(255, 232, 102, 0.28), transparent 38%), radial-gradient(circle at 88% 80%, rgba(0, 0, 0, 0.05), transparent 42%), #ffffff"
      eyebrow={eyebrow}
      title={title}
      titleSize={tokens.storyboard.header.titleSizeStandard}
      contentTop={22}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: 0,
        }}
      >
        {/* ── Quadrant area ── */}
        <div
          style={{
            position: 'relative',
            width: GRID_W + PAD_L * 2 + 60,
            height: GRID_H + PAD_T * 2 + 60,
            opacity: gridOpacity,
            transform: `scale(${gridScale})`,
            flexShrink: 0,
          }}
        >
          {/* ── Background quadrant fills ── */}
          {(['topLeft', 'topRight', 'bottomLeft', 'bottomRight'] as const).map((q) => {
            const isHighlighted = highlightQuadrant === q;
            const isDanger = dangerQuadrant === q;
            const left = q.includes('Right') ? GRID_W / 2 : 0;
            const top = q.includes('bottom') || q === 'bottomLeft' || q === 'bottomRight' ? GRID_H / 2 : 0;
            const alpha = isHighlighted ? 0.16 + pulsePhase * 0.08 : isDanger ? 0.06 + pulsePhase * 0.04 : 0.03;

            const bg = isHighlighted
              ? `rgba(255, 232, 102, ${alpha})`
              : isDanger
                ? `rgba(255, 60, 60, ${alpha})`
                : `rgba(0, 0, 0, ${alpha})`;

            const border = isHighlighted
              ? `2px solid rgba(255, 210, 0, ${0.28 + pulsePhase * 0.14})`
              : isDanger
                ? `2px solid rgba(255, 80, 80, ${0.18 + pulsePhase * 0.12})`
                : '2px solid transparent';

            return (
              <div
                key={q}
                style={{
                  position: 'absolute',
                  left: PAD_L + left,
                  top: PAD_T + top,
                  width: GRID_W / 2,
                  height: GRID_H / 2,
                  borderRadius: tokens.radii.md,
                  background: bg,
                  border,
                  overflow: 'hidden',
                }}
              >
                {/* Danger-quadrant collapse hatching */}
                {isDanger && (
                  <>
                    <svg
                      width="100%"
                      height="100%"
                      style={{position: 'absolute', inset: 0, opacity: 0.07 + pulsePhase * 0.05}}
                    >
                      <defs>
                        <pattern id="danger-hatch" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                          <line x1="0" y1="0" x2="0" y2="18" stroke="rgba(200,40,40,1)" strokeWidth="1.5" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#danger-hatch)" />
                    </svg>
                    {/* Crack lines */}
                    <svg
                      width="100%"
                      height="100%"
                      style={{position: 'absolute', inset: 0, opacity: 0.12 + pulsePhase * 0.06}}
                      viewBox={`0 0 ${GRID_W / 2} ${GRID_H / 2}`}
                      preserveAspectRatio="none"
                    >
                      <path
                        d={`M${GRID_W * 0.12},${GRID_H * 0.08} L${GRID_W * 0.18},${GRID_H * 0.22} L${GRID_W * 0.14},${GRID_H * 0.35} L${GRID_W * 0.20},${GRID_H * 0.45}`}
                        fill="none"
                        stroke="rgba(180,40,40,0.7)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d={`M${GRID_W * 0.32},${GRID_H * 0.04} L${GRID_W * 0.28},${GRID_H * 0.18} L${GRID_W * 0.35},${GRID_H * 0.32}`}
                        fill="none"
                        stroke="rgba(180,40,40,0.5)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    {/* ☠ skull watermark */}
                    <div
                      style={{
                        position: 'absolute',
                        right: 18,
                        bottom: 14,
                        fontSize: 52,
                        opacity: 0.06 + pulsePhase * 0.04,
                        lineHeight: 1,
                        userSelect: 'none',
                      }}
                    >
                      ☠
                    </div>
                  </>
                )}
              </div>
            );
          })}

          {/* ── Quadrant labels ── */}
          {quadrantLabels &&
            (['topLeft', 'topRight', 'bottomLeft', 'bottomRight'] as const).map((q) => {
              const label = quadrantLabels[q];
              if (!label) return null;
              const isLeft = q.includes('Left') || q === 'topLeft' || q === 'bottomLeft';
              const isTop = q === 'topLeft' || q === 'topRight';
              const isDangerLabel = dangerQuadrant === q;
              return (
                <div
                  key={`label-${q}`}
                  style={{
                    position: 'absolute',
                    left: PAD_L + (isLeft ? 16 : GRID_W / 2 + 16),
                    top: PAD_T + (isTop ? 14 : GRID_H / 2 + 14),
                    fontFamily: fonts.brand,
                    fontSize: 15,
                    fontWeight: 700,
                    letterSpacing: '0.10em',
                    textTransform: 'uppercase',
                    color: highlightQuadrant === q ? colors.text : isDangerLabel ? 'rgba(180, 50, 50, 0.78)' : colors.muted,
                    opacity: 0.72,
                  }}
                >
                  {label}
                </div>
              );
            })}

          {/* ── Cross-hair axes ── */}
          {/* Vertical axis */}
          <div
            style={{
              position: 'absolute',
              left: PAD_L + GRID_W / 2 - 1,
              top: PAD_T - AXIS_OVERSHOOT,
              width: 2,
              height: GRID_H + AXIS_OVERSHOOT * 2,
              background: 'rgba(0, 0, 0, 0.14)',
              borderRadius: 999,
            }}
          />
          {/* Horizontal axis */}
          <div
            style={{
              position: 'absolute',
              left: PAD_L - AXIS_OVERSHOOT,
              top: PAD_T + GRID_H / 2 - 1,
              width: GRID_W + AXIS_OVERSHOOT * 2,
              height: 2,
              background: 'rgba(0, 0, 0, 0.14)',
              borderRadius: 999,
            }}
          />

          {/* ── Axis labels ── */}
          {/* Y-axis top */}
          <div
            style={{
              position: 'absolute',
              left: PAD_L + GRID_W / 2,
              top: PAD_T - AXIS_OVERSHOOT - 28,
              transform: `translateX(-50%) scale(${1 + yAxisGlow * 0.08})`,
              fontFamily: fonts.brand,
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: yAxisGlow > 0.01
                ? `rgba(${Math.round(11 + (180 - 11) * (1 - yAxisGlow))}, ${Math.round(11 + (140 - 11) * (1 - yAxisGlow))}, ${Math.round(11 * (1 - yAxisGlow))}, 1)`
                : colors.muted,
              whiteSpace: 'nowrap',
              textShadow: yAxisGlow > 0.01 ? `0 0 ${8 * yAxisGlow}px rgba(255, 210, 0, ${0.5 * yAxisGlow})` : 'none',
            }}
          >
            ▲ {yAxisTop}
          </div>
          {/* Y-axis bottom */}
          <div
            style={{
              position: 'absolute',
              left: PAD_L + GRID_W / 2,
              top: PAD_T + GRID_H + AXIS_OVERSHOOT + 8,
              transform: `translateX(-50%) scale(${1 + yAxisGlow * 0.08})`,
              fontFamily: fonts.brand,
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: yAxisGlow > 0.01
                ? `rgba(${Math.round(11 + (180 - 11) * (1 - yAxisGlow))}, ${Math.round(11 + (140 - 11) * (1 - yAxisGlow))}, ${Math.round(11 * (1 - yAxisGlow))}, 1)`
                : colors.muted,
              whiteSpace: 'nowrap',
              textShadow: yAxisGlow > 0.01 ? `0 0 ${8 * yAxisGlow}px rgba(255, 210, 0, ${0.5 * yAxisGlow})` : 'none',
            }}
          >
            ▼ {yAxisBottom}
          </div>
          {/* X-axis left */}
          <div
            style={{
              position: 'absolute',
              left: PAD_L - AXIS_OVERSHOOT - 8,
              top: PAD_T + GRID_H / 2,
              transform: `translateX(-100%) translateY(-50%) scale(${1 + xAxisGlow * 0.08})`,
              fontFamily: fonts.brand,
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: xAxisGlow > 0.01
                ? `rgba(${Math.round(11 + (180 - 11) * (1 - xAxisGlow))}, ${Math.round(11 + (140 - 11) * (1 - xAxisGlow))}, ${Math.round(11 * (1 - xAxisGlow))}, 1)`
                : colors.muted,
              whiteSpace: 'nowrap',
              textShadow: xAxisGlow > 0.01 ? `0 0 ${8 * xAxisGlow}px rgba(255, 210, 0, ${0.5 * xAxisGlow})` : 'none',
            }}
          >
            {xAxisLeft} ◀
          </div>
          {/* X-axis right */}
          <div
            style={{
              position: 'absolute',
              left: PAD_L + GRID_W + AXIS_OVERSHOOT + 8,
              top: PAD_T + GRID_H / 2,
              transform: `translateY(-50%) scale(${1 + xAxisGlow * 0.08})`,
              fontFamily: fonts.brand,
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: xAxisGlow > 0.01
                ? `rgba(${Math.round(11 + (180 - 11) * (1 - xAxisGlow))}, ${Math.round(11 + (140 - 11) * (1 - xAxisGlow))}, ${Math.round(11 * (1 - xAxisGlow))}, 1)`
                : colors.muted,
              whiteSpace: 'nowrap',
              textShadow: xAxisGlow > 0.01 ? `0 0 ${8 * xAxisGlow}px rgba(255, 210, 0, ${0.5 * xAxisGlow})` : 'none',
            }}
          >
            ▶ {xAxisRight}
          </div>

          {/* ── Markers (tokens) ── */}
          {markers.map((m, idx) => {
            const delay = m.appearAt != null ? Math.round(m.appearAt * fps) : idx * 10;
            const prog = spring({
              frame: Math.max(0, frame - delay),
              fps,
              config: motion.spring.fast,
            });
            const scale = interpolate(prog, [0, 1], [0.3, 1]);
            const opacity = interpolate(prog, [0, 1], [0, 1]);

            const tone = toneColors[m.tone ?? 'default'];
            const IconComp = ICON_MAP[m.symbol.toUpperCase()];

            const cx = PAD_L + m.x * GRID_W - MARKER_SIZE / 2;
            const cy = PAD_T + m.y * GRID_H - MARKER_SIZE / 2;

            return (
              <div
                key={`${idx}-${m.symbol}`}
                style={{
                  position: 'absolute',
                  left: cx,
                  top: cy,
                  width: MARKER_SIZE,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  transform: `scale(${scale})`,
                  opacity,
                }}
              >
                {/* Icon bubble */}
                <div
                  style={{
                    width: MARKER_SIZE,
                    height: MARKER_SIZE,
                    borderRadius: 999,
                    background: tone.bg,
                    border: `2px solid ${tone.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: m.tone === 'danger'
                      ? '0 0 12px rgba(255, 80, 80, 0.25)'
                      : m.tone === 'accent'
                        ? '0 0 12px rgba(255, 232, 102, 0.30)'
                        : 'none',
                  }}
                >
                  {IconComp ? (
                    <IconComp size={34} variant="branded" />
                  ) : (
                    <span
                      style={{
                        fontFamily: fonts.brand,
                        fontSize: 16,
                        fontWeight: 800,
                        color: colors.text,
                      }}
                    >
                      {m.symbol}
                    </span>
                  )}
                </div>

                {/* Symbol label */}
                <div
                  style={{
                    fontFamily: fonts.brand,
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    color: m.tone === 'danger' ? 'rgba(200, 50, 50, 0.85)' : colors.text,
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {m.symbol}
                </div>

                {/* Optional subtitle */}
                {m.subtitle && (
                  <div
                    style={{
                      fontFamily: fonts.body,
                      fontSize: 12,
                      fontWeight: 400,
                      color: colors.muted,
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {m.subtitle}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* ── Bottom footnote ── */}
      {note && (() => {
        const noteDelay = noteAppearAt != null ? Math.round(noteAppearAt * fps) : 30;
        const noteProg = spring({frame: Math.max(0, frame - noteDelay), fps, config: motion.spring.standard});
        const noteY = interpolate(noteProg, [0, 1], [12, 0]);
        const noteOpacity = interpolate(noteProg, [0, 1], [0, 1]);

        return (
          <div
            style={{
              width: '100%',
              borderRadius: 16,
              padding: '14px 24px',
              marginTop: 10,
              background:
                'linear-gradient(90deg, rgba(255, 232, 102, 0.28), rgba(255, 255, 255, 0.60) 60%)',
              transform: `translateY(${noteY}px)`,
              opacity: noteOpacity,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 14,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontFamily: fonts.brand,
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: colors.muted,
                flexShrink: 0,
              }}
            >
              Insight
            </div>
            <div
              style={{
                width: 2,
                height: 20,
                borderRadius: 999,
                backgroundColor: 'rgba(0,0,0,0.10)',
                flexShrink: 0,
              }}
            />
            <div
              style={{
                fontFamily: fonts.body,
                fontWeight: 400,
                color: colors.bodyText,
                fontSize: 24,
                lineHeight: 1.36,
              }}
            >
              {note}
            </div>
          </div>
        );
      })()}
    </SceneScaffold>
  );
};
