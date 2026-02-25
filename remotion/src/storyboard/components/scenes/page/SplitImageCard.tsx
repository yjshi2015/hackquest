import {Img, staticFile} from 'remotion';
import {z} from 'zod';

import type {LessonBlockContext} from '../../../../lesson-config';
import {colors, fonts, tokens} from '../../../../theme';
import type {StoryboardInjected} from '../../../types';
import {SceneScaffold} from '../../shared/scaffolds/SceneScaffold';

export const SplitImageCardPropsSchema = z
  .object({
    eyebrow: z.string().optional(),
    title: z.string().optional(),
    subtitle: z.string().optional(),
    bullets: z
      .array(
        z.object({
          text: z.string(),
          tone: z.enum(['accent', 'default', 'muted']).optional(),
        }),
      )
      .default([]),
    note: z.string().optional(),
  })
  .strict();

export type SplitImageCardProps = z.infer<typeof SplitImageCardPropsSchema>;

export const SplitImageCard: React.FC<
  SplitImageCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({eyebrow, title, subtitle, bullets, note, hq}) => {
  const assetRef = hq?.assetRef ?? null;
  const assetRef2 = hq?.assetRef2 ?? null;
  const imgSrc =
    assetRef && /^https?:\/\//i.test(assetRef) ? assetRef : assetRef ? staticFile(assetRef) : null;
  const imgSrc2 =
    assetRef2 && /^https?:\/\//i.test(assetRef2) ? assetRef2 : assetRef2 ? staticFile(assetRef2) : null;
  const hasDualImages = Boolean(imgSrc && imgSrc2);

  return (
    <SceneScaffold
      background={
        'linear-gradient(150deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 62%, rgba(255, 232, 102, 0.2) 100%)'
      }
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      contentTop={24}
      titleSize={
        hasDualImages
          ? tokens.storyboard.header.titleSizeSplitImageDual
          : tokens.storyboard.header.titleSizeSplitImageSingle
      }
    >
      <div
        style={{
          height: '100%',
          display: 'grid',
          gridTemplateColumns: imgSrc
            ? '1.02fr 0.98fr'
            : '1fr',
          gap: 22,
        }}
      >
        <div style={{display: 'flex', flexDirection: 'column', gap: 14, alignSelf: 'start'}}>
          {bullets.map((bullet, idx) => (
            <div
              key={`${idx}-${bullet.text}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '24px 1fr',
                gap: 10,
                alignItems: 'start',
                padding: '13px 16px',
                borderRadius: 16,
                backgroundColor:
                  bullet.tone === 'accent' ? 'rgba(255, 232, 102, 0.34)' : 'rgba(255, 255, 255, 0.78)',
                fontFamily: fonts.body,
                fontWeight: 400,
                fontSize: 34,
                lineHeight: 1.34,
                color: bullet.tone === 'muted' ? colors.muted : colors.bodyText,
              }}
            >
              <span style={{color: bullet.tone === 'accent' ? colors.text : colors.muted}}>
                {bullet.tone === 'accent' ? '•' : '–'}
              </span>
              <span>{bullet.text}</span>
            </div>
          ))}

          {note ? (
            <div
              style={{
                marginTop: 2,
                padding: '16px 18px',
                borderRadius: 18,
                background: 'linear-gradient(180deg, rgba(255, 232, 102, 0.42), rgba(255, 255, 255, 0.72))',
              }}
            >
              <div
                style={{
                  fontFamily: fonts.brand,
                  fontSize: 24,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: colors.muted,
                  marginBottom: 8,
                }}
              >
                Note
              </div>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontWeight: 400,
                  fontSize: 30,
                  color: colors.bodyText,
                  lineHeight: 1.36,
                }}
              >
                {note}
              </div>
            </div>
          ) : null}
        </div>

        {hasDualImages ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              height: '100%',
            }}
          >
            {[imgSrc, imgSrc2].map((src, idx) => (
              <div
                key={idx}
                style={{
                  flex: 1,
                  borderRadius: 20,
                  overflow: 'hidden',
                  backgroundColor: colors.background,
                  position: 'relative',
                }}
              >
                <Img src={src!} style={{width: '100%', height: '100%', objectFit: 'contain'}} />
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 6,
                    background:
                      'linear-gradient(90deg, rgba(255, 232, 102, 0.95), rgba(255,255,255,0.45), rgba(255, 232, 102, 0.95))',
                  }}
                />
              </div>
            ))}
          </div>
        ) : imgSrc ? (
          <div
            style={{
              borderRadius: 24,
              overflow: 'hidden',
              backgroundColor: colors.background,
              position: 'relative',
            }}
          >
            <Img src={imgSrc} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: 8,
                background:
                  'linear-gradient(90deg, rgba(255, 232, 102, 0.95), rgba(255,255,255,0.45), rgba(255, 232, 102, 0.95))',
              }}
            />
          </div>
        ) : null}
      </div>
    </SceneScaffold>
  );
};
