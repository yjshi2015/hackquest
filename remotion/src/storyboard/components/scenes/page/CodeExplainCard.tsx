import {z} from 'zod';

import type {LessonBlockContext} from '../../../../lesson-config';
import {colors, fonts, tokens} from '../../../../theme';
import {CodeBlock} from '../../../../ui/CodeBlock';
import type {StoryboardInjected} from '../../../types';
import {SceneScaffold} from '../../shared/scaffolds/SceneScaffold';

export const CodeExplainCardPropsSchema = z
  .object({
    eyebrow: z.string().optional(),
    title: z.string().optional(),
    language: z.string().optional(),
    code: z.string(),
    highlights: z
      .array(z.object({from: z.number().int().positive(), to: z.number().int().positive()}))
      .default([]),
    explain: z.array(z.string()).default([]),
  })
  .strict();

export type CodeExplainCardProps = z.infer<typeof CodeExplainCardPropsSchema>;

export const CodeExplainCard: React.FC<
  CodeExplainCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({eyebrow, title, language, code, highlights, explain}) => {
  const explainTokens = tokens.storyboard.explain;

  return (
    <SceneScaffold
      background={
        'radial-gradient(circle at 82% 12%, rgba(255, 232, 102, 0.28), transparent 36%), #ffffff'
      }
      eyebrow={eyebrow}
      title={title}
      contentTop={24}
      titleSize={tokens.storyboard.header.titleSizeCodeExplain}
    >
      <div
        style={{
          height: '100%',
          display: 'grid',
          gridTemplateColumns: explain.length ? '1.24fr 0.76fr' : '1fr',
          gap: explainTokens.gap,
          alignItems: 'stretch',
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.78)',
            borderRadius: 22,
            overflow: 'hidden',
          }}
        >
          <CodeBlock code={code} language={language ?? 'snippet'} highlights={highlights} />
        </div>

        {explain.length ? (
          <div style={{display: 'flex', flexDirection: 'column', gap: explainTokens.listGap}}>
            {explain.map((line, idx) => (
              <div
                key={`${idx}-${line}`}
                style={{
                  padding: '14px 16px',
                  borderRadius: 16,
                  backgroundColor: idx % 2 === 0 ? 'rgba(255, 232, 102, 0.34)' : 'rgba(255, 255, 255, 0.74)',
                  fontFamily: fonts.body,
                  fontSize: explainTokens.bodySize,
                  lineHeight: explainTokens.bodyLineHeight,
                  color: colors.text,
                }}
              >
                <span style={{fontFamily: fonts.brand, marginRight: 8, color: colors.muted}}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                {line}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </SceneScaffold>
  );
};
