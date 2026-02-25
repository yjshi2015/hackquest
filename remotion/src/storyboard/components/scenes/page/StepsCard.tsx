import {HiArrowDownCircle} from 'react-icons/hi2';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {z} from 'zod';

import type {LessonBlockContext} from '../../../../lesson-config';
import {colors, fonts, motion, tokens} from '../../../../theme';
import type {StoryboardInjected} from '../../../types';
import {SceneScaffold} from '../../shared/scaffolds/SceneScaffold';

export const StepsCardPropsSchema = z
  .object({
    eyebrow: z.string().optional(),
    title: z.string(),
    subtitle: z.string().optional(),
    steps: z
      .array(
        z.object({
          title: z.string(),
          detail: z.string().optional(),
          appearAt: z.number().nonnegative().optional(),
        }),
      )
      .min(1),
    activeStep: z.number().int().positive().optional(),
  })
  .strict();

export type StepsCardProps = z.infer<typeof StepsCardPropsSchema>;

/** Stagger delay per step in frames */
const STAGGER_FRAMES = 10;

export const StepsCard: React.FC<
  StepsCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({eyebrow, title, subtitle, steps, activeStep, context}) => {
  const activeIndex = activeStep ? Math.max(1, activeStep) - 1 : -1;
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <SceneScaffold
      background={
        'radial-gradient(circle at 90% 8%, rgba(255, 232, 102, 0.28), transparent 34%), #ffffff'
      }
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      titleSize={tokens.storyboard.header.titleSizeStandard}
      contentTop={24}
    >
      <div style={{height: '100%', display: 'flex', flexDirection: 'column', gap: 12}}>
        {steps.map((step, idx) => {
          const isActive = idx === activeIndex;
          const isAfterActive = activeIndex >= 0 && idx > activeIndex;
          const hasNext = idx < steps.length - 1;

          const delay = step.appearAt != null ? Math.round(step.appearAt * fps) : idx * STAGGER_FRAMES;
          const prog = spring({frame: Math.max(0, frame - delay), fps, config: motion.spring.standard});
          const x = interpolate(prog, [0, 1], [-32, 0]);
          const opacity = interpolate(prog, [0, 1], [0, 1]);

          return (
            <div
              key={`${idx}-${step.title}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '88px 1fr',
                gap: 14,
                transform: `translateX(${x}px)`,
                opacity,
              }}
            >              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isActive ? colors.accent : 'rgba(0, 0, 0, 0.1)',
                    fontFamily: fonts.brand,
                    fontSize: 36,
                    fontWeight: 900,
                    color: colors.text,
                  }}
                >
                  {idx + 1}
                </div>

                {hasNext ? (
                  <div
                    style={{
                      width: 3,
                      flex: 1,
                      minHeight: 24,
                      marginTop: 6,
                      borderRadius: 999,
                      backgroundColor: 'rgba(0, 0, 0, 0.15)',
                    }}
                  />
                ) : null}
              </div>

              <div
                style={{
                  padding: '16px 18px',
                  borderRadius: 20,
                  backgroundColor: isActive ? 'rgba(255, 232, 102, 0.44)' : 'rgba(255, 255, 255, 0.78)',
                  opacity: isAfterActive ? 0.72 : 1,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      fontFamily: fonts.display,
                      fontSize: 48,
                      fontWeight: 850,
                      color: colors.text,
                      lineHeight: 1.12,
                      marginBottom: step.detail ? 6 : 0,
                    }}
                  >
                    {step.title}
                  </div>
                  {hasNext ? (
                    <div style={{color: colors.muted, opacity: 0.7}}>
                      <HiArrowDownCircle size={26} />
                    </div>
                  ) : null}
                </div>

                {step.detail ? (
                  <div
                    style={{
                      fontFamily: fonts.body,
                      fontWeight: 400,
                      fontSize: 34,
                      lineHeight: 1.34,
                      color: colors.bodyText,
                      maxWidth: 1040,
                    }}
                  >
                    {step.detail}
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </SceneScaffold>
  );
};
