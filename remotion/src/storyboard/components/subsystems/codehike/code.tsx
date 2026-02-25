import type {CSSProperties} from 'react'
import {useLayoutEffect, useRef, useState} from 'react'
import type {AnnotationHandler, HighlightedCode} from 'codehike/code'
import {InnerPre, InnerToken, Pre} from 'codehike/code'
import {
  calculateTransitions,
  getStartingSnapshot,
  type TokenTransition,
  type TokenTransitionsSnapshot,
} from 'codehike/utils/token-transitions'
import {
  Easing,
  continueRender,
  delayRender,
  interpolate,
  interpolateColors,
  useCurrentFrame,
} from 'remotion'

import {fonts} from '../../../../theme'

export const tokenTransitionsHandler: AnnotationHandler = {
  name: 'token-transitions',
  Pre: (props) => <InnerPre merge={props} style={{position: 'relative'}} />,
  Token: (props) => <InnerToken merge={props} style={{display: 'inline-block'}} />,
}

const interpolateStyle = (
  element: HTMLElement,
  keyframes: TokenTransition['keyframes'],
  frame: number,
  delay: number,
  duration: number,
) => {
  const {translateX, translateY, color, opacity} = keyframes
  const progress = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.ease),
  })

  if (opacity) {
    element.style.opacity = String(interpolate(progress, [0, 1], opacity))
  }
  if (color) {
    element.style.color = interpolateColors(progress, [0, 1], color)
  }
  if (translateX || translateY) {
    const x = interpolate(progress, [0, 1], translateX ?? [0, 0])
    const y = interpolate(progress, [0, 1], translateY ?? [0, 0])
    element.style.translate = `${x}px ${y}px`
  }
}

export const useTokenTransitions = (
  oldCode: HighlightedCode | undefined,
  newCode: HighlightedCode,
  durationInFrames: number,
) => {
  const frame = useCurrentFrame()
  const ref = useRef<HTMLPreElement>(null)
  const [snapshot, setSnapshot] = useState<TokenTransitionsSnapshot>()
  const [handle] = useState(() => delayRender('codehike-token-transition'))
  const didContinue = useRef(false)

  const prevCode = oldCode ?? {...newCode, tokens: [], annotations: []}

  useLayoutEffect(() => {
    if (!ref.current) return
    if (!snapshot) {
      setSnapshot(getStartingSnapshot(ref.current))
      return
    }

    const transitions = calculateTransitions(ref.current, snapshot)
    for (const {element, keyframes, options} of transitions) {
      interpolateStyle(
        element,
        keyframes,
        frame,
        durationInFrames * options.delay,
        durationInFrames * options.duration,
      )
    }

    if (!didContinue.current) {
      didContinue.current = true
      continueRender(handle)
    }
  }, [durationInFrames, frame, handle, snapshot])

  return {code: snapshot ? newCode : prevCode, ref}
}

export const CodeStepFrame: React.FC<{
  oldCode?: HighlightedCode
  newCode: HighlightedCode
  transitionFrames: number
  codeFontSize: number
  codeLineHeight: number
  handlers: AnnotationHandler[]
  showMetaLine?: boolean
  metaStyle?: CSSProperties
  annotationBg?: string
  annotationText?: string
}> = ({
  oldCode,
  newCode,
  transitionFrames,
  codeFontSize,
  codeLineHeight,
  handlers,
  showMetaLine,
  metaStyle,
  annotationBg,
  annotationText,
}) => {
  const {code, ref} = useTokenTransitions(oldCode, newCode, transitionFrames)

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        '--ch-annotation-bg': annotationBg ?? 'rgb(32 42 57)',
        '--ch-annotation-text': annotationText ?? '#c9d1d9',
      } as CSSProperties}
    >
      {showMetaLine && newCode.meta ? (
        <div
          style={{
            textAlign: 'center',
            height: '1.5rem',
            marginBottom: '0.25rem',
            ...metaStyle,
          }}
        >
          {newCode.meta}
        </div>
      ) : null}
      <Pre
        ref={ref}
        code={code}
        handlers={handlers}
        style={{
          margin: 0,
          fontFamily: fonts.mono,
          fontSize: codeFontSize,
          lineHeight: codeLineHeight,
        }}
      />
    </div>
  )
}
