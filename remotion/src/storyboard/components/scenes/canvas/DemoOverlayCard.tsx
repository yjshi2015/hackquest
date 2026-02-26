import {AbsoluteFill, Video, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {z} from 'zod';

import type {LessonBlockContext} from '../../../../lesson-config';
import {colors, fonts, motion} from '../../../../theme';
import {resolveLessonPublicPath} from '../../../../lib/lesson-paths';
import type {StoryboardInjected} from '../../../types';

const CalloutRectSchema = z
  .object({
    type: z.literal('rect'),
    x: z.number(),
    y: z.number(),
    w: z.number(),
    h: z.number(),
    label: z.string().optional(),
    /** Seconds (relative to segment start) when this callout fades in. */
    appearAt: z.number().nonnegative().optional(),
    /** Seconds (relative to segment start) when this callout fades out. */
    exitAt: z.number().nonnegative().optional(),
  })
  .strict();

const CalloutBlurSchema = z
  .object({
    type: z.literal('blur'),
    x: z.number(),
    y: z.number(),
    w: z.number(),
    h: z.number(),
    /** Seconds (relative to segment start) when this callout fades in. */
    appearAt: z.number().nonnegative().optional(),
    /** Seconds (relative to segment start) when this callout fades out. */
    exitAt: z.number().nonnegative().optional(),
  })
  .strict();

export const DemoOverlayCardPropsSchema = z
  .object({
    title: z.string().optional(),
    badge: z.string().optional(),
    videoSrc: z.string(),
    playbackRate: z.number().positive().optional(),
    callouts: z.array(z.union([CalloutRectSchema, CalloutBlurSchema])).default([]),
  })
  .strict();

export type DemoOverlayCardProps = z.infer<typeof DemoOverlayCardPropsSchema>;

export const DemoOverlayCard: React.FC<
  DemoOverlayCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({title, badge, videoSrc, playbackRate, callouts, hq}) => {
  const metaFile = hq?.metaFile ?? '';
  const resolved = videoSrc
    ? (resolveLessonPublicPath(metaFile, videoSrc) ?? videoSrc)
    : null;
  const src =
    resolved && /^https?:\/\//i.test(resolved) ? resolved : resolved ? staticFile(resolved) : null;
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  /** Default stagger per callout index when no explicit appearAt is provided (frames). */
  const CALLOUT_STAGGER_FRAMES = 10;

  const computeCalloutOpacity = (
    callout: {appearAt?: number; exitAt?: number},
    idx: number,
  ): number => {
    const enterFrame = callout.appearAt != null
      ? Math.round(callout.appearAt * fps)
      : idx * CALLOUT_STAGGER_FRAMES;
    const enterProg = spring({
      frame: Math.max(0, frame - enterFrame),
      fps,
      config: motion.spring.standard,
    });

    let exitProg = 0;
    if (callout.exitAt != null) {
      const exitFrame = Math.round(callout.exitAt * fps);
      exitProg = spring({
        frame: Math.max(0, frame - exitFrame),
        fps,
        config: motion.spring.fast,
      });
    }

    return interpolate(enterProg, [0, 1], [0, 1]) * interpolate(exitProg, [0, 1], [1, 0]);
  };

  return (
    <AbsoluteFill style={{backgroundColor: colors.background}}>
      {src ? (
        <Video src={src} playbackRate={playbackRate} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      ) : (
        <AbsoluteFill
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255,255,255,0.65)',
            fontSize: 28,
            fontFamily: fonts.body,
          }}
        >
          Missing video asset
        </AbsoluteFill>
      )}

      {(badge || title) && (
        <div
          style={{
            position: 'absolute',
            left: 56,
            top: 56,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            maxWidth: 980,
          }}
        >
          {badge ? (
            <div
              style={{
                alignSelf: 'flex-start',
                padding: '8px 14px',
                borderRadius: 999,
                backgroundColor: 'rgba(0,0,0,0.58)',
                border: '1px solid rgba(255,255,255,0.18)',
                color: '#FFFFFF',
                fontFamily: fonts.brand,
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              {badge}
            </div>
          ) : null}

          {title ? (
            <div
              style={{
                color: '#FFFFFF',
                fontFamily: fonts.brand,
                fontSize: 44,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                textShadow: '0 2px 16px rgba(0,0,0,0.45)',
              }}
            >
              {title}
            </div>
          ) : null}
        </div>
      )}

      {callouts.map((callout, idx) => {
        const opacity = computeCalloutOpacity(callout, idx);
        const scale = interpolate(opacity, [0, 1], [0.92, 1]);

        if (callout.type === 'blur') {
          return (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              style={{
                position: 'absolute',
                left: callout.x,
                top: callout.y,
                width: callout.w,
                height: callout.h,
                borderRadius: 18,
                backgroundColor: 'rgba(0,0,0,0.48)',
                backdropFilter: 'blur(6px)',
                opacity,
                transform: `scale(${scale})`,
              }}
            />
          );
        }

        return (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            style={{
              position: 'absolute',
              left: callout.x,
              top: callout.y,
              width: callout.w,
              height: callout.h,
              borderRadius: 18,
              border: `2px solid ${colors.accent}`,
              boxSizing: 'border-box',
              opacity,
              transform: `scale(${scale})`,
            }}
          >
            {callout.label ? (
              <div
                style={{
                  position: 'absolute',
                  left: 12,
                  top: 12,
                  padding: '6px 10px',
                  borderRadius: 999,
                  backgroundColor: colors.accent,
                  color: colors.text,
                  fontFamily: fonts.brand,
                  fontSize: 20,
                  fontWeight: 900,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {callout.label}
              </div>
            ) : null}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

