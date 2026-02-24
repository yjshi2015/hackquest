import {AbsoluteFill, Video, staticFile} from 'remotion';
import {z} from 'zod';

import type {LessonBlockContext} from '../lesson-config';
import {colors} from '../theme';
import {Frame} from '../ui/Frame';
import type {StoryboardInjected} from '../storyboard/types';

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

export const DemoOverlayPropsSchema = z
  .object({
    title: z.string().optional(),
    badge: z.string().optional(),
    callouts: z.array(z.union([CalloutRectSchema, CalloutBlurSchema])).default([]),
  })
  .strict();

export type DemoOverlayProps = z.infer<typeof DemoOverlayPropsSchema>;

export const DemoOverlay: React.FC<
  DemoOverlayProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({title, badge, callouts, context, hq}) => {
  const assetRef = hq?.assetRef ?? null;
  const src =
    assetRef && /^https?:\/\//i.test(assetRef)
      ? assetRef
      : assetRef
        ? staticFile(assetRef)
        : null;

  return (
    <AbsoluteFill style={{backgroundColor: colors.background}}>
      <Frame title={title} badge={badge} callouts={callouts} padding={0}>
        {src ? (
          <Video src={src} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        ) : (
          <AbsoluteFill
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.65)',
              fontSize: 22,
            }}
          >
            Missing video asset
          </AbsoluteFill>
        )}
      </Frame>
    </AbsoluteFill>
  );
};
