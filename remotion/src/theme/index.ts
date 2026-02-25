import {tokens} from './tokens';
import {typography} from './typography';
import {motion} from './motion';

// Back-compat exports expected by existing components.
export const colors = {
  background: tokens.colors.bg,
  panel: tokens.colors.panel,
  panelSoft: tokens.colors.panelSoft,
  text: tokens.colors.text,
  label: tokens.colors.label,
  bodyText: tokens.colors.bodyText,
  muted: tokens.colors.muted,
  accent: tokens.colors.accent,
  accentRgb: tokens.colors.accentRgb,
  accentStrong: tokens.colors.accentStrong,
  accentMedium: tokens.colors.accentMedium,
  accentSoft: tokens.colors.accentSoft,
  accentFaint: tokens.colors.accentFaint,
  accentGhost: tokens.colors.accentGhost,
  grid: tokens.colors.grid,
  border: tokens.colors.border,
  borderSoft: tokens.colors.borderSoft,
  shadow: tokens.colors.shadow,
} as const;

export const fonts = {
  body: typography.fonts.body,
  display: typography.fonts.display,
  brand: typography.fonts.brand,
  mono: typography.fonts.mono,
} as const;

export {tokens, typography, motion};

