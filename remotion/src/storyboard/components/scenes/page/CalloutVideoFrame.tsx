import {AbsoluteFill, Video, staticFile} from 'remotion';
import {z} from 'zod';

import type {LessonBlockContext} from '../../../../lesson-config';
import {colors, fonts, tokens} from '../../../../theme';
import type {StoryboardInjected} from '../../../types';
import {SceneScaffold} from '../../shared/scaffolds/SceneScaffold';

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

export const CalloutVideoFramePropsSchema = z
  .object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    badge: z.string().optional(),
    callouts: z.array(z.union([CalloutRectSchema, CalloutBlurSchema])).default([]),
  })
  .strict();

export type CalloutVideoFrameProps = z.infer<typeof CalloutVideoFramePropsSchema>;

export const CalloutVideoFrame: React.FC<
  CalloutVideoFrameProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({title, subtitle, badge, callouts, hq}) => {
  const assetRef = hq?.assetRef ?? null;
  const src =
    assetRef && /^https?:\/\//i.test(assetRef) ? assetRef : assetRef ? staticFile(assetRef) : null;

  return (
    <SceneScaffold
      background={colors.background}
      eyebrow={badge}
      title={title}
      subtitle={subtitle}
      contentTop={18}
      titleSize={tokens.storyboard.header.titleSizeVideoFrame}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 26,
          overflow: 'hidden',
          backgroundColor: '#0B0B0B',
          position: 'relative',
        }}
      >
        {src ? (
          <Video src={src} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        ) : (
          <AbsoluteFill
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: fonts.body,
              color: 'rgba(255,255,255,0.62)',
              fontSize: 40,
            }}
          >
            Missing video asset
          </AbsoluteFill>
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
                  backgroundColor: 'rgba(0,0,0,0.45)',
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
                    fontFamily: fonts.brand,
                    fontSize: 24,
                    fontWeight: 900,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: colors.text,
                  }}
                >
                  {callout.label}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </SceneScaffold>
  );
};
