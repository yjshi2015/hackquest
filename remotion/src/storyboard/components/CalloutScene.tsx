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
import type {StoryboardInjected} from '../types';
import {colors, fonts} from '../../theme';
import {CardShell} from './CardShell';

const isImageRef = (ref?: string | null) =>
  Boolean(ref && /\.(png|jpe?g|webp|gif|svg)(\?.*)?$/i.test(ref));

export const CalloutScenePropsSchema = z
  .object({
    eyebrow: z.string().optional(),
    title: z.string(),
    body: z.string(),
  })
  .strict();

export type CalloutSceneProps = z.infer<typeof CalloutScenePropsSchema>;

export const CalloutScene: React.FC<{
  eyebrow?: string;
  title: string;
  body: string;
  context: LessonBlockContext;
  hq?: StoryboardInjected;
}> = ({eyebrow, title, body, context, hq}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const reveal = spring({frame, fps, config: {damping: 200}});
  const y = interpolate(reveal, [0, 1], [24, 0]);
  const opacity = interpolate(reveal, [0, 1], [0, 1]);

  const assetRef = hq?.assetRef ?? null;
  const imageSrc =
    assetRef && isImageRef(assetRef)
      ? /^https?:\/\//i.test(assetRef)
        ? assetRef
        : staticFile(assetRef)
      : null;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        padding: 40,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      {imageSrc ? (
        <div
          style={{
            width: '100%',
            flex: 1,
            minHeight: 0,
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Img
            src={imageSrc}
            style={{
              width: '100%',
              height: '100%',
              maxHeight: 860,
              objectFit: 'contain',
              borderRadius: 8,
            }}
          />
        </div>
      ) : null}
      <div
        style={{
          transform: `translateY(${y}px)`,
          opacity,
          width: '100%',
          maxWidth: 980,
          flexShrink: 0,
        }}
      >
        <CardShell eyebrow={eyebrow} title={title}>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 32,
              lineHeight: 1.38,
              color: colors.text,
              maxWidth: 980,
            }}
          >
            {body}
          </div>
        </CardShell>
      </div>
    </AbsoluteFill>
  );
};
