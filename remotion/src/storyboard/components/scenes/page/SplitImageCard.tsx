import {Img, staticFile} from 'remotion';
import {z} from 'zod';

import {resolveLessonPublicPath} from '../../../../lib/lesson-paths';
import type {LessonBlockContext} from '../../../../lesson-config';
import {colors, fonts, tokens} from '../../../../theme';
import type {StoryboardInjected} from '../../../types';
import {SceneScaffold} from '../../shared/scaffolds/SceneScaffold';

/* ═══════════════════════════════════════════════════════════════
   Schema
   ═══════════════════════════════════════════════════════════════ */

const BulletSchema = z
  .object({
    text: z.string(),
    tone: z.enum(['accent', 'default', 'muted']).optional(),
  })
  .strict();

const ImageItemSchema = z.union([
  z.string(),
  z
    .object({
      src: z.string(),
      label: z.string().optional(),
      caption: z.string().optional(),
      fit: z.enum(['cover', 'contain']).optional(),
    })
    .strict(),
]);

const CompareRowSchema = z
  .object({
    label: z.string(),
    left: z.string(),
    right: z.string(),
    highlight: z.enum(['left', 'right', 'both']).optional(),
    /** @deprecated Use `highlight`. Kept for backward compatibility. */
    emphasis: z.enum(['left', 'right', 'both', 'none']).optional(),
  })
  .strict();

const CompareSchema = z
  .object({
    leftLabel: z.string().optional(),
    rightLabel: z.string().optional(),
    rows: z.array(CompareRowSchema).min(1),
    note: z.string().optional(),
  })
  .strict();

/* Canonical layout names */
const LAYOUTS = [
  'text-image',
  'image-text',
  'hero',
  'compare',
  'gallery',
] as const;

/* Legacy variant names (deprecated but still accepted) */
const LEGACY_VARIANTS = [
  'auto',
  'text-left-image-right',
  'image-left-text-right',
  'single-image',
  'dual-image',
  'multi-image',
] as const;

/**
 * SplitImage — image evidence with text explanation.
 *
 * | layout       | Description                                 |
 * |--------------|---------------------------------------------|
 * | `text-image` | Text left, single image right (**default**) |
 * | `image-text` | Single image left, text right               |
 * | `hero`       | Full-width image top, text below            |
 * | `compare`    | Comparison table left, two images right     |
 * | `gallery`    | Multi-image grid, optional text left        |
 *
 * Image sources (priority):
 * 1. `images` prop array — for labelled / multi-image cases
 * 2. `Asset Ref` / `Asset Ref 2` in script.md (injected via hq)
 *
 * When no image is available, a dashed wireframe placeholder is shown.
 */
export const SplitImageCardPropsSchema = z
  .object({
    eyebrow: z.string().optional(),
    title: z.string().optional(),
    subtitle: z.string().optional(),
    layout: z.enum([...LAYOUTS]).optional(),
    /** @deprecated Use `layout` instead. */
    variant: z.enum([...LEGACY_VARIANTS]).optional(),
    images: z.array(ImageItemSchema).optional(),
    imageFit: z.enum(['cover', 'contain']).optional(),
    bullets: z.array(BulletSchema).default([]),
    note: z.string().optional(),
    compare: CompareSchema.optional(),
  })
  .strict();

export type SplitImageCardProps = z.infer<typeof SplitImageCardPropsSchema>;

/* ═══════════════════════════════════════════════════════════════
   Internal types & constants
   ═══════════════════════════════════════════════════════════════ */

type ResolvedImage = {
  src: string;
  label?: string;
  caption?: string;
  fit: 'cover' | 'contain';
  key: string;
};

type Layout = (typeof LAYOUTS)[number];

const LEGACY_MAP: Record<string, Layout> = {
  'text-left-image-right': 'text-image',
  'image-left-text-right': 'image-text',
  'single-image': 'hero',
  'dual-image': 'compare',
  'multi-image': 'gallery',
};

/* ═══════════════════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════════════════ */

