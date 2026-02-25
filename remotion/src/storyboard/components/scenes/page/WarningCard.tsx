import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {z} from 'zod';

import type {LessonBlockContext} from '../../../../lesson-config';
import {colors, fonts, tokens} from '../../../../theme';
import type {StoryboardInjected} from '../../../types';
import {SceneScaffold} from '../../shared/scaffolds/SceneScaffold';
import {secondsToFrames} from '../../shared/timing';

export const WarningCardPropsSchema = z
  .object({
    eyebrow: z.string().optional(),
    title: z.string(),
    message: z.string(),
    bullets: z
      .array(
        z.union([
          z.string(),
          z
            .object({
              text: z.string(),
              appearAt: z.number().nonnegative().optional(),
            })
            .strict(),
        ]),
      )
      .default([]),
    asideAppearAt: z.number().nonnegative().optional(),
  })
  .strict();

export type WarningCardProps = z.infer<typeof WarningCardPropsSchema>;

export const WarningCard: React.FC<
  WarningCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({eyebrow, title, message, bullets, asideAppearAt}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const normalizedBullets = bullets.map((bullet) =>
    typeof bullet === 'string' ? {text: bullet} : bullet,
  );
  const lastBulletDelay = normalizedBullets.reduce((acc, bullet, idx) => {
    const delay = bullet.appearAt != null ? secondsToFrames(bullet.appearAt, fps) : idx * 8;
    return Math.max(acc, delay);
  }, 0);
  const asideDelay =
    asideAppearAt != null ? secondsToFrames(asideAppearAt, fps) : lastBulletDelay + 8;
  const asideReveal = spring({
    frame: Math.max(0, frame - asideDelay),
    fps,
    config: {damping: 220, stiffness: 180, mass: 0.8},
  });
  const asideY = interpolate(asideReveal, [0, 1], [10, 0]);
  const asideOpacity = interpolate(asideReveal, [0, 1], [0, 1]);

  return (
    <SceneScaffold
      background={
        'radial-gradient(circle at 88% 12%, rgba(255, 232, 102, 0.34), transparent 36%), #ffffff'
      }
      eyebrow={eyebrow}
      title={title}
      subtitle={message}
      contentTop={24}
      titleSize={tokens.storyboard.header.titleSizeStandard}
    >
      <div
        style={{
          height: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 0.44fr',
          gap: 20,
          alignItems: 'start',
        }}
      >
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          {normalizedBullets.map((bullet, idx) => {
            const delay = bullet.appearAt != null ? secondsToFrames(bullet.appearAt, fps) : idx * 8;
            const reveal = spring({
              frame: Math.max(0, frame - delay),
              fps,
              config: {damping: 220, stiffness: 180, mass: 0.8},
            });
            const y = interpolate(reveal, [0, 1], [10, 0]);
            const opacity = interpolate(reveal, [0, 1], [0, 1]);

            return (
              <div
                key={`${idx}-${bullet.text}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '26px 1fr',
                  gap: 10,
                  alignItems: 'start',
                  padding: '14px 16px',
                  borderRadius: 16,
                  backgroundColor:
                    idx % 2 === 0 ? 'rgba(255, 255, 255, 0.82)' : 'rgba(0, 0, 0, 0.05)',
                  fontFamily: fonts.body,
                  fontWeight: 400,
                  fontSize: 34,
                  color: colors.bodyText,
                  lineHeight: 1.34,
                  transform: `translateY(${y}px)`,
                  opacity,
                }}
              >
                <span style={{color: colors.muted}}>–</span>
                <span>{bullet.text}</span>
              </div>
            );
          })}
        </div>

        <div
          style={{
            height: '100%',
            borderRadius: 22,
            background: 'linear-gradient(180deg, rgba(255, 232, 102, 0.5), rgba(255, 255, 255, 0.72) 44%)',
            padding: '20px 18px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transform: `translateY(${asideY}px)`,
            opacity: asideOpacity,
          }}
        >
          <div
            style={{
              fontFamily: fonts.brand,
              fontSize: 24,
              fontWeight: 900,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: colors.muted,
            }}
          >
            Risk Lens
          </div>

          <div
            style={{
              fontFamily: fonts.body,
              fontWeight: 400,
              fontSize: 34,
              lineHeight: 1.34,
              color: colors.bodyText,
            }}
          >
            Keep this calm and actionable.
            <br />
            Name the failure mode, then name the guardrail.
          </div>
        </div>
      </div>
    </SceneScaffold>
  );
};
