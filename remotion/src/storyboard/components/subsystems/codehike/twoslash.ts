import type {Theme as LighterTheme} from '@code-hike/lighter'
import type {HighlightedCode} from 'codehike/code'
import {highlight} from 'codehike/code'
import {createTwoslashFromCDN} from 'twoslash-cdn'

import type {CodeHikeStepInput, HighlightedStep} from './types'

type TwoslashQueryLike = {
  text?: unknown
  line?: unknown
  character?: unknown
  length?: unknown
}

type TwoslashErrorLike = {
  text?: unknown
  line?: unknown
  character?: unknown
  length?: unknown
}

let twoslashClientSingleton: ReturnType<typeof createTwoslashFromCDN> | null = null

const getTwoslashClient = () => {
  if (!twoslashClientSingleton) {
    twoslashClientSingleton = createTwoslashFromCDN()
  }
  return twoslashClientSingleton
}

const toTwoslashExtension = (lang?: string) => {
  const raw = String(lang ?? '').trim().toLowerCase()
  if (!raw) return null
  if (raw === 'ts' || raw === 'typescript') return 'ts'
  if (raw === 'tsx') return 'tsx'
  if (raw === 'js' || raw === 'javascript') return 'js'
  if (raw === 'jsx') return 'jsx'
  return null
}

const highlightWithFallback = async (
  code: string,
  lang: string,
  meta: string,
  theme: LighterTheme,
) => {
  try {
    return await highlight({value: code, lang, meta}, theme)
  } catch {
    return await highlight({value: code, lang: 'txt', meta}, theme)
  }
}

export const buildTwoslashEnhancedHighlight = async (
  step: CodeHikeStepInput,
  theme: LighterTheme,
  enableTwoslash: boolean,
): Promise<HighlightedStep> => {
  const meta = step.meta ?? ''
  const twoslashExt = enableTwoslash ? toTwoslashExtension(step.lang) : null

  if (!twoslashExt) {
    const plain = await highlightWithFallback(step.code, step.lang, meta, theme)
    return {...plain, label: step.label, durationFrames: step.durationFrames}
  }

  let processedCode = step.code
  let queries: TwoslashQueryLike[] = []
  let errors: TwoslashErrorLike[] = []

  try {
    const twoslash = getTwoslashClient()
    const result = (await twoslash.run(step.code, twoslashExt, {
      compilerOptions: {lib: ['dom']},
    })) as unknown as {
      code?: string
      queries?: TwoslashQueryLike[]
      errors?: TwoslashErrorLike[]
    }

    if (typeof result.code === 'string' && result.code.trim()) {
      processedCode = result.code
    }
    if (Array.isArray(result.queries)) queries = result.queries
    if (Array.isArray(result.errors)) errors = result.errors
  } catch {
    // Fallback to plain highlight if twoslash setup/network fails.
  }

  const highlighted = await highlightWithFallback(processedCode, step.lang, meta, theme)

  for (const query of queries) {
    const text = typeof query.text === 'string' ? query.text : ''
    const line = Number(query.line)
    const character = Number(query.character)
    const length = Number(query.length)

    if (!text || !Number.isFinite(line) || !Number.isFinite(character)) continue

    let codeblock: HighlightedCode | undefined
    try {
      codeblock = await highlightWithFallback(text, 'ts', '', theme)
    } catch {
      codeblock = undefined
    }

    highlighted.annotations.push({
      name: 'callout',
      query: text,
      lineNumber: line + 1,
      data: {
        character,
        codeblock,
      },
      fromColumn: character,
      toColumn: character + (Number.isFinite(length) ? Math.max(1, length) : 1),
    })
  }

  for (const err of errors) {
    const text = typeof err.text === 'string' ? err.text : ''
    const line = Number(err.line)
    const character = Number(err.character)
    const length = Number(err.length)
    if (!Number.isFinite(line) || !Number.isFinite(character)) continue

    highlighted.annotations.push({
      name: 'error',
      query: text,
      lineNumber: line + 1,
      fromColumn: character,
      toColumn: character + (Number.isFinite(length) ? Math.max(1, length) : 1),
      data: {character, children: text},
    })
  }

  return {...highlighted, label: step.label, durationFrames: step.durationFrames}
}