const resolveMediaSrc = (raw: string | null | undefined, metaFile: string): string | null => {
  if (!raw) return null;
  const trimmed = String(raw).trim();
  if (!trimmed) return null;
  const resolved = resolveLessonPublicPath(metaFile, trimmed) ?? trimmed;
  return /^https?:\/\//i.test(resolved) ? resolved : staticFile(resolved);
};

/** Merge images from props with Asset Ref fallbacks into a resolved list. */
const resolveImages = (
  images: SplitImageCardProps['images'],
  imageFit: SplitImageCardProps['imageFit'],
  hq?: StoryboardInjected,
): ResolvedImage[] => {
  const metaFile = hq?.metaFile ?? '';
  const defaultFit = imageFit ?? 'contain';
  const sources =
    images && images.length > 0
      ? images
      : ([hq?.assetRef, hq?.assetRef2].filter(Boolean) as string[]);

  return sources
    .map((entry, idx): ResolvedImage | null => {
      const raw = typeof entry === 'string' ? entry : entry.src;
      const src = resolveMediaSrc(raw, metaFile);
      if (!src) return null;
      return {
        src,
        label: typeof entry === 'string' ? undefined : entry.label,
        caption: typeof entry === 'string' ? undefined : entry.caption,
        fit: typeof entry === 'string' ? defaultFit : (entry.fit ?? defaultFit),
        key: `${idx}-${raw}`,
      };
    })
    .filter((x): x is ResolvedImage => x !== null);
};

/** Resolve `layout` from the new name, deprecated `variant`, or auto-detect. */
const resolveLayout = (
  layout: Layout | undefined,
  variant: string | undefined,
  imageCount: number,
  hasCompare: boolean,
): Layout => {
  if (layout) return layout;
  if (variant && variant !== 'auto') {
    const mapped = LEGACY_MAP[variant];
    if (mapped) return mapped;
  }
  if (hasCompare && imageCount >= 2) return 'compare';
  if (imageCount >= 3) return 'gallery';
  return 'text-image';
};

/* ═══════════════════════════════════════════════════════════════
   Sub-components
   ═══════════════════════════════════════════════════════════════ */

/** Dashed wireframe placeholder shown when no image is resolved. */
const ImagePlaceholder: React.FC<{label?: string}> = ({label}) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      minHeight: 180,
      borderRadius: tokens.radii.md,
      border: `${tokens.stroke.strong}px dashed rgba(0, 0, 0, 0.2)`,
      backgroundColor: 'rgba(0, 0, 0, 0.015)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Diagonal cross-guidelines (wireframe look) */}
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}}
    >
      <line x1="0" y1="0" x2="100" y2="100" stroke="rgba(0,0,0,0.07)" strokeWidth="0.4" />
      <line x1="100" y1="0" x2="0" y2="100" stroke="rgba(0,0,0,0.07)" strokeWidth="0.4" />
    </svg>
    {/* Landscape / image icon */}
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{opacity: 0.28}}>
      <rect x="2" y="3" width="20" height="18" rx="2.5" stroke="#000" strokeWidth="1.3" />
      <circle cx="8" cy="9.5" r="2" stroke="#000" strokeWidth="1.3" />
      <path
        d="M2 17l5-5 3 3 4-4 8 8"
        stroke="#000"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span
      style={{
        fontFamily: fonts.brand,
        fontSize: 18,
        fontWeight: 700,
        letterSpacing: '0.16em',
        textTransform: 'uppercase' as const,
        color: 'rgba(0, 0, 0, 0.22)',
      }}
    >
      {label ?? 'Image'}
    </span>
  </div>
);

