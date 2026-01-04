/**
 * Design System - Design Tokens
 * Centralized design tokens for the EazyGO platform
 * Import from here to ensure consistency across components
 */

export { colors, type ColorToken } from './colors';
export { typography, type TypographyToken } from './typography';
export { spacing, type SpacingToken } from './spacing';
export { effects, type EffectsToken } from './effects';

// Re-export all tokens as a single object
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { effects } from './effects';

export const tokens = {
  colors,
  typography,
  spacing,
  effects,
} as const;

export type DesignTokens = typeof tokens;
