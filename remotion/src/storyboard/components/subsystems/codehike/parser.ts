import type {CodeHikeStepInput} from './types'

const parseStepLabelFromMeta = (meta?: string) => {
  const raw = String(meta ?? '').trim()
  if (!raw) return undefined

  const stepsMatch = /(?:^|\s)!!steps?\s+(.+)$/.exec(raw)
  if (stepsMatch?.[1]?.trim()) return stepsMatch[1].trim()

  const bangMatch = /(?:^|\s)!!\s+(.+)$/.exec(raw)
  if (bangMatch?.[1]?.trim()) return bangMatch[1].trim()

  return undefined
}

export const parseCodeHikeStepsMarkdown = (markdown: string): CodeHikeStepInput[] => {
  const lines = String(markdown ?? '').split(/\r?\n/)
  const steps: CodeHikeStepInput[] = []

  let pending: {label?: string; durationFrames?: number} | null = null
  let inFence = false
  let fenceLang = ''
  let fenceMeta = ''
  let fenceBuffer: string[] = []

  const pushStep = () => {
    const code = fenceBuffer.join('\n')
    const lang = fenceLang.trim() || 'txt'
    const meta = fenceMeta.trim()
    const label = pending?.label ?? parseStepLabelFromMeta(meta) ?? `Step ${steps.length + 1}`

    steps.push({
      label,
      lang,
      code,
      ...(meta ? {meta} : {}),
      ...(pending?.durationFrames ? {durationFrames: pending.durationFrames} : {}),
    })

    pending = null
    fenceLang = ''
    fenceMeta = ''
    fenceBuffer = []
  }

  for (const rawLine of lines) {
    const trimmed = rawLine.trim()

    if (inFence) {
      if (/^```/.test(trimmed)) {
        inFence = false
        pushStep()
        continue
      }
      fenceBuffer.push(rawLine)
      continue
    }

    const headingMatch = /^#{1,6}\s+!!steps(?:\s+(.*))?$/i.exec(trimmed)
    if (headingMatch) {
      pending = {label: headingMatch[1]?.trim() || undefined}
      continue
    }

    const durationMatch = /^!duration\s+(\d+)\s*$/i.exec(trimmed)
    if (durationMatch) {
      pending = pending ?? {}
      pending.durationFrames = Math.max(1, Number(durationMatch[1]))
      continue
    }

    const fenceStartMatch = /^```([^\s`]+)?(?:\s+(.*))?$/.exec(trimmed)
    if (fenceStartMatch) {
      inFence = true
      pending = pending ?? {}
      fenceLang = fenceStartMatch[1] ?? ''
      fenceMeta = fenceStartMatch[2] ?? ''
      fenceBuffer = []
    }
  }

  return steps
}
