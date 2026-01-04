/**
 * Card Component - TypeScript Types
 */

import { HTMLAttributes, ReactNode } from 'react';

export type CardVariant = 'default' | 'elevated' | 'bordered' | 'glass';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant of the card
   * @default 'default'
   */
  variant?: CardVariant;

  /**
   * Padding inside the card
   * @default 'md'
   */
  padding?: CardPadding;

  /**
   * Card content
   */
  children: ReactNode;

  /**
   * Enable hover lift effect
   */
  hover?: boolean;

  /**
   * Custom hover scale value
   * @default 1.02
   */
  hoverScale?: number;
}

export interface GlassCardProps extends Omit<CardProps, 'variant'> {
  /**
   * Blur intensity
   * @default 'md'
   */
  blur?: 'sm' | 'md' | 'lg';

  /**
   * Background opacity (0-1)
   * @default 0.7
   */
  opacity?: number;

  /**
   * Glass variant (light or dark)
   * @default 'light'
   */
  glassVariant?: 'light' | 'dark';

  /**
   * Show border
   * @default true
   */
  border?: boolean;
}
