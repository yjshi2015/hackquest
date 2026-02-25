import type {TimelineMetrics} from './types'

export const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))

const allocateWeightedDurations = (totalFrames: number, weights: number[]) => {
  const safeWeights = weights.map((w) => (Number.isFinite(w) && w > 0 ? w : 1))
  const safeTotal = Math.max(1, totalFrames)
  const sum = safeWeights.reduce((acc, w) => acc + w, 0) || safeWeights.length || 1
  const raw = safeWeights.map((w) => (safeTotal * w) / sum)
  const base = raw.map((n) => Math.floor(n))
  let remaining = safeTotal - base.reduce((acc, n) => acc + n, 0)
  const order = raw
    .map((n, idx) => ({idx, frac: n - Math.floor(n)}))
    .sort((a, b) => b.frac - a.frac)

  for (let i = 0; i < order.length && remaining > 0; i += 1) {
    base[order[i].idx] += 1
    remaining -= 1
  }

  return base.map((n) => Math.max(1, n))
}

export const computeTimelineMetrics = (
  frame: number,
  totalFrames: number,
  stepCount: number,
  stepFrames?: number,
  authoredDurations?: number[],
): TimelineMetrics => {
  const safeTotal = Math.max(1, totalFrames)
  const explicitStepFrames = stepFrames ? Math.max(1, Math.round(stepFrames)) : null
  const baseStepFrames = explicitStepFrames ?? Math.max(1, Math.floor(safeTotal / Math.max(1, stepCount)))

  const hasAuthoredDurations =
    !explicitStepFrames &&
    Array.isArray(authoredDurations) &&
    authoredDurations.length > 0 &&
    authoredDurations.some((n) => Number.isFinite(n) && n > 0)

  const stepDurations = explicitStepFrames
    ? Array.from({length: stepCount}, () => baseStepFrames)
    : hasAuthoredDurations
      ? allocateWeightedDurations(safeTotal, authoredDurations ?? [])
      : Array.from({length: stepCount}, (_, idx) =>
          baseStepFrames + (idx < safeTotal - baseStepFrames * stepCount ? 1 : 0),
        )

  let acc = 0
  const stepStarts = stepDurations.map((dur) => {
    const start = acc
    acc += dur
    return start
  })
  const timelineTotalFrames = stepDurations.reduce((sum, v) => sum + v, 0)

  let activeStepIndex = 0
  for (let i = 0; i < stepStarts.length; i += 1) {
    if (frame >= stepStarts[i]) activeStepIndex = i
  }
  const activeStepStart = stepStarts[activeStepIndex] ?? 0
  const activeStepDuration = Math.max(1, stepDurations[activeStepIndex] ?? baseStepFrames)
  const currentStepProgress = clamp((frame - activeStepStart) / activeStepDuration, 0, 1)
  const overallProgress = clamp(frame / Math.max(1, timelineTotalFrames - 1), 0, 1)

  return {
    totalFrames: timelineTotalFrames,
    stepCount,
    stepDurations,
    stepStarts,
    activeStepIndex,
    activeStepStart,
    activeStepDuration,
    currentStepProgress,
    overallProgress,
  }
}
