/**
 * Design System - Typography Tokens
 * Font families, sizes, weights, and line heights
 */

export const typography = {
  // Font families
  fonts: {
    // Headings and body - Inter (modern, clean, excellent at all sizes)
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",

    // Mono - For code/numbers
    mono: "'JetBrains Mono', 'Courier New', 'Consolas', monospace",
  },

  // Font sizes
  sizes: {
    // Display sizes (hero headings)
    display: {
      sm: '3rem', // 48px
      md: '3.75rem', // 60px
      lg: '4.5rem', // 72px
    },

    // Heading sizes
    h1: '2.25rem', // 36px
    h2: '1.875rem', // 30px
    h3: '1.5rem', // 24px
    h4: '1.25rem', // 20px
    h5: '1.125rem', // 18px
    h6: '1rem', // 16px

    // Body sizes
    lg: '1.125rem', // 18px
    base: '1rem', // 16px
    sm: '0.875rem', // 14px
    xs: '0.75rem', // 12px
  },

  // Font weights
  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  // Line heights
  lineHeights: {
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },

  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

export type TypographyToken = typeof typography;
