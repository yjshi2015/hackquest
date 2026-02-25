import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {z} from 'zod';

import type {LessonBlockContext} from '../../../../lesson-config';
import {colors, fonts, motion, tokens} from '../../../../theme';
import type {StoryboardInjected} from '../../../types';
import {SceneScaffold} from '../../shared/scaffolds/SceneScaffold';

export const RoadmapCardPropsSchema = z
  .object({
    eyebrow: z.string().optional(),
    title: z.string(),
    subtitle: z.string().optional(),
    phases: z
      .array(
        z.object({
          label: z.string(),
          title: z.string(),
          detail: z.string().optional(),
          appearAt: z.number().nonnegative().optional(),
        }),
      )
      .min(1),
    activePhase: z.number().int().positive().optional(),
  })
  .strict();

export type RoadmapCardProps = z.infer<typeof RoadmapCardPropsSchema>;

/** Stagger delay per phase in frames */
const STAGGER_FRAMES = 10;

export const RoadmapCard: React.FC<
  RoadmapCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({eyebrow, title, subtitle, phases, activePhase, context}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // When activePhase is explicitly set, use it. Otherwise auto-track:
  // the "active" phase is the most recently appeared one.
  let activeIdx: number;
  if (activePhase != null) {
    activeIdx = activePhase - 1;
  } else {
    activeIdx = -1;
    for (let i = phases.length - 1; i >= 0; i--) {
      const delay =
        phases[i].appearAt != null
          ? Math.round(phases[i].appearAt! * fps)
          : i * STAGGER_FRAMES;
      if (frame >= delay) {
        activeIdx = i;
        break;
      }
    }
  }

  return (
    <SceneScaffold
      background={
        'linear-gradient(160deg, rgba(255,255,255,1) 0%, rgba(255, 232, 102, 0.16) 100%)'
      }
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      titleSize={tokens.storyboard.header.titleSizeStandard}
      contentTop={24}
    >
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          gap: 0,
        }}
      >
        {phases.map((phase, idx) => {
          const isActive = idx === activeIdx;
          const isPast = activeIdx >= 0 && idx < activeIdx;
          const isFuture = activeIdx >= 0 && idx > activeIdx;
          const isLast = idx === phases.length - 1;

          const delay = phase.appearAt != null ? Math.round(phase.appearAt * fps) : idx * STAGGER_FRAMES;
          const prog = spring({frame: Math.max(0, frame - delay), fps, config: motion.spring.standard});
          const y = interpolate(prog, [0, 1], [30, 0]);
          const itemOpacity = interpolate(prog, [0, 1], [0, 1]);

          return (
            <div
              key={`${idx}-${phase.label}`}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                transform: `translateY(${y}px)`,
                opacity: itemOpacity,
              }}
            >
              {/* Progress line */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 60,
                }}
              >
                {/* Left connector */}
                {idx > 0 ? (
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: '50%',
                      top: '50%',
                      height: 4,
                      backgroundColor:
                        isPast || isActive
                          ? colors.accent
                          : 'rgba(0, 0, 0, 0.12)',
                      transform: 'translateY(-50%)',
                    }}
                  />
                ) : null}

                {/* Right connector */}
                {!isLast ? (
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      right: 0,
                      top: '50%',
                      height: 4,
                      backgroundColor:
                        isPast
                          ? colors.accent
                          : 'rgba(0, 0, 0, 0.12)',
                      transform: 'translateY(-50%)',
                    }}
                  />
                ) : null}

                {/* Dot */}
                <div
                  style={{
                    width: isActive ? 52 : 40,
                    height: isActive ? 52 : 40,
                    borderRadius: 999,
                    backgroundColor: isActive
                      ? colors.accent
                      : isPast
                        ? colors.accent
                        : 'rgba(0, 0, 0, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: fonts.brand,
                    fontSize: isActive ? 26 : 22,
                    fontWeight: 900,
                    color: isPast || isActive ? colors.text : colors.muted,
                    zIndex: 1,
                    border: isActive ? `4px solid rgba(255, 255, 255, 0.9)` : 'none',
                    boxShadow: isActive
                      ? '0 0 0 3px rgba(255, 232, 102, 0.6)'
                      : 'none',
                  }}
                >
                  {isPast ? '✓' : String(idx + 1)}
                </div>
              </div>

              {/* Card */}
              <div
                style={{
                  flex: 1,
                  width: '100%',
                  padding: '0 6px',
                  marginTop: 10,
                }}
              >
                <div
                  style={{
                    height: '100%',
                    borderRadius: 18,
                    padding: '16px 14px',
                    backgroundColor: isActive
                      ? 'rgba(255, 232, 102, 0.36)'
                      : 'rgba(255, 255, 255, 0.82)',
                    border: isActive
                      ? '2px solid rgba(255, 232, 102, 0.7)'
                      : '1px solid rgba(0, 0, 0, 0.06)',
                    opacity: isFuture ? 0.6 : 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                  }}
                >
                  <div
                    style={{
                      fontFamily: fonts.brand,
                      fontSize: 20,
                      fontWeight: 800,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: colors.muted,
                    }}
                  >
                    {phase.label}
                  </div>
                  <div
                    style={{
                      fontFamily: fonts.display,
                      fontSize: 36,
                      fontWeight: 900,
                      lineHeight: 1.1,
                      color: colors.text,
                    }}
                  >
                    {phase.title}
                  </div>
                  {phase.detail ? (
                    <div
                      style={{
                        fontFamily: fonts.body,
                        fontWeight: 400,
                        fontSize: 28,
                        lineHeight: 1.34,
                        color: colors.bodyText,
                        marginTop: 2,
                      }}
                    >
                      {phase.detail}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SceneScaffold>
  );
};
