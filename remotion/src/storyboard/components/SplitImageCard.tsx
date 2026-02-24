import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {z} from 'zod';

import type {LessonBlockContext} from '../../lesson-config';
import {colors, fonts} from '../../theme';
import type {StoryboardInjected} from '../types';
import {CardShell} from './CardShell';

export const SplitImageCardPropsSchema = z
  .object({
    eyebrow: z.string().optional(),
    title: z.string(),
    subtitle: z.string().optional(),
    bullets: z
      .array(
        z.object({
          text: z.string(),
          tone: z.enum(['accent', 'default', 'muted']).optional(),
        }),
      )
      .default([]),
    note: z.string().optional(),
  })
  .strict();

export type SplitImageCardProps = z.infer<typeof SplitImageCardPropsSchema>;

export const SplitImageCard: React.FC<
  SplitImageCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({eyebrow, title, subtitle, bullets, note, hq}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = spring({frame, fps, config: {damping: 200}});
  const y = interpolate(reveal, [0, 1], [18, 0]);
  const opacity = interpolate(reveal, [0, 1], [0, 1]);

  const imageReveal = spring({
    frame: frame - 8,
    fps,
    config: {damping: 24, stiffness: 180},
  });
  const imageOpacity = interpolate(imageReveal, [0, 1], [0, 1]);
  const imageScale = interpolate(imageReveal, [0, 1], [0.92, 1]);

  const assetRef = hq?.assetRef ?? null;
  const imgSrc =
    assetRef && /^https?:\/\//i.test(assetRef) ? assetRef : assetRef ? staticFile(assetRef) : null;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        padding: 96,
        justifyContent: 'center',
      }}
    >
      <div style={{transform: `translateY(${y}px)`, opacity}}>
        <CardShell
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          leftFraction={0.72}
          rightFraction={1.28}
          rightSlot={
            imgSrc ? (
              <div
                style={{
                  borderRadius: 22,
                  overflow: 'hidden',
                  backgroundColor: colors.background,
                  opacity: imageOpacity,
                  transform: `scale(${imageScale})`,
                  transformOrigin: 'center center',
                }}
              >
                <Img
                  src={imgSrc}
                  style={{width: '100%', height: '100%', objectFit: 'contain', minHeight: 420}}
                />
              </div>
            ) : null
          }
        >
          <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
            {bullets.map((b, idx) => (
              <div
                key={`${idx}-${b.text}`}
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                  fontFamily: fonts.body,
                  fontSize: 28,
                  color: b.tone === 'muted' ? colors.muted : colors.text,
                  lineHeight: 1.3,
                }}
              >
                <span style={{color: b.tone === 'accent' ? colors.text : colors.muted}}>
                  {b.tone === 'accent' ? '•' : '–'}
                </span>
                <span>{b.text}</span>
              </div>
            ))}
          </div>
          {note ? (
            <div
              style={{
                marginTop: 20,
                padding: '16px 18px',
                borderRadius: 16,
                backgroundColor: colors.accentSoft,
                border: `1px solid ${colors.borderSoft}`,
              }}
            >
              <div
                style={{
                  fontFamily: fonts.brand,
                  fontSize: 14,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: colors.muted,
                  marginBottom: 8,
                }}
              >
                Note
              </div>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 24,
                  color: colors.text,
                  lineHeight: 1.35,
                }}
              >
                {note}
              </div>
            </div>
          ) : null}
        </CardShell>
      </div>
    </AbsoluteFill>
  );
};
