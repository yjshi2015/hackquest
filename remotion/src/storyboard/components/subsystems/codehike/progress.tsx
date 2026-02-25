import {colors, fonts} from '../../../../theme'

export const StepSegmentsBar: React.FC<{
  stepCount: number
  activeStepIndex: number
  currentStepProgress: number
  height?: number
  gap?: number
  activeColor?: string
  railColor?: string
}> = ({
  stepCount,
  activeStepIndex,
  currentStepProgress,
  height = 4,
  gap = 6,
  activeColor = '#fff',
  railColor = '#333',
}) => (
  <div
    style={{
      display: 'flex',
      gap,
      height,
      width: '100%',
    }}
  >
    {Array.from({length: stepCount}).map((_, index) => (
      <div
        key={`seg-${index}`}
        style={{
          backgroundColor: railColor,
          borderRadius: 999,
          overflow: 'hidden',
          height: '100%',
          flex: 1,
        }}
      >
        <div
          style={{
            height: '100%',
            backgroundColor: activeColor,
            width:
              index > activeStepIndex
                ? '0%'
                : index === activeStepIndex
                  ? `${currentStepProgress * 100}%`
                  : '100%',
          }}
        />
      </div>
    ))}
  </div>
)

export const TimelineWeightedProgress: React.FC<{
  labels: string[]
  stepDurations: number[]
  activeStepIndex: number
  currentStepProgress: number
}> = ({labels, stepDurations, activeStepIndex, currentStepProgress}) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: 8,
        width: '100%',
        alignItems: 'stretch',
      }}
    >
      {labels.map((label, index) => {
        const isCurrent = index === activeStepIndex
        const durationWeight = Math.max(1, stepDurations[index] ?? 1)
        return (
          <div
            key={`${index}-${label}`}
            style={{
              display: 'flex',
              flex: durationWeight,
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: 22,
                color: isCurrent ? '#fff' : 'rgba(255,255,255,0.75)',
                lineHeight: 1.1,
                textAlign: 'center',
              }}
            >
              {label}
            </div>
            <div
              style={{
                width: '100%',
                height: 10,
                borderRadius: 999,
                overflow: 'hidden',
                backgroundColor: 'rgba(255,255,255,0.16)',
              }}
            >
              <div
                style={{
                  height: '100%',
                  borderRadius: 999,
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  width:
                    index > activeStepIndex
                      ? '0%'
                      : isCurrent
                        ? `${currentStepProgress * 100}%`
                        : '100%',
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export const LoadingState: React.FC<{dark: boolean}> = ({dark}) => (
  <div
    style={{
      fontFamily: fonts.body,
      fontSize: 24,
      color: dark ? 'rgba(255,255,255,0.72)' : colors.muted,
    }}
  >
    Highlighting code...
  </div>
)