/** Single image tile with optional label badge and caption overlay. */
const MediaTile: React.FC<{item: ResolvedImage; radius?: number}> = ({
  item,
  radius = tokens.radii.md,
}) => (
  <div
    style={{
      borderRadius: radius,
      overflow: 'hidden',
      border: `${tokens.stroke.hairline}px solid ${tokens.colors.borderSoft}`,
      backgroundColor: tokens.colors.panelSoft,
      position: 'relative',
      width: '100%',
      height: '100%',
      minHeight: 0,
    }}
  >
    <Img
      src={item.src}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: item.fit,
        backgroundColor: tokens.colors.bg,
      }}
    />
    {item.label ? (
      <div
        style={{
          position: 'absolute',
          left: 12,
          top: 12,
          padding: '5px 12px',
          borderRadius: tokens.radii.pill,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          border: `${tokens.stroke.hairline}px solid rgba(0, 0, 0, 0.1)`,
          fontFamily: fonts.brand,
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
          color: colors.text,
        }}
      >
        {item.label}
      </div>
    ) : null}
    {item.caption ? (
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: '28px 14px 12px',
          background: 'linear-gradient(0deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0) 100%)',
          fontFamily: fonts.body,
          fontSize: 22,
          lineHeight: 1.25,
          color: colors.text,
        }}
      >
        {item.caption}
      </div>
    ) : null}
  </div>
);

/** Bullet list with optional note box — minimal styling, text is annotation not hero. */
const TextPanel: React.FC<{
  bullets: SplitImageCardProps['bullets'];
  note?: string;
  compact?: boolean;
}> = ({bullets, note, compact = false}) => {
  if (!bullets.length && !note) return null;
  const fs = compact ? 28 : 30;

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10}}>
      {bullets.map((b, idx) => {
        const accent = b.tone === 'accent';
        const muted = b.tone === 'muted';
        return (
          <div
            key={`${idx}-${b.text}`}
            style={{
              display: 'flex',
              gap: 10,
              alignItems: 'baseline',
              paddingLeft: 4,
              borderLeft: accent
                ? `3px solid ${colors.accent}`
                : '3px solid transparent',
            }}
          >
            <span
              style={{
                fontFamily: fonts.body,
                fontSize: fs,
                lineHeight: 1,
                color: colors.muted,
                flexShrink: 0,
              }}
            >
              •
            </span>
            <span
              style={{
                fontFamily: fonts.body,
                fontWeight: accent ? 600 : 400,
                fontSize: fs,
                lineHeight: 1.4,
                color: muted ? colors.muted : colors.bodyText,
              }}
            >
              {b.text}
            </span>
          </div>
        );
      })}

      {note ? (
        <div
          style={{
            marginTop: 6,
            paddingLeft: 14,
            borderLeft: `3px solid ${colors.accent}`,
          }}
        >
          <div
            style={{
              fontFamily: fonts.brand,
              fontSize: compact ? 16 : 17,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              color: colors.muted,
              marginBottom: 4,
            }}
          >
            Note
          </div>
          <div
            style={{
              fontFamily: fonts.body,
              fontWeight: 400,
              fontSize: compact ? 24 : 26,
              lineHeight: 1.4,
              color: colors.muted,
            }}
          >
            {note}
          </div>
        </div>
      ) : null}
    </div>
  );
};

/* Shared style for compare table header cells. */
const compareHeaderStyle: React.CSSProperties = {
  fontFamily: fonts.brand,
  fontSize: 22,
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: colors.muted,
};

