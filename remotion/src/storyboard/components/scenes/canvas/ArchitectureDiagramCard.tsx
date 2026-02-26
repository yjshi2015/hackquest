import {z} from 'zod';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';

import type {LessonBlockContext} from '../../../../lesson-config';
import {colors, fonts, motion, tokens} from '../../../../theme';
import type {StoryboardInjected} from '../../../types';

/* ------------------------------------------------------------------ */
/*  Schema                                                             */
/* ------------------------------------------------------------------ */

const NodeSchema = z.object({
  id: z.string(),
  label: z.string(),
  x: z.number(),
  y: z.number(),
  tone: z.enum(['accent', 'default', 'muted', 'danger']).optional(),
  icon: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  /** When this node should be spotlighted (seconds). */
  accentAt: z.number().nonnegative().optional(),
});

const EdgeSchema = z.object({
  from: z.string(),
  to: z.string(),
  label: z.string().optional(),
  dashed: z.boolean().optional(),
});

export const ArchitectureDiagramCardPropsSchema = z
  .object({
    eyebrow: z.string().optional(),
    title: z.string().optional(),
    subtitle: z.string().optional(),
    nodes: z.array(NodeSchema).min(1),
    edges: z.array(EdgeSchema).default([]),
    note: z.string().optional(),
  })
  .strict();

export type ArchitectureDiagramCardProps = z.infer<typeof ArchitectureDiagramCardPropsSchema>;

type NodeDef = z.infer<typeof NodeSchema>;

/* ------------------------------------------------------------------ */
/*  Economist-style palette — derived from theme tokens                */
/* ------------------------------------------------------------------ */

const STROKE = `rgba(0, 0, 0, 0.55)`;
const STROKE_LIGHT = colors.borderSoft;
const LABEL_BG = colors.panelSoft;
const NODE_SHADOW = 'drop-shadow(0 1px 3px rgba(0,0,0,0.08))';

const toneFill = (tone?: string) => {
  if (tone === 'accent') return colors.accentSoft;
  if (tone === 'danger') return '#FDE8E8';
  if (tone === 'muted') return '#F5F5F5';
  return colors.panel;
};

const toneStroke = (tone?: string) => {
  if (tone === 'accent') return colors.accent;
  if (tone === 'danger') return '#C0392B';
  if (tone === 'muted') return colors.borderSoft;
  return 'rgba(0,0,0,0.28)';
};

const toneAccentBar = (tone?: string) => {
  if (tone === 'accent') return colors.accent;
  if (tone === 'danger') return '#C0392B';
  return 'transparent';
};

/* ------------------------------------------------------------------ */
/*  Geometry helpers                                                   */
/* ------------------------------------------------------------------ */

/** Compute exit point on node bounding-box edge facing target. */
const resolveAnchor = (node: NodeDef, target: NodeDef): {x: number; y: number} => {
  const w = node.width ?? 180;
  const h = node.height ?? 56;
  const dx = target.x - node.x;
  const dy = target.y - node.y;

  if (Math.abs(dx) * h > Math.abs(dy) * w) {
    return {x: node.x + (dx > 0 ? w / 2 : -w / 2), y: node.y};
  }
  return {x: node.x, y: node.y + (dy > 0 ? h / 2 : -h / 2)};
};

/** Build a cubic Bézier `d` attribute between two anchor points.
 *  Bias the control points perpendicular to the dominant axis to get
 *  a subtle editorial curve. */
const buildCurvePath = (
  sx: number, sy: number,
  ex: number, ey: number,
): string => {
  const dx = ex - sx;
  const dy = ey - sy;
  const isHorizontal = Math.abs(dx) >= Math.abs(dy);
  const tension = 0.38;

  if (isHorizontal) {
    const cpx = dx * tension;
    return `M${sx},${sy} C${sx + cpx},${sy} ${ex - cpx},${ey} ${ex},${ey}`;
  }
  const cpy = dy * tension;
  return `M${sx},${sy} C${sx},${sy + cpy} ${ex},${ey - cpy} ${ex},${ey}`;
};

/* ------------------------------------------------------------------ */
/*  SVG defs – clean open-chevron arrowhead                           */
/* ------------------------------------------------------------------ */

