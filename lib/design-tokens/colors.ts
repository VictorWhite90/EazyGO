/**
 * Design System - Color Tokens
 * Professional color palette for EazyGO platform
 * Avoids AI-looking gradients, focuses on trust and professionalism
 */

export const colors = {
  // Neutral scale - Foundation of the UI
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },

  // Primary - Vibrant Green (from EazyGO logo)
  primary: {
    50: '#e6ffe6',
    100: '#ccffcc',
    200: '#99ff99',
    300: '#66ff66',
    400: '#33ff33',
    500: '#00D000', // Main brand color - vibrant thick green
    600: '#00B800',
    700: '#00A000',
    800: '#008800',
    900: '#007000',
    950: '#005000',
  },

  // Secondary - Amber (warmth & action)
  secondary: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308', // Accent for CTAs
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
    950: '#422006',
  },

  // Success state (aligned with brand green)
  success: {
    50: '#e6ffe6',
    100: '#ccffcc',
    200: '#99ff99',
    300: '#66ff66',
    400: '#33ff33',
    500: '#00D000',
    600: '#00B800',
    700: '#00A000',
    800: '#008800',
    900: '#007000',
  },

  // Warning state
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  // Error state
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  // Glassmorphism overlays
  glass: {
    white: 'rgba(255, 255, 255, 0.7)',
    whiteDark: 'rgba(255, 255, 255, 0.5)',
    whiteLight: 'rgba(255, 255, 255, 0.25)',
    dark: 'rgba(0, 0, 0, 0.5)',
    darkLight: 'rgba(0, 0, 0, 0.3)',
    blur: 'rgba(255, 255, 255, 0.1)',
  },
} as const;

export type ColorToken = typeof colors;