/** Comparison table for the `compare` layout. */
const CompareTable: React.FC<{
  data: NonNullable<SplitImageCardProps['compare']>;
  leftFallback?: string;
  rightFallback?: string;
}> = ({data, leftFallback, rightFallback}) => {
  const lbl = data.leftLabel ?? leftFallback ?? 'A';
  const rbl = data.rightLabel ?? rightFallback ?? 'B';

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 10, alignSelf: 'start'}}>
      {/* Header row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '0.8fr 1.1fr 1.1fr',
          gap: 8,
          padding: '10px 14px',
          borderRadius: tokens.radii.sm,
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          border: `${tokens.stroke.hairline}px solid ${tokens.colors.borderSoft}`,
        }}
      >
        <div style={compareHeaderStyle}>Dimension</div>
        <div style={{...compareHeaderStyle, color: colors.text}}>{lbl}</div>
        <div style={{...compareHeaderStyle, color: colors.text}}>{rbl}</div>
      </div>

      {/* Data rows */}
      {data.rows.map((row, idx) => {
        const hl = row.highlight ?? (row.emphasis === 'none' ? undefined : row.emphasis);
        const hlL = hl === 'left' || hl === 'both';
        const hlR = hl === 'right' || hl === 'both';
        return (
          <div
            key={`${idx}-${row.label}`}
            style={{
              display: 'grid',
              gridTemplateColumns: '0.8fr 1.1fr 1.1fr',
              gap: 8,
              padding: '11px 14px',
              borderRadius: tokens.radii.sm,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: `${tokens.stroke.hairline}px solid rgba(0, 0, 0, 0.05)`,
            }}
          >
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: 24,
                lineHeight: 1.25,
                fontWeight: 500,
                color: colors.muted,
              }}
            >
              {row.label}
            </div>
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: 26,
                lineHeight: 1.25,
                fontWeight: hlL ? 700 : 400,
                color: colors.bodyText,
              }}
            >
              {row.left}
            </div>
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: 26,
                lineHeight: 1.25,
                fontWeight: hlR ? 700 : 400,
                color: colors.bodyText,
              }}
            >
              {row.right}
            </div>
          </div>
        );
      })}

      {/* Optional note */}
      {data.note ? (
        <div
          style={{
            marginTop: 2,
            padding: '12px 14px',
            borderRadius: tokens.radii.sm + 2,
            background:
              `linear-gradient(180deg, ${colors.accentSoft}, rgba(255, 255, 255, 0.72))`,
            border: `${tokens.stroke.hairline}px solid rgba(255, 210, 0, 0.18)`,
          }}
        >
          <div
            style={{
              fontFamily: fonts.brand,
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              color: colors.muted,
              marginBottom: 5,
            }}
          >
            Note
          </div>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 26,
              lineHeight: 1.3,
              color: colors.bodyText,
            }}
          >
            {data.note}
          </div>
        </div>
      ) : null}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   Main component
   ═══════════════════════════════════════════════════════════════ */

