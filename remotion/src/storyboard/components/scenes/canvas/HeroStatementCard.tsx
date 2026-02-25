import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {z} from 'zod';

import type {LessonBlockContext} from '../../../../lesson-config';
import {colors, fonts, motion} from '../../../../theme';
import type {StoryboardInjected} from '../../../types';
import {SceneScaffold} from '../../shared/scaffolds/SceneScaffold';

export const HeroStatementCardPropsSchema = z
  .object({
    eyebrow: z.string().optional(),
    statement: z.string(),
    deliverables: z
      .array(
        z.object({
          text: z.string(),
          icon: z.string().optional(),
          appearAt: z.number().nonnegative().optional(),
        }),
      )
      .min(1),
    note: z.string().optional(),
    noteAppearAt: z.number().nonnegative().optional(),
  })
  .strict();

export type HeroStatementCardProps = z.infer<typeof HeroStatementCardPropsSchema>;

export const HeroStatementCard: React.FC<
  HeroStatementCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({eyebrow, statement, deliverables, note, noteAppearAt, context}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Statement fades in first
  const stmtProg = spring({frame, fps, config: motion.spring.standard});
  const stmtY = interpolate(stmtProg, [0, 1], [20, 0]);
  const stmtOpacity = interpolate(stmtProg, [0, 1], [0, 1]);

  // Divider appears after statement
  const divDelay = 6;
  const divProg = spring({frame: Math.max(0, frame - divDelay), fps, config: motion.spring.fast});

  return (
    <SceneScaffold
      background={
        'radial-gradient(circle at 50% 10%, rgba(255, 232, 102, 0.52), transparent 48%), radial-gradient(circle at 80% 90%, rgba(255, 232, 102, 0.18), transparent 40%), #ffffff'
      }
      eyebrow={eyebrow}
      contentTop={0}
    >
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 36,
        }}
      >
        {/* Hero statement */}
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: 72,
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: colors.text,
            maxWidth: 1100,
            textAlign: 'center',
            alignSelf: 'center',
            transform: `translateY(${stmtY}px)`,
            opacity: stmtOpacity,
          }}
        >
          {statement}
        </div>

        {/* Accent divider */}
        <div
          style={{
            width: interpolate(divProg, [0, 1], [0, 80]),
            height: 5,
            borderRadius: 999,
            backgroundColor: colors.accent,
            alignSelf: 'center',
            opacity: divProg,
          }}
        />

        {/* Deliverables grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              deliverables.length <= 3
                ? `repeat(${deliverables.length}, 1fr)`
                : 'repeat(2, 1fr)',
            gap: 16,
            alignSelf: 'center',
            width: '100%',
            maxWidth: 1140,
          }}
        >
          {deliverables.map((d, idx) => {
            const autoDelay = divDelay + 6 + idx * 6;
            const itemDelay = d.appearAt != null ? Math.round(d.appearAt * fps) : autoDelay;
            const itemProg = spring({frame: Math.max(0, frame - itemDelay), fps, config: motion.spring.standard});
            const itemY = interpolate(itemProg, [0, 1], [20, 0]);
            const itemOpacity = interpolate(itemProg, [0, 1], [0, 1]);

            return (
              <div
                key={`${idx}-${d.text}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '16px 20px',
                  borderRadius: 18,
                  backgroundColor: 'rgba(255, 255, 255, 0.82)',
                  border: '1px solid rgba(255, 232, 102, 0.5)',
                  transform: `translateY(${itemY}px)`,
                  opacity: itemOpacity,
                }}
              >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 999,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255, 232, 102, 0.56)',
                  fontFamily: fonts.brand,
                  fontWeight: 900,
                  fontSize: 24,
                  color: colors.text,
                }}
              >
                {d.icon ?? '✓'}
              </div>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontWeight: 400,
                  fontSize: 34,
                  lineHeight: 1.34,
                  color: colors.bodyText,
                }}
              >
                {d.text}
              </div>
            </div>
            );
          })}
        </div>

        {/* Optional note */}
        {note ? (() => {
          const autoNoteDelay = divDelay + 6 + deliverables.length * 6;
          const noteDelay = noteAppearAt != null ? Math.round(noteAppearAt * fps) : autoNoteDelay;
          const noteProg = spring({frame: Math.max(0, frame - noteDelay), fps, config: motion.spring.standard});
          const noteOpacity = interpolate(noteProg, [0, 1], [0, 1]);

          return (
            <div
              style={{
                alignSelf: 'center',
                maxWidth: 900,
                textAlign: 'center',
                fontFamily: fonts.body,
                fontWeight: 400,
                fontSize: 28,
                lineHeight: 1.36,
                color: colors.muted,
                padding: '12px 20px',
                borderRadius: 14,
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                opacity: noteOpacity,
              }}
            >
              {note}
            </div>
          );
        })() : null}
      </div>
    </SceneScaffold>
  );
};
