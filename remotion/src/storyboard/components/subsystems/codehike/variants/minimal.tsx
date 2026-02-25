import {AbsoluteFill} from 'remotion'

import {fonts, tokens} from '../../../../../theme'
import {StepSegmentsBar} from '../progress'
import type {VariantViewProps} from '../types'

export const CodeHikeMinimalLayout: React.FC<VariantViewProps> = ({
  background,
  title,
  subtitle,
  reveal,
  spec,
  timeline,
  resolvedShowProgress,
  renderCodeSequences,
  codePanelBg,
  isLightTheme,
}) => {
  const textColor = isLightTheme ? tokens.colors.text : '#fff'
  const subtitleColor = isLightTheme ? tokens.colors.muted : 'rgba(255,255,255,0.7)'
  const outerBg = background ?? (isLightTheme ? tokens.colors.bg : codePanelBg)

  return (
    <AbsoluteFill
      style={{
        background: outerBg,
        padding: spec.outerPadding,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {(title || subtitle) ? (
        <div
          style={{
            position: 'absolute',
            top: 34,
            left: 48,
            right: 48,
            textAlign: 'center',
            opacity: reveal,
            transform: `translateY(${(1 - reveal) * 10}px)`,
          }}
        >
          {title ? (
            <div
              style={{
                fontFamily: fonts.display,
                fontSize: tokens.storyboard.codeHike.minimal.titleSize,
                color: textColor,
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </div>
          ) : null}
          {subtitle ? (
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: tokens.storyboard.codeHike.minimal.subtitleSize,
                color: subtitleColor,
                marginTop: 6,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>
      ) : null}

      <div
        style={{
          width: '100%',
          maxWidth: 1320,
          minHeight: 640,
          opacity: reveal,
          transform: `translateY(${(1 - reveal) * 12}px)`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div style={{position: 'relative', minHeight: 560, width: '100%'}}>
          {renderCodeSequences({padding: 0, loadingDark: !isLightTheme})}
        </div>

        {resolvedShowProgress ? (
          <div style={{marginTop: 18}}>
            <StepSegmentsBar
              stepCount={timeline.stepCount}
              activeStepIndex={timeline.activeStepIndex}
              currentStepProgress={timeline.currentStepProgress}
              height={4}
              gap={6}
              activeColor={isLightTheme ? tokens.colors.text : '#ffffff'}
              railColor={isLightTheme ? tokens.colors.borderSoft : 'rgba(255,255,255,0.18)'}
            />
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  )
}
