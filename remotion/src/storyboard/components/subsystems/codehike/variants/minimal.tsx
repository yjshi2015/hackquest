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
}) => {
  return (
    <AbsoluteFill
      style={{
        background: background ?? codePanelBg,
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
                color: '#fff',
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
                color: 'rgba(255,255,255,0.7)',
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
          {renderCodeSequences({padding: 0, loadingDark: true})}
        </div>

        {resolvedShowProgress ? (
          <div style={{marginTop: 18}}>
            <StepSegmentsBar
              stepCount={timeline.stepCount}
              activeStepIndex={timeline.activeStepIndex}
              currentStepProgress={timeline.currentStepProgress}
              height={4}
              gap={6}
              activeColor="#ffffff"
              railColor="rgba(255,255,255,0.18)"
            />
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  )
}
