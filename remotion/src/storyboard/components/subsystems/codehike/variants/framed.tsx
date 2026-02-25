import {AbsoluteFill} from 'remotion'

import {fonts, tokens} from '../../../../../theme'
import {StepSegmentsBar} from '../progress'
import type {VariantViewProps} from '../types'

export const CodeHikeFramedLayout: React.FC<VariantViewProps> = ({
  background,
  eyebrow,
  title,
  subtitle,
  reveal,
  spec,
  timeline,
  resolvedShowProgress,
  renderCodeSequences,
  codePanelBg,
  codePanelBorder,
}) => {
  return (
    <AbsoluteFill
      style={{
        background: background ?? '#0D1117',
        padding: spec.outerPadding,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 1320,
          height: '100%',
          opacity: reveal,
          transform: `translateY(${(1 - reveal) * 10}px)`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {resolvedShowProgress ? (
          <div style={{marginBottom: 18}}>
            <StepSegmentsBar
              stepCount={timeline.stepCount}
              activeStepIndex={timeline.activeStepIndex}
              currentStepProgress={timeline.currentStepProgress}
              height={3}
              gap={6}
              activeColor="#fff"
              railColor="#333"
            />
          </div>
        ) : null}

        {(eyebrow || title || subtitle) ? (
          <div style={{marginBottom: 16, textAlign: 'center'}}>
            {eyebrow ? (
              <div
                style={{
                  fontFamily: fonts.brand,
                  fontSize: tokens.storyboard.codeHike.framed.eyebrowSize,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.6)',
                  marginBottom: 6,
                }}
              >
                {eyebrow}
              </div>
            ) : null}
            {title ? (
              <div
                style={{
                  fontFamily: fonts.display,
                  fontSize: tokens.storyboard.codeHike.framed.titleSize,
                  color: '#fff',
                  fontWeight: 700,
                  lineHeight: 1.05,
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
                  fontSize: tokens.storyboard.codeHike.framed.subtitleSize,
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
            flex: 1,
            minHeight: 0,
            borderRadius: 18,
            background: codePanelBg,
            border: `1px solid ${codePanelBorder}`,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div style={{position: 'absolute', inset: 0, padding: '30px 24px'}}>
            {renderCodeSequences({padding: 0, loadingDark: true})}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  )
}
