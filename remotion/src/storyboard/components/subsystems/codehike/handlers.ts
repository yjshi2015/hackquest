import type {AnnotationHandler} from 'codehike/code'

import type {CodeHikeAnnotation} from './types'
import {tokenTransitionsHandler} from './code'
import {markHandler} from './annotations/mark'
import {calloutHandler} from './annotations/callout'
import {errorHandlers} from './annotations/error'

export const buildHandlers = (annotations: CodeHikeAnnotation[]): AnnotationHandler[] => {
  const enabled = new Set(annotations)
  const handlers: AnnotationHandler[] = [tokenTransitionsHandler]

  if (enabled.has('callout')) handlers.push(calloutHandler)
  if (enabled.has('error')) handlers.push(...errorHandlers)
  if (enabled.has('mark')) handlers.push(markHandler)

  return handlers
}
