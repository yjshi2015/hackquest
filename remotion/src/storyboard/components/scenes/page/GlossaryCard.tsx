import {z} from 'zod';

import type {LessonBlockContext} from '../../../../lesson-config';
import {colors, fonts, tokens} from '../../../../theme';
import type {StoryboardInjected} from '../../../types';
import {SceneScaffold} from '../../shared/scaffolds/SceneScaffold';

export const GlossaryCardPropsSchema = z
  .object({
    eyebrow: z.string().optional(),
    title: z.string(),
    items: z
      .array(
        z.object({
          cn: z.string(),
          en: z.string(),
        }),
      )
      .min(1),
  })
  .strict();

export type GlossaryCardProps = z.infer<typeof GlossaryCardPropsSchema>;

export const GlossaryCard: React.FC<
  GlossaryCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({eyebrow, title, items}) => {
  return (
    <SceneScaffold
      background={
        'radial-gradient(circle at 88% 14%, rgba(255, 232, 102, 0.25), transparent 34%), #ffffff'
      }
      eyebrow={eyebrow}
      title={title}
      titleSize={tokens.storyboard.header.titleSizeStandard}
      contentTop={22}
    >
      <div
        style={{
          height: '100%',
          display: 'grid',
          gridTemplateColumns: items.length <= 4 ? '1fr 1fr' : '1fr 1fr 1fr',
          gap: 12,
          alignContent: 'start',
        }}
      >
        {items.map((item, idx) => (
          <div
            key={`${idx}-${item.cn}-${item.en}`}
            style={{
              minHeight: 130,
              padding: '18px 18px',
              borderRadius: 18,
              backgroundColor: idx % 3 === 0 ? 'rgba(255, 232, 102, 0.35)' : 'rgba(255, 255, 255, 0.78)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                fontFamily: fonts.display,
                fontSize: 38,
                fontWeight: 700,
                lineHeight: 1.1,
                color: colors.label,
                marginBottom: 6,
              }}
            >
              {item.cn}
            </div>
            <div
              style={{
                fontFamily: fonts.body,
                fontWeight: 400,
                fontSize: 28,
                color: colors.bodyText,
                letterSpacing: '0.02em',
              }}
            >
              {item.en}
            </div>
          </div>
        ))}
      </div>
    </SceneScaffold>
  );
};
