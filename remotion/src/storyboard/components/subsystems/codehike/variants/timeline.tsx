import {AbsoluteFill} from 'remotion'

import {fonts, tokens} from '../../../../../theme'
import {TimelineWeightedProgress} from '../progress'
import type {VariantViewProps} from '../types'

export const CodeHikeTimelineLayout: React.FC<VariantViewProps> = ({
  background,
  title,
  subtitle,
  reveal,
  spec,
  labels,
  timeline,
  resolvedShowProgress,
  renderCodeSequences,
  codePanelBg,
  codePanelBorder,
  isLightTheme,
}) => {
  const textColor = isLightTheme ? tokens.colors.text : '#fff'
  const subtitleColor = isLightTheme ? tokens.colors.muted : 'rgba(255,255,255,0.7)'
  const outerBg = background ?? (isLightTheme ? tokens.colors.bg : '#0D1117')

  return (
    <AbsoluteFill
      style={{
        background: outerBg,
        padding: spec.outerPadding,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 1440,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          opacity: reveal,
          transform: `translateY(${(1 - reveal) * 12}px)`,
        }}
      >
        {(title || subtitle) ? (
          <div style={{textAlign: 'center'}}>
            {title ? (
              <div
                style={{
                  fontFamily: fonts.display,
                  fontSize: tokens.storyboard.codeHike.timeline.titleSize,
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
                  fontSize: tokens.storyboard.codeHike.timeline.subtitleSize,
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
            flex: 1,
            minHeight: 0,
            borderRadius: 18,
            background: codePanelBg,
            border: `1px solid ${codePanelBorder}`,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div style={{position: 'absolute', inset: 0, padding: '16px 42px'}}>
            {renderCodeSequences({
              padding: 0,
              showMetaLine: true,
              metaStyle: {
                fontFamily: fonts.body,
                fontSize: 18,
                color: isLightTheme ? tokens.colors.label : 'rgba(255,255,255,0.75)',
              },
              loadingDark: !isLightTheme,
            })}
          </div>
        </div>

        {resolvedShowProgress ? (
          <TimelineWeightedProgress
            labels={labels}
            stepDurations={timeline.stepDurations}
            activeStepIndex={timeline.activeStepIndex}
            currentStepProgress={timeline.currentStepProgress}
            isLightTheme={isLightTheme}
          />
        ) : null}
      </div>
    </AbsoluteFill>
  )
}
