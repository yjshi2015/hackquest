import {z} from 'zod';

import type {LessonBlockContext} from '../../../../lesson-config';
import {colors, fonts, tokens} from '../../../../theme';
import {SceneScaffold} from '../../shared/scaffolds/SceneScaffold';

export const CalloutScenePropsSchema = z
  .object({
    eyebrow: z.string().optional(),
    title: z.string().optional(),
    body: z.string(),
  })
  .strict();

export type CalloutSceneProps = z.infer<typeof CalloutScenePropsSchema>;

export const CalloutScene: React.FC<{
  eyebrow?: string;
  title: string;
  body: string;
  context: LessonBlockContext;
}> = ({eyebrow, title, body, context}) => {

  return (
    <SceneScaffold
      background={
        `linear-gradient(140deg, ${colors.accentFaint}, rgba(255, 255, 255, 0.96) 32%, rgba(0, 0, 0, 0.04) 100%)`
      }
      eyebrow={eyebrow}
      title={title}
      contentTop={28}
      titleSize={tokens.storyboard.header.titleSizeCallout}
    >
      <div
        style={{
          height: '100%',
          display: 'grid',
          gridTemplateColumns: '98px 1fr',
          gap: 18,
          alignItems: 'start',
          paddingTop: 10,
        }}
      >
        <div
          style={{
            width: 98,
            height: 98,
            borderRadius: 999,
            backgroundColor: colors.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: fonts.display,
            fontSize: 72,
            fontWeight: 900,
            color: colors.text,
            lineHeight: 1,
          }}
        >
          “
        </div>

        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 38,
            fontWeight: 400,
            lineHeight: 1.34,
            color: colors.bodyText,
            maxWidth: 1300,
          }}
        >
          {body}
        </div>
      </div>
    </SceneScaffold>
  );
};
