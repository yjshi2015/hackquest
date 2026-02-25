import {useEffect, useMemo, useRef, useState} from 'react'
import type {Theme as LighterTheme} from '@code-hike/lighter'
import {AbsoluteFill, Sequence, cancelRender, continueRender, delayRender, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion'

import type {LessonBlockContext} from '../../../../lesson-config'
import {motion} from '../../../../theme'
import type {StoryboardInjected} from '../../../types'
import {CodeStepFrame} from '../../subsystems/codehike/code'
import {buildHandlers} from '../../subsystems/codehike/handlers'
import {parseCodeHikeStepsMarkdown} from '../../subsystems/codehike/parser'
import {LoadingState} from '../../subsystems/codehike/progress'
import {computeTimelineMetrics} from '../../subsystems/codehike/timeline'
import {buildTwoslashEnhancedHighlight} from '../../subsystems/codehike/twoslash'
import {CodeHikeFramedLayout} from '../../subsystems/codehike/variants/framed'
import {CodeHikeMinimalLayout} from '../../subsystems/codehike/variants/minimal'
import {CodeHikeTimelineLayout} from '../../subsystems/codehike/variants/timeline'
import {
  CodeHikeCardPropsSchema,
  type CodeHikeCardProps,
  type HighlightedStep,
  type RenderCodeSequencesOptions,
  layoutDefaults,
  presetDefaults,
} from '../../subsystems/codehike/types'

export {CodeHikeCardPropsSchema}
export type {CodeHikeCardProps}

export const CodeHikeCard: React.FC<
  CodeHikeCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({
  eyebrow,
  title,
  subtitle,
  preset = 'diff',
  layout,
  annotations,
  theme,
  twoslash,
  stepFrames,
  transitionFrames,
  codeFontSize,
  showProgress,
  background,
  context,
  hq,
}) => {
  const frame = useCurrentFrame()
  const {fps} = useVideoConfig()
  const reveal = spring({frame, fps, config: motion.spring.standard})

  const presetConfig = presetDefaults[preset]
  const resolvedLayout = layout ?? presetConfig.layout
  const resolvedAnnotations = Array.from(new Set(annotations ?? presetConfig.annotations))
  const spec = layoutDefaults[resolvedLayout]
  const resolvedTheme = (theme ?? spec.theme) as LighterTheme
  const enableTwoslash = twoslash ?? presetConfig.enableTwoslash
  const resolvedShowProgress = showProgress ?? spec.showProgress
  const resolvedTransitionFrames = Math.max(1, Math.round(transitionFrames ?? spec.transitionFrames))
  const resolvedCodeFontSize = Math.max(18, Math.round(codeFontSize ?? spec.codeFontSize))

  const [highlightedSteps, setHighlightedSteps] = useState<HighlightedStep[] | null>(null)
  const [highlightHandle] = useState(() => delayRender('codehike-highlight'))
  const highlightDone = useRef(false)

  const resolvedContentFile = hq?.assetRef ?? null
  const highlightKey = `${resolvedLayout}::${String(resolvedTheme)}::${enableTwoslash ? 'twoslash' : 'plain'}::${resolvedContentFile ?? ''}`

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setHighlightedSteps(null)

      if (!resolvedContentFile) {
        throw new Error(
          'CodeHike requires an `Asset Ref` markdown sidecar (for example: assets/codehike/segment-23.md).',
        )
      }

      const src = /^https?:\/\//i.test(resolvedContentFile)
        ? resolvedContentFile
        : staticFile(resolvedContentFile)
      const response = await fetch(src)
      if (!response.ok) {
        throw new Error(`Failed to load CodeHike sidecar: ${resolvedContentFile} (${response.status})`)
      }

      const markdown = await response.text()
      const sourceSteps = parseCodeHikeStepsMarkdown(markdown)
      if (!sourceSteps.length) {
        throw new Error(
          `No CodeHike steps found in sidecar "${resolvedContentFile}". Expected headings like "## !!steps Name" or fenced code blocks.`,
        )
      }

      const highlighted = await Promise.all(
        sourceSteps.map((step) => buildTwoslashEnhancedHighlight(step, resolvedTheme, enableTwoslash)),
      )

      if (cancelled) return
      setHighlightedSteps(highlighted)
      if (!highlightDone.current) {
        highlightDone.current = true
        continueRender(highlightHandle)
      }
    })().catch((err) => {
      if (cancelled) return
      cancelRender(
        err instanceof Error ? err : new Error(`CodeHike highlight failed: ${String(err)}`),
      )
    })

    return () => {
      cancelled = true
    }
  }, [highlightHandle, highlightKey])

  const codeSteps = highlightedSteps ?? []
  const stepCount = Math.max(1, codeSteps.length)
  const totalFrames = Math.max(1, Number(context.blockDurationFrames || context.contentDurationFrames || 1))
  const timeline = computeTimelineMetrics(
    frame,
    totalFrames,
    stepCount,
    stepFrames,
    codeSteps.map((s) => s.durationFrames ?? 0),
  )

  const isLightTheme = /light/i.test(String(resolvedTheme))
  const codePanelBg =
    (codeSteps[0]?.style.background as string | undefined) ??
    (codeSteps[0]?.style.backgroundColor as string | undefined) ??
    (spec.dark ? '#0D1117' : '#f6f7f8')
  const codePanelBorder = spec.dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.10)'
  const annotationBg = isLightTheme ? 'rgba(0, 0, 0, 0.05)' : 'rgb(32 42 57)'
  const annotationText = isLightTheme ? '#24292f' : '#c9d1d9'
  const labels = Array.from({length: timeline.stepCount}).map(
    (_, idx) => codeSteps[idx]?.label ?? `Step ${idx + 1}`,
  )
  const handlers = useMemo(() => buildHandlers(resolvedAnnotations), [resolvedAnnotations])

  const renderCodeSequences = (opts?: RenderCodeSequencesOptions) => {
    if (!codeSteps.length) {
      return <LoadingState dark={opts?.loadingDark ?? spec.dark} />
    }

    return (
      <>
        {codeSteps.map((step, idx) => {
          const from = timeline.stepStarts[idx] ?? 0
          const duration = Math.max(1, timeline.stepDurations[idx] ?? 1)
          const stepTransition = Math.max(1, Math.min(duration, resolvedTransitionFrames))

          return (
            <Sequence
              key={`codehike-step-${idx}`}
              layout="none"
              from={from}
              durationInFrames={duration}
              name={step.label ?? `Step ${idx + 1}`}
            >
              <AbsoluteFill style={{padding: opts?.padding ?? 0}}>
                <CodeStepFrame
                  oldCode={codeSteps[idx - 1]}
                  newCode={step}
                  transitionFrames={stepTransition}
                  codeFontSize={resolvedCodeFontSize}
                  codeLineHeight={spec.codeLineHeight}
                  handlers={handlers}
                  showMetaLine={opts?.showMetaLine}
                  metaStyle={opts?.metaStyle}
                  annotationBg={annotationBg}
                  annotationText={annotationText}
                />
              </AbsoluteFill>
            </Sequence>
          )
        })}
      </>
    )
  }

  const commonVariantProps = {
    background,
    eyebrow,
    title,
    subtitle,
    reveal,
    spec,
    codePanelBg,
    codePanelBorder,
    labels,
    timeline,
    resolvedShowProgress,
    renderCodeSequences,
    isLightTheme,
  }

  if (resolvedLayout === 'minimal') return <CodeHikeMinimalLayout {...commonVariantProps} />
  if (resolvedLayout === 'framed') return <CodeHikeFramedLayout {...commonVariantProps} />
  return <CodeHikeTimelineLayout {...commonVariantProps} />
}
