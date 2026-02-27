import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {z} from 'zod';

import type {LessonBlockContext} from '../../../../lesson-config';
import {colors, fonts, motion, tokens} from '../../../../theme';
import type {StoryboardInjected} from '../../../types';
import {SceneScaffold} from '../../shared/scaffolds/SceneScaffold';

export const BulletToneSchema = z.enum(['accent', 'default', 'muted']);

export const BulletCardPropsSchema = z
  .object({
    eyebrow: z.string().optional(),
    title: z.string().optional(),
    subtitle: z.string().optional(),
    badge: z.string().optional(),
    bullets: z
      .array(
        z.object({
          text: z.string(),
          tone: BulletToneSchema.optional(),
          icon: z.string().optional(),
          appearAt: z.number().nonnegative().optional(),
        }),
      )
      .default([]),
    note: z.string().optional(),
    noteAppearAt: z.number().nonnegative().optional(),
  })
  .strict();

export type BulletCardProps = z.infer<typeof BulletCardPropsSchema>;

const toneToBubble = (tone: BulletCardProps['bullets'][number]['tone']) => {
  if (tone === 'muted') return 'rgba(0, 0, 0, 0.08)';
  return colors.accentStrong;
};

const toneToText = (tone?: BulletCardProps['bullets'][number]['tone']) => {
  if (tone === 'muted') return colors.muted;
  return colors.bodyText;
};

const toneToRow = (tone: BulletCardProps['bullets'][number]['tone']) => {
  if (tone === 'accent')
    return {
      background:
        `linear-gradient(135deg, ${colors.accentSoft}, ${colors.accentGhost} 80%)`,
      border: `2px solid rgba(${colors.accentRgb}, 0.48)`,
      fontWeight: 700 as const,
      color: colors.text,
    };
  return {
    background: 'rgba(255, 255, 255, 0.76)',
    border: '2px solid transparent',
    fontWeight: 400 as const,
    color: toneToText(tone),
  };
};

/** Stagger delay per bullet item in frames */
const STAGGER_FRAMES = 8;

export const BulletCard: React.FC<
  BulletCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({eyebrow, title, subtitle, badge, bullets, note, noteAppearAt, context}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <SceneScaffold
      background={
        `radial-gradient(circle at 9% 20%, ${colors.accentSoft}, transparent 34%), radial-gradient(circle at 86% 84%, rgba(0, 0, 0, 0.06), transparent 40%), #ffffff`
      }
      eyebrow={eyebrow ?? badge}
      title={title}
      subtitle={subtitle}
      titleSize={tokens.storyboard.header.titleSizeStandard}
      contentTop={26}
    >
      <div
        style={{
          height: '100%',
          display: 'grid',
          gridTemplateColumns: note ? '1fr 0.38fr' : '1fr',
          gap: 28,
          alignItems: 'start',
        }}
      >
        <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
          {bullets.map((b, idx) => {
            const delay = b.appearAt != null ? Math.round(b.appearAt * fps) : idx * STAGGER_FRAMES;
            const prog = spring({frame: Math.max(0, frame - delay), fps, config: motion.spring.standard});
            const y = interpolate(prog, [0, 1], [24, 0]);
            const opacity = interpolate(prog, [0, 1], [0, 1]);

            const row = toneToRow(b.tone);

            return (
              <div
                key={`${idx}-${b.text}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '44px 1fr',
                  gap: 14,
                  alignItems: 'flex-start',
                  padding: '14px 18px',
                  borderRadius: 20,
                  background: row.background,
                  border: row.border,
                  transform: `translateY(${y}px)`,
                  opacity,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: toneToBubble(b.tone),
                    fontFamily: fonts.brand,
                    fontWeight: 900,
                    fontSize: 30,
                    color: colors.text,
                  }}
                >
                  {b.icon ?? String(idx + 1)}
                </div>
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontWeight: row.fontWeight,
                    fontSize: 36,
                    lineHeight: 1.34,
                    color: row.color,
                  }}
                >
                  {b.text}
                </div>
              </div>
            );
          })}
        </div>

        {note ? (() => {
          const lastBulletDelay = bullets.length > 0 && bullets[bullets.length - 1].appearAt != null
            ? Math.round(bullets[bullets.length - 1].appearAt! * fps)
            : bullets.length * STAGGER_FRAMES;
          const noteDelay = noteAppearAt != null ? Math.round(noteAppearAt * fps) : lastBulletDelay + STAGGER_FRAMES;
          const noteProg = spring({frame: Math.max(0, frame - noteDelay), fps, config: motion.spring.standard});
          const noteY = interpolate(noteProg, [0, 1], [24, 0]);
          const noteOpacity = interpolate(noteProg, [0, 1], [0, 1]);

          return (
            <div
              style={{
                alignSelf: 'start',
                borderRadius: 24,
                padding: '18px 18px',
                background:
                  `linear-gradient(180deg, ${colors.accentMedium}, rgba(255, 255, 255, 0.74) 38%)`,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                transform: `translateY(${noteY}px)`,
                opacity: noteOpacity,
              }}
            >
              <div
                style={{
                  fontFamily: fonts.brand,
                  fontSize: 24,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: colors.muted,
                }}
              >
                Note
              </div>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontWeight: 400,
                  color: colors.bodyText,
                  fontSize: 32,
                  lineHeight: 1.36,
                }}
              >
                {note}
              </div>
            </div>
          );
        })() : null}
      </div>
    </SceneScaffold>
  );
};
