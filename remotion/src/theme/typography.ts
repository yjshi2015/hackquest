import {notoSans, nextBook} from './fonts';

export const typography = {
  fonts: {
    body: notoSans,
    display: nextBook,
    brand: nextBook,
    mono:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900,
  },
  typeScale: {
    kicker: 12,
    body: 18,
    subtitle: 22,
    title: 40,
    hero: 64,
  },
  lineHeights: {
    tight: 1.05,
    normal: 1.25,
    relaxed: 1.4,
  },
} as const;
