import type {CSSProperties} from 'react'
import type {AnnotationHandler, InlineAnnotation} from 'codehike/code'
import {InnerToken} from 'codehike/code'
import {interpolate, useCurrentFrame} from 'remotion'

const errorInlineHandler: AnnotationHandler = {
  name: 'error',
  transform: (annotation: InlineAnnotation) => {
    const {name, query, lineNumber, fromColumn, toColumn, data} = annotation
    return [
      annotation,
      {
        name: 'error-message',
        query,
        fromLineNumber: lineNumber,
        toLineNumber: lineNumber,
        data,
      },
    ]
  },
  Inline: ({children}) => (
    <span
      style={
        {
          '--decoration': 'underline wavy red',
        } as CSSProperties
      }
    >
      {children}
    </span>
  ),
  Token: (props) => (
    <InnerToken
      merge={props}
      style={{
        textDecoration: 'var(--decoration)',
      }}
    />
  ),
}

const errorMessageHandler: AnnotationHandler = {
  name: 'error-message',
  Block: ({annotation, children}) => {
    const frame = useCurrentFrame()
    const opacity = interpolate(frame, [25, 35], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
    const annData = (annotation.data ?? {}) as {children?: string}

    return (
      <>
        {children}
        <div
          style={{
            opacity,
            borderLeft: '2px solid red',
            marginLeft: '-0.5rem',
            backgroundColor: 'var(--ch-annotation-bg, rgb(32 42 57))',
            padding: '0.5rem 1rem',
            marginTop: '0.25rem',
            whiteSpace: 'pre-wrap',
            color: 'var(--ch-annotation-text, #c9d1d9)',
          }}
        >
          {annData.children || annotation.query}
        </div>
      </>
    )
  },
}

export const errorHandlers: AnnotationHandler[] = [errorInlineHandler, errorMessageHandler]
