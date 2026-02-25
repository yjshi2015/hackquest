export const secondsToFrames = (
  seconds: number | undefined,
  fps: number,
  fallbackFrames = 0,
) => {
  if (seconds == null) return fallbackFrames;
  return Math.max(0, Math.round(seconds * fps));
};

