import {AbsoluteFill, Video, staticFile} from 'remotion';
import {z} from 'zod';

import type {LessonBlockContext} from '../../../../lesson-config';
import {colors, fonts} from '../../../../theme';
import type {StoryboardInjected} from '../../../types';

const CalloutRectSchema = z
  .object({
    type: z.literal('rect'),
    x: z.number(),
    y: z.number(),
    w: z.number(),
    h: z.number(),
    label: z.string().optional(),
  })
  .strict();

const CalloutBlurSchema = z
  .object({
    type: z.literal('blur'),
    x: z.number(),
    y: z.number(),
    w: z.number(),
    h: z.number(),
  })
  .strict();

export const DemoOverlayCardPropsSchema = z
  .object({
    title: z.string().optional(),
    badge: z.string().optional(),
    callouts: z.array(z.union([CalloutRectSchema, CalloutBlurSchema])).default([]),
  })
  .strict();

export type DemoOverlayCardProps = z.infer<typeof DemoOverlayCardPropsSchema>;

export const DemoOverlayCard: React.FC<
  DemoOverlayCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({title, badge, callouts, hq}) => {
  const assetRef = hq?.assetRef ?? null;
  const src =
    assetRef && /^https?:\/\//i.test(assetRef) ? assetRef : assetRef ? staticFile(assetRef) : null;

  return (
    <AbsoluteFill style={{backgroundColor: colors.background}}>
      {src ? (
        <Video src={src} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
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

