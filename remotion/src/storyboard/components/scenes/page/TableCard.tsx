import {z} from 'zod';

import type {LessonBlockContext} from '../../../../lesson-config';
import {colors, fonts, tokens} from '../../../../theme';
import type {StoryboardInjected} from '../../../types';
import {SceneScaffold} from '../../shared/scaffolds/SceneScaffold';

export const TableCardPropsSchema = z
  .object({
    eyebrow: z.string().optional(),
    title: z.string(),
    columns: z.array(z.string()).min(1),
    rows: z.array(z.array(z.string())),
  })
  .strict()
  .superRefine((val, ctx) => {
    for (let i = 0; i < val.rows.length; i += 1) {
      if (val.rows[i]?.length !== val.columns.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['rows', i],
          message: `Row ${i} must have ${val.columns.length} columns`,
        });
      }
    }
  });

export type TableCardProps = z.infer<typeof TableCardPropsSchema>;

export const TableCard: React.FC<
  TableCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({eyebrow, title, columns, rows, context}) => {
  const isNumericLike = (value: string) => {
    const text = String(value ?? '').trim();
    if (!text) return false;
    return /^[\d,._%$()+\-]+$/.test(text);
  };

  return (
    <SceneScaffold
      background={
        `linear-gradient(180deg, rgba(255,255,255,1) 0%, ${colors.accentFaint} 100%)`
      }
      eyebrow={eyebrow}
      title={title}
      contentTop={24}
      titleSize={tokens.storyboard.header.titleSizeStandard}
    >
      <div
        style={{
          alignSelf: 'start',
          width: '100%',
          maxHeight: '100%',
          borderRadius: 24,
          overflow: 'hidden',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
            gap: 0,
            padding: '20px 24px',
            backgroundColor: `rgba(${colors.accentRgb}, 0.48)`,
            fontFamily: fonts.brand,
            fontSize: 34,
            fontWeight: 900,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: colors.text,
          }}
        >
          {columns.map((column) => (
            <div key={column} style={{paddingRight: 14, minWidth: 0}}>
              {column}
            </div>
          ))}
        </div>

        <div style={{display: 'flex', flexDirection: 'column'}}>
          {rows.map((row, rowIdx) => (
            <div
              key={rowIdx}
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
                gap: 0,
                padding: '20px 24px',
                fontFamily: fonts.body,
                fontSize: 36,
                lineHeight: 1.26,
                color: colors.text,
                backgroundColor: rowIdx % 2 === 0 ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.035)',
                alignItems: 'start',
              }}
            >
              {row.map((cell, cellIdx) => {
                const numeric = isNumericLike(cell);
                return (
                  <div
                    key={cellIdx}
                    style={{
                      paddingRight: 14,
                      minWidth: 0,
                      textAlign: numeric ? 'right' : 'left',
                      fontFamily: numeric ? fonts.brand : fonts.body,
                      fontWeight: cellIdx === 0 ? 700 : numeric ? 800 : 500,
                      letterSpacing: numeric ? '0.02em' : undefined,
                      wordBreak: 'break-word',
                    }}
                  >
                    {cell}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </SceneScaffold>
  );
};
