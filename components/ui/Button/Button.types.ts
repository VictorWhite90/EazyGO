/**
 * Button Component - TypeScript Types
 */

import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'> {
  /**
   * Visual variant of the button
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * Size of the button
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * Button content
   */
  children: ReactNode;

  /**
   * Icon to display (left or right of text)
   */
  icon?: ReactNode;

  /**
   * Position of the icon
   * @default 'left'
   */
  iconPosition?: 'left' | 'right';

  /**
   * Loading state
   */
  loading?: boolean;

  /**
   * Full width button
   */
  fullWidth?: boolean;

  /**
   * Enable magnetic hover effect (cursor attraction)
   */
  magneticEffect?: boolean;

  /**
   * Custom hover scale value
   * @default 1.02
   */
  hoverScale?: number;

  /**
   * Disable ripple effect on click
   */
  disableRipple?: boolean;
}