export const SplitImageCard: React.FC<
  SplitImageCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({eyebrow, title, subtitle, layout: rawLayout, variant, images, imageFit, bullets, note, compare, hq, context}) => {
  const media = resolveImages(images, imageFit, hq);
  const layout = resolveLayout(rawLayout, variant, media.length, Boolean(compare));
  const hasText = bullets.length > 0 || Boolean(note);
  const isCompact = layout === 'compare' || layout === 'gallery';

  const titleSize = isCompact
    ? tokens.storyboard.header.titleSizeSplitImageDual
    : tokens.storyboard.header.titleSizeSplitImageSingle;

  /* ── text-image / image-text ────────────────────────────────── */
  const renderSideBySide = (imageFirst: boolean) => {
    const textCol = hasText ? <TextPanel bullets={bullets} note={note} /> : null;
    const imageCol =
      media.length > 0 ? (
        <MediaTile item={media[0]} radius={tokens.radii.lg} />
      ) : (
        <ImagePlaceholder />
      );

    if (!hasText && media.length === 0) return <ImagePlaceholder />;
    if (!hasText) return <div style={{height: '100%'}}>{imageCol}</div>;
    if (media.length === 0) return <div>{textCol}</div>;

    return (
      <div
        style={{
          height: '100%',
          display: 'grid',
          gridTemplateColumns: imageFirst ? '1.15fr 0.85fr' : '0.85fr 1.15fr',
          gap: 28,
          alignItems: 'start',
        }}
      >
        {imageFirst ? (
          <>
            <div style={{height: '100%'}}>{imageCol}</div>
            <div style={{paddingTop: 8}}>{textCol}</div>
          </>
        ) : (
          <>
            <div style={{paddingTop: 8}}>{textCol}</div>
            <div style={{height: '100%'}}>{imageCol}</div>
          </>
        )}
      </div>
    );
  };

  /* ── hero ────────────────────────────────────────────────────── */
  const renderHero = () => {
    const imageBlock =
      media.length > 0 ? (
        <div style={{flex: 1, minHeight: 0}}>
          <MediaTile item={media[0]} radius={tokens.radii.lg} />
        </div>
      ) : (
        <div style={{flex: 1, minHeight: 0}}>
          <ImagePlaceholder />
        </div>
      );

    return (
      <div style={{height: '100%', display: 'flex', flexDirection: 'column', gap: 14}}>
        {imageBlock}
        {hasText ? (
          <div style={{flexShrink: 0, maxHeight: '30%', overflow: 'hidden'}}>
            <TextPanel bullets={bullets} note={note} compact />
          </div>
        ) : null}
      </div>
    );
  };

  /* ── compare ────────────────────────────────────────────────── */
  const renderCompare = () => {
    const imgs = media.slice(0, 2);
    const hasCompareData = Boolean(compare);
    const hasBottom = hasCompareData || hasText;

    /* Top row: two images side-by-side (matches left/right column logic) */
    const imageRow = (
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 16,
        }}
      >
        {imgs.length >= 1 ? (
          <MediaTile item={imgs[0]} radius={tokens.radii.md} />
        ) : (
          <ImagePlaceholder label={compare?.leftLabel ?? 'Image 1'} />
        )}
        {imgs.length >= 2 ? (
          <MediaTile item={imgs[1]} radius={tokens.radii.md} />
        ) : (
          <ImagePlaceholder label={compare?.rightLabel ?? 'Image 2'} />
        )}
      </div>
    );

    /* Bottom: compare table (full-width) or text panel */
    const bottomPanel = hasCompareData ? (
      <CompareTable data={compare!} leftFallback={imgs[0]?.label} rightFallback={imgs[1]?.label} />
    ) : hasText ? (
      <TextPanel bullets={bullets} note={note} compact />
    ) : null;

    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        {imageRow}
        {bottomPanel ? <div style={{flexShrink: 0}}>{bottomPanel}</div> : null}
      </div>
    );
  };

  /* ── gallery ────────────────────────────────────────────────── */
  const renderGallery = () => {
    const cols = hasText ? 2 : 3;
    const maxVisible = cols === 3 ? 6 : 4;
    const visible = media.slice(0, maxVisible);

    const grid =
      visible.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            gridAutoRows: 'minmax(0, 1fr)',
            gap: 12,
            height: '100%',
          }}
        >
          {visible.map((item) => (
            <MediaTile key={item.key} item={item} radius={14} />
          ))}
        </div>
      ) : (
        <ImagePlaceholder />
      );

    if (!hasText) return <div style={{height: '100%'}}>{grid}</div>;

    return (
      <div
        style={{
          height: '100%',
          display: 'grid',
          gridTemplateColumns: '0.72fr 1.28fr',
          gap: 24,
          alignItems: 'start',
        }}
      >
        <div style={{paddingTop: 4}}>
          <TextPanel bullets={bullets} note={note} compact />
        </div>
        {grid}
      </div>
    );
  };

  /* ── Dispatch ────────────────────────────────────────────────── */
  let body: React.ReactNode;
  switch (layout) {
    case 'image-text':
      body = renderSideBySide(true);
      break;
    case 'hero':
      body = renderHero();
      break;
    case 'compare':
      body = renderCompare();
      break;
    case 'gallery':
      body = renderGallery();
      break;
    case 'text-image':
    default:
      body = renderSideBySide(false);
      break;
  }

  return (
    <SceneScaffold
      background={`linear-gradient(150deg, #fff 0%, #fff 60%, ${colors.accentGhost} 100%)`}
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      titleSize={titleSize}
      contentTop={24}
      contentStyle={{flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0}}
    >
      <div style={{flex: 1, minHeight: 0}}>{body}</div>
    </SceneScaffold>
  );
};