const DiagramDefs: React.FC = () => (
  <defs>
    {/* Open chevron arrow — clean editorial look */}
    <marker
      id="eco-arrow"
      markerWidth="8"
      markerHeight="8"
      refX="7"
      refY="4"
      orient="auto"
      markerUnits="strokeWidth"
    >
      <polyline
        points="1 1, 7 4, 1 7"
        fill="none"
        stroke={STROKE}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </marker>

    {/* Subtle grid pattern */}
    <pattern
      id="eco-grid"
      width="28"
      height="28"
      patternUnits="userSpaceOnUse"
    >
      <circle cx="14" cy="14" r="0.6" fill="rgba(0,0,0,0.08)" />
    </pattern>
  </defs>
);

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export const ArchitectureDiagramCard: React.FC<
  ArchitectureDiagramCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({eyebrow, title, subtitle, nodes, edges, note}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  // --- Spotlight: find which node is currently "active" based on accentAt ---
  const hasAnyAccentAt = nodes.some((n) => n.accentAt != null);
  let activeNodeId: string | null = null;
  if (hasAnyAccentAt) {
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i];
      if (n.accentAt != null && frame >= Math.round(n.accentAt * fps)) {
        activeNodeId = n.id;
        break;
      }
    }
  }

  const headerReveal = spring({frame, fps, config: motion.spring.standard});
  const headerY = interpolate(headerReveal, [0, 1], [12, 0]);

  // Compute viewBox from node positions
  const pad = 52;
  const allX = nodes.flatMap((n) => [n.x - (n.width ?? 180) / 2, n.x + (n.width ?? 180) / 2]);
  const allY = nodes.flatMap((n) => [n.y - (n.height ?? 56) / 2, n.y + (n.height ?? 56) / 2]);
  const minX = Math.min(...allX) - pad;
  const maxX = Math.max(...allX) + pad;
  const minY = Math.min(...allY) - pad;
  const maxY = Math.max(...allY) + pad;
  const vw = maxX - minX;
  const vh = maxY - minY;

  return (
    <AbsoluteFill style={{background: '#FAFAFA'}}>
      {/* ---- Compact header: top-left corner ---- */}
      <div
        style={{
          position: 'absolute',
          top: 48,
          left: 64,
          zIndex: 2,
          transform: `translateY(${headerY}px)`,
          opacity: headerReveal,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        {eyebrow ? (
          <div
            style={{
              fontFamily: fonts.brand,
              fontSize: tokens.storyboard.architecture.eyebrowSize,
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: colors.muted,
            }}
          >
            {eyebrow}
          </div>
        ) : null}
        {title ? (
          <div
            style={{
              fontFamily: fonts.display,
              fontSize: tokens.storyboard.architecture.titleSize,
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-0.015em',
              color: colors.text,
            }}
          >
            {title}
          </div>
        ) : null}
        {subtitle ? (
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: tokens.storyboard.architecture.subtitleSize,
              lineHeight: 1.3,
              color: colors.muted,
              maxWidth: 500,
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>

      {/* ---- Full-bleed SVG diagram ---- */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '44px 56px 44px 56px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <svg
          viewBox={`${minX} ${minY} ${vw} ${vh}`}
          style={{
            width: '100%',
            flex: 1,
            overflow: 'visible',
            filter: NODE_SHADOW,
          }}
        >
          <DiagramDefs />

          {/* Dot-grid background */}
          <rect x={minX} y={minY} width={vw} height={vh} fill="url(#eco-grid)" />

          {/* ---- Edges ---- */}
          {edges.map((edge, idx) => {
            const fromNode = nodeMap.get(edge.from);
            const toNode = nodeMap.get(edge.to);
            if (!fromNode || !toNode) return null;

            const reveal = spring({
              frame: frame - 8 - idx * 3,
              fps,
              config: motion.spring.slow,
            });

            const s = resolveAnchor(fromNode, toNode);
            const e = resolveAnchor(toNode, fromNode);
            const pathD = buildCurvePath(s.x, s.y, e.x, e.y);

            // Label position — midpoint
            const mx = (s.x + e.x) / 2;
            const my = (s.y + e.y) / 2;

            return (
              <g key={`e-${idx}`} opacity={interpolate(reveal, [0, 0.15, 1], [0, 0.5, 1])}>
                {/* Curve path — animated via dashoffset */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={edge.dashed ? STROKE_LIGHT : STROKE}
                  strokeWidth={1.4}
                  strokeDasharray={edge.dashed ? '6 5' : undefined}
                  strokeLinecap="round"
                  markerEnd="url(#eco-arrow)"
                  style={{
                    // Draw-in: total length approximation via large dasharray
                    strokeDashoffset: edge.dashed
                      ? undefined
                      : interpolate(reveal, [0, 1], [600, 0]),
                    ...(edge.dashed
                      ? {}
                      : {strokeDasharray: '600'}),
                  }}
                />

                {/* Edge label — pill badge */}
                {edge.label ? (
                  <g opacity={reveal}>
                    <rect
                      x={mx - edge.label.length * 4.2 - 8}
                      y={my - 12}
                      width={edge.label.length * 8.4 + 16}
                      height={22}
                      rx={11}
                      ry={11}
                      fill={LABEL_BG}
                      stroke={STROKE_LIGHT}
                      strokeWidth={0.8}
                    />
                    <text
                      x={mx}
                      y={my + 3}
                      textAnchor="middle"
                      fontSize={12}
                      fontWeight={600}
                      fontFamily={fonts.body}
                      fill={colors.muted}
                      letterSpacing="0.03em"
                    >
                      {edge.label}
                    </text>
                  </g>
                ) : null}
              </g>
            );
          })}

          {/* ---- Nodes ---- */}
          {nodes.map((node, idx) => {
            const reveal = spring({
              frame: frame - idx * 3,
              fps,
              config: motion.spring.standard,
            });
            const w = node.width ?? 180;
            const h = node.height ?? 56;
            const nx = node.x - w / 2;
            const ny = node.y - h / 2;
            const yOff = interpolate(reveal, [0, 1], [10, 0]);
            const r = 6;

            // Spotlight logic: override tone when this node is active
            const isSpotlit = hasAnyAccentAt && activeNodeId === node.id;
            const isDimmed = hasAnyAccentAt && activeNodeId != null && activeNodeId !== node.id;
            const effectiveTone = isSpotlit ? 'accent' : node.tone;
            const accentBar = toneAccentBar(effectiveTone);

            // Smooth scale-up for spotlit node
            const spotlightProg = isSpotlit
              ? spring({frame: frame - Math.round((node.accentAt ?? 0) * fps), fps, config: motion.spring.standard})
              : 0;
            const scale = interpolate(typeof spotlightProg === 'number' ? spotlightProg : 0, [0, 1], [1, 1.06]);
            const nodeOpacity = isDimmed ? 0.45 : 1;

            return (
              <g
                key={node.id}
                transform={`translate(0, ${yOff}) scale(${scale})`}
                style={{transformOrigin: `${node.x}px ${node.y}px`}}
                opacity={reveal * nodeOpacity}
              >
                {/* Card body */}
                <rect
                  x={nx}
                  y={ny}
                  width={w}
                  height={h}
                  rx={r}
                  ry={r}
                  fill={toneFill(effectiveTone)}
                  stroke={isSpotlit ? colors.accent : toneStroke(effectiveTone)}
                  strokeWidth={isSpotlit ? 2 : 1}
                />

                {/* Glow ring for spotlit node */}
                {isSpotlit ? (
                  <rect
                    x={nx - 3}
                    y={ny - 3}
                    width={w + 6}
                    height={h + 6}
                    rx={r + 2}
                    ry={r + 2}
                    fill="none"
                    stroke={colors.accentSoft}
                    strokeWidth={2}
                  />
                ) : null}

                {/* Left accent bar (accent / danger tones only) */}
                {accentBar !== 'transparent' ? (
                  <rect
                    x={nx}
                    y={ny}
                    width={4}
                    height={h}
                    rx={2}
                    fill={accentBar}
                  />
                ) : null}


                {/* Label — clean typography, no emoji */}
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fontSize={17}
                  fontWeight={700}
                  fontFamily={fonts.display}
                  fill={colors.text}
                  letterSpacing="-0.01em"
                >
                  {node.label}
                </text>

                {/* Subtle kicker above label (using icon field as semantic tag) */}
                {node.icon ? (
                  <text
                    x={node.x}
                    y={node.y - 11}
                    textAnchor="middle"
                    fontSize={10}
                    fontWeight={700}
                    fontFamily={fonts.brand}
                    fill={colors.muted}
                    letterSpacing="0.12em"
                    textDecoration="none"
                  >
                    {node.icon.toUpperCase()}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>

        {/* Note strip — bottom, outside SVG */}
        {note ? (
          <div
            style={{
              alignSelf: 'center',
              maxWidth: 960,
              textAlign: 'center',
              fontFamily: fonts.body,
              fontSize: 26,
              lineHeight: 1.36,
              color: colors.muted,
              padding: '8px 0 0',
              borderTop: '1px solid rgba(0,0,0,0.08)',
              marginTop: 4,
            }}
          >
            {note}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
