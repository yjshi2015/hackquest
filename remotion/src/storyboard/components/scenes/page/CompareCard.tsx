import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {z} from 'zod';

import type {LessonBlockContext} from '../../../../lesson-config';
import {colors, fonts, motion, tokens} from '../../../../theme';
import type {StoryboardInjected} from '../../../types';
import {SceneScaffold} from '../../shared/scaffolds/SceneScaffold';

export const CompareCardPropsSchema = z
  .object({
    eyebrow: z.string().optional(),
    title: z.string(),
    left: z.object({label: z.string(), bullets: z.array(z.string()).default([]), appearAt: z.number().nonnegative().optional()}).strict(),
    right: z.object({label: z.string(), bullets: z.array(z.string()).default([]), appearAt: z.number().nonnegative().optional()}).strict(),
    verdict: z.string().optional(),
    verdictAppearAt: z.number().nonnegative().optional(),
  })
  .strict();

export type CompareCardProps = z.infer<typeof CompareCardPropsSchema>;

const Side: React.FC<{label: string; bullets: string[]; align: 'left' | 'right'}> = ({
  label,
  bullets,
  align,
}) => {
  const isLeft = align === 'left';

  return (
    <div
      style={{
        height: '100%',
        borderRadius: 24,
        backgroundColor: isLeft ? 'rgba(255, 255, 255, 0.78)' : 'rgba(255, 255, 255, 0.68)',
        padding: '24px 24px 22px',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '8px 14px',
          borderRadius: 8,
          backgroundColor: isLeft ? 'rgba(255, 232, 102, 0.42)' : 'rgba(0, 0, 0, 0.08)',
          fontFamily: fonts.brand,
          fontSize: 24,
          fontWeight: 800,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: colors.muted,
          marginBottom: 12,
        }}
      >
        {isLeft ? 'Option A' : 'Option B'}
      </div>

      <div
        style={{
          display: 'block',
          width: 'fit-content',
          padding: '8px 14px',
          borderRadius: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          fontFamily: fonts.display,
          fontSize: 38,
          fontWeight: 700,
          lineHeight: 1.12,
          letterSpacing: '-0.01em',
          color: colors.text,
          marginBottom: 16,
        }}
      >
        {label}
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
        {bullets.map((bullet, idx) => (
          <div
            key={`${idx}-${bullet}`}
            style={{
              display: 'grid',
              gridTemplateColumns: '44px 1fr',
              gap: 14,
              alignItems: 'start',
              padding: '14px 16px',
              borderRadius: 14,
              backgroundColor: 'rgba(255, 255, 255, 0.74)',
            }}
          >
            <span
              style={{
                width: 44,
                height: 44,
                borderRadius: 999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: fonts.brand,
                fontSize: 30,
                color: colors.muted,
                backgroundColor: isLeft ? 'rgba(255, 232, 102, 0.34)' : 'rgba(0, 0, 0, 0.08)',
              }}
            >
              {String(idx + 1)}
            </span>
            <span
              style={{
                fontFamily: fonts.body,
                fontWeight: 400,
                fontSize: 34,
                lineHeight: 1.34,
                color: colors.bodyText,
              }}
            >
              {bullet}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CompareCard: React.FC<
  CompareCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({eyebrow, title, left, right, verdict, verdictAppearAt, context}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Left side
  const leftDelay = left.appearAt != null ? Math.round(left.appearAt * fps) : 0;
  const leftProg = spring({frame: Math.max(0, frame - leftDelay), fps, config: motion.spring.standard});
  const leftX = interpolate(leftProg, [0, 1], [-40, 0]);
  const leftOpacity = interpolate(leftProg, [0, 1], [0, 1]);

  // VS badge — midpoint between left and right
  const rightDelay = right.appearAt != null ? Math.round(right.appearAt * fps) : leftDelay + 12;
  const vsDelay = Math.round((leftDelay + rightDelay) / 2);
  const vsProg = spring({frame: Math.max(0, frame - vsDelay), fps, config: motion.spring.fast});
  const vsScale = interpolate(vsProg, [0, 1], [0.5, 1]);
  const vsOpacity = interpolate(vsProg, [0, 1], [0, 1]);

  // Right side
  const rightProg = spring({frame: Math.max(0, frame - rightDelay), fps, config: motion.spring.standard});
  const rightX = interpolate(rightProg, [0, 1], [40, 0]);
  const rightOpacity = interpolate(rightProg, [0, 1], [0, 1]);

  // Verdict
  const verdictDelay = verdictAppearAt != null ? Math.round(verdictAppearAt * fps) : rightDelay + 10;
  const verdictProg = spring({frame: Math.max(0, frame - verdictDelay), fps, config: motion.spring.standard});
  const verdictY = interpolate(verdictProg, [0, 1], [16, 0]);
  const verdictOpacity = interpolate(verdictProg, [0, 1], [0, 1]);

  return (
    <SceneScaffold
      background={
        'linear-gradient(116deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 54%, rgba(255, 232, 102, 0.22) 54%, rgba(255, 232, 102, 0.22) 100%)'
      }
      eyebrow={eyebrow}
      title={title}
      titleSize={tokens.storyboard.header.titleSizeStandard}
      contentTop={26}
    >
      <div
        style={{
          height: '100%',
          display: 'grid',
          gridTemplateRows: '1fr auto',
          gap: 20,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 82px 1fr',
            gap: 18,
            alignItems: 'stretch',
          }}
        >
          <div style={{transform: `translateX(${leftX}px)`, opacity: leftOpacity}}>
            <Side label={left.label} bullets={left.bullets} align="left" />
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              opacity: vsOpacity,
              transform: `scale(${vsScale})`,
            }}
          >
            <div
              style={{
                width: 2,
                height: 120,
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: 999,
              }}
            />
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: 999,
                backgroundColor: colors.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: fonts.brand,
                fontWeight: 900,
                fontSize: 36,
                letterSpacing: '0.08em',
                color: colors.text,
              }}
            >
              VS
            </div>
            <div
              style={{
                width: 2,
                height: 120,
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: 999,
              }}
            />
          </div>

          <div style={{transform: `translateX(${rightX}px)`, opacity: rightOpacity}}>
            <Side label={right.label} bullets={right.bullets} align="right" />
          </div>
        </div>

        {verdict ? (
          <div
            style={{
              padding: '16px 18px',
              borderRadius: 18,
              backgroundColor: 'rgba(255, 255, 255, 0.78)',
              fontFamily: fonts.body,
              fontSize: 40,
              lineHeight: 1.28,
              color: colors.text,
              transform: `translateY(${verdictY}px)`,
              opacity: verdictOpacity,
            }}
          >
            {verdict}
          </div>
        ) : null}
      </div>
    </SceneScaffold>
  );
};
