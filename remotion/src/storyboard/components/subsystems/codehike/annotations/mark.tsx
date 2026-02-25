import type {AnnotationHandler} from 'codehike/code'
import {InnerLine} from 'codehike/code'
import {interpolate, interpolateColors, useCurrentFrame} from 'remotion'

const parseMarkQuery = (query?: string) => {
  const parts = String(query ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
  const delay = Number(parts[0])
  const duration = Number(parts[1])
  const color = parts[2]
  return {
    delay: Number.isFinite(delay) ? delay : 80,
    duration: Number.isFinite(duration) ? duration : 20,
    color: color || '#F2CC6044',
  }
}

export const markHandler: AnnotationHandler = {
  name: 'mark',
  Line: (props) => <InnerLine merge={props} style={{padding: '0 4px'}} />,
  Block: ({children, annotation}) => {
    const frame = useCurrentFrame()
    const {delay, duration, color} = parseMarkQuery(annotation.query)
    const progress = interpolate(frame, [delay, delay + duration], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
    const backgroundColor = interpolateColors(progress, [0, 1], ['rgba(0,0,0,0)', color])
    return <div style={{backgroundColor}}>{children}</div>
  },
  Inline: ({children, annotation}) => {
    const frame = useCurrentFrame()
    const {delay, duration, color} = parseMarkQuery(annotation.query)
    const progress = interpolate(frame, [delay, delay + duration], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
    const backgroundColor = interpolateColors(progress, [0, 1], ['rgba(0,0,0,0)', color])
    return (
      <span
        style={{
          display: 'inline-block',
          backgroundColor,
          borderRadius: 4,
          padding: '0 0.125rem',
          margin: '0 -0.125rem',
        }}
      >
        {children}
      </span>
    )
  },
}
