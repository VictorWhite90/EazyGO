/**
 * Input Component - TypeScript Types
 */

import { InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Label text
   */
  label?: string;

  /**
   * Error message
   */
  error?: string;

  /**
   * Hint/helper text
   */
  hint?: string;

  /**
   * Icon element
   */
  icon?: ReactNode;

  /**
   * Icon position
   * @default 'left'
   */
  iconPosition?: 'left' | 'right';

  /**
   * Enable floating label animation
   */
  floatingLabel?: boolean;

  /**
   * Full width input
   */
  fullWidth?: boolean;
}
