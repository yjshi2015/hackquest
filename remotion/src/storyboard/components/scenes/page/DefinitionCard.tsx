import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {z} from 'zod';

import type {LessonBlockContext} from '../../../../lesson-config';
import {colors, fonts, tokens} from '../../../../theme';
import type {StoryboardInjected} from '../../../types';
import {SceneScaffold} from '../../shared/scaffolds/SceneScaffold';
import {secondsToFrames} from '../../shared/timing';

export const DefinitionCardPropsSchema = z
  .object({
    eyebrow: z.string().optional(),
    term: z.string(),
    definition: z.string(),
    notes: z
      .array(
        z.union([
          z.string(),
          z
            .object({
              text: z.string(),
              appearAt: z.number().nonnegative().optional(),
            })
            .strict(),
        ]),
      )
      .default([]),
  })
  .strict();

export type DefinitionCardProps = z.infer<typeof DefinitionCardPropsSchema>;

export const DefinitionCard: React.FC<
  DefinitionCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({eyebrow, term, definition, notes}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const normalizedNotes = notes.map((note) =>
    typeof note === 'string' ? {text: note} : note,
  );

  return (
    <SceneScaffold
      background={
        'linear-gradient(178deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 58%, rgba(255, 232, 102, 0.18) 100%)'
      }
      eyebrow={eyebrow}
      title={term}
      subtitle={definition}
      contentTop={22}
      titleSize={tokens.storyboard.header.titleSizeDefinition}
    >
      {normalizedNotes.length ? (
        <div
          style={{
            height: '100%',
            display: 'grid',
            gridTemplateColumns: normalizedNotes.length > 3 ? '1fr 1fr' : '1fr',
            gap: 14,
            alignContent: 'start',
          }}
        >
          {normalizedNotes.map((note, idx) => {
            const delay = note.appearAt != null ? secondsToFrames(note.appearAt, fps) : idx * 8;
            const reveal = spring({
              frame: Math.max(0, frame - delay),
              fps,
              config: {damping: 220, stiffness: 180, mass: 0.8},
            });
            const y = interpolate(reveal, [0, 1], [10, 0]);
            const opacity = interpolate(reveal, [0, 1], [0, 1]);

            return (
              <div
                key={`${idx}-${note.text}`}
                style={{
                  padding: '16px 18px',
                  borderRadius: 18,
                  backgroundColor:
                    idx % 2 === 0 ? 'rgba(255, 255, 255, 0.82)' : 'rgba(255, 232, 102, 0.35)',
                  display: 'grid',
                  gridTemplateColumns: '24px 1fr',
                  gap: 10,
                  alignItems: 'start',
                  fontFamily: fonts.body,
                  fontWeight: 400,
                  fontSize: 34,
                  lineHeight: 1.34,
                  color: colors.bodyText,
                  transform: `translateY(${y}px)`,
                  opacity,
                }}
              >
                <span style={{color: colors.muted}}>•</span>
                <span>{note.text}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <div
            style={{
              width: 180,
              height: 6,
              borderRadius: 999,
              backgroundColor: 'rgba(0, 0, 0, 0.18)',
            }}
          />
        </div>
      )}
    </SceneScaffold>
  );
};
