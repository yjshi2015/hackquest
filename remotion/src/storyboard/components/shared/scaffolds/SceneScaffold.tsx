import type {CSSProperties, ReactNode} from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

import {colors, fonts, motion, tokens} from '../../../../theme';
import {useLessonSettings} from '../../../../lib/LessonSettingsContext';

type SceneScaffoldProps = {
  background?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  titleSize?: number;
  maxWidth?: number;
  contentTop?: number;
  contentStyle?: CSSProperties;
  children: ReactNode;
};

export const SceneScaffold: React.FC<SceneScaffoldProps> = ({
  background,
  eyebrow,
  title,
  subtitle,
  titleSize,
  maxWidth,
  contentTop = 20,
  contentStyle,
  children,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const {hideScaffoldHeader} = useLessonSettings();
  const reveal = spring({
    frame,
    fps,
    config: motion.spring.fast,
  });
  const y = interpolate(reveal, [0, 1], [10, 0]);
  const opacity = interpolate(reveal, [0, 1], [0, 1]);
  const hasHeader = !hideScaffoldHeader && Boolean(eyebrow || title || subtitle);

  return (
    <AbsoluteFill
      style={{
        background: background ?? colors.background,
        padding: '56px 80px 48px',
      }}
    >
      <div
        style={{
          transform: `translateY(${y}px)`,
          opacity,
          width: '100%',
          maxWidth: maxWidth ?? tokens.layout.maxContentWidth,
          margin: '0 auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ── Fixed header zone ── */}
        {hasHeader ? (
          <div
            style={{
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {eyebrow ? (
              <div
                style={{
                  fontFamily: fonts.brand,
                  fontSize: tokens.storyboard.header.eyebrowSize,
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: colors.muted,
                }}
              >
                {eyebrow}
              </div>
            ) : null}

            {title ? (
              <div
                style={{
                  fontFamily: fonts.display,
                  fontSize: titleSize ?? tokens.storyboard.header.titleSizeDefault,
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                  color: colors.label,
                }}
              >
                {title}
              </div>
            ) : null}

            {subtitle ? (
              <div
                style={{
                  fontFamily: fonts.body,
                  fontWeight: 300,
                  fontSize: tokens.storyboard.header.subtitleSizeDefault,
                  lineHeight: 1.3,
                  color: colors.muted,
                  maxWidth: 720,
                  marginTop: 2,
                }}
              >
                {subtitle}
              </div>
            ) : null}
          </div>
        ) : null}

        {/* ── Content zone: vertically centered in remaining space ── */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            marginTop: hasHeader ? contentTop : 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{...contentStyle}}>
            {children}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
