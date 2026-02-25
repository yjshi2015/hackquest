import type {CSSProperties, ReactNode} from 'react'
import type {HighlightedCode} from 'codehike/code'
import {z} from 'zod'

export const CodeHikeLayoutSchema = z.enum(['minimal', 'framed', 'timeline'])
export const CodeHikePresetSchema = z.enum(['diff', 'walkthrough', 'typescript'])
export const CodeHikeAnnotationSchema = z.enum(['mark', 'callout', 'error'])

export const CodeHikeCardPropsSchema = z
  .object({
    eyebrow: z.string().optional(),
    title: z.string().optional(),
    subtitle: z.string().optional(),
    preset: CodeHikePresetSchema.default('diff'),
    layout: CodeHikeLayoutSchema.optional(),
    annotations: z.array(CodeHikeAnnotationSchema).optional(),
    theme: z.string().optional(),
    twoslash: z.boolean().optional(),
    stepFrames: z.number().int().positive().optional(),
    transitionFrames: z.number().int().positive().optional(),
    codeFontSize: z.number().positive().optional(),
    showProgress: z.boolean().optional(),
    background: z.string().optional(),
  })
  .strict()

export type CodeHikeCardProps = z.infer<typeof CodeHikeCardPropsSchema>
export type CodeHikeLayout = z.infer<typeof CodeHikeLayoutSchema>
export type CodeHikePreset = z.infer<typeof CodeHikePresetSchema>
export type CodeHikeAnnotation = z.infer<typeof CodeHikeAnnotationSchema>

export type CodeHikeStepInput = {
  label?: string
  lang: string
  code: string
  meta?: string
  durationFrames?: number
}

export type HighlightedStep = HighlightedCode & {
  label?: string
  durationFrames?: number
}

export type VariantSpec = {
  theme: string
  dark: boolean
  showProgress: boolean
  enableTwoslash: boolean
  codeFontSize: number
  codeLineHeight: number
  transitionFrames: number
  outerPadding: string
}

export type TimelineMetrics = {
  totalFrames: number
  stepCount: number
  stepDurations: number[]
  stepStarts: number[]
  activeStepIndex: number
  activeStepStart: number
  activeStepDuration: number
  currentStepProgress: number
  overallProgress: number
}

export type CodeHikePresetConfig = {
  layout: CodeHikeLayout
  annotations: CodeHikeAnnotation[]
  enableTwoslash: boolean
}

export const presetDefaults: Record<CodeHikePreset, CodeHikePresetConfig> = {
  diff: {
    layout: 'timeline',
    annotations: ['mark'],
    enableTwoslash: false,
  },
  walkthrough: {
    layout: 'minimal',
    annotations: ['mark'],
    enableTwoslash: false,
  },
  typescript: {
    layout: 'framed',
    annotations: ['mark', 'callout', 'error'],
    enableTwoslash: true,
  },
}

export const layoutDefaults: Record<CodeHikeLayout, VariantSpec> = {
  minimal: {
    theme: 'github-light',
    dark: false,
    showProgress: false,
    enableTwoslash: false,
    codeFontSize: 28,
    codeLineHeight: 1.5,
    transitionFrames: 60,
    outerPadding: '40px 64px',
  },
  framed: {
    theme: 'github-light',
    dark: false,
    showProgress: true,
    enableTwoslash: true,
    codeFontSize: 26,
    codeLineHeight: 1.5,
    transitionFrames: 90,
    outerPadding: '36px 48px',
  },
  timeline: {
    theme: 'github-light',
    dark: false,
    showProgress: true,
    enableTwoslash: false,
    codeFontSize: 24,
    codeLineHeight: 1.6,
    transitionFrames: 90,
    outerPadding: '32px 56px 28px',
  },
}

export type RenderCodeSequencesOptions = {
  padding?: string | number
  showMetaLine?: boolean
  metaStyle?: CSSProperties
  loadingDark?: boolean
}

export type RenderCodeSequences = (opts?: RenderCodeSequencesOptions) => ReactNode

export type VariantViewProps = {
  background?: string
  eyebrow?: string
  title?: string
  subtitle?: string
  reveal: number
  spec: VariantSpec
  codePanelBg: string
  codePanelBorder: string
  labels: string[]
  timeline: TimelineMetrics
  resolvedShowProgress: boolean
  renderCodeSequences: RenderCodeSequences
  isLightTheme: boolean
}
