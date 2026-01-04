'use client';

/**
 * Badge Component
 * Small status indicators and labels
 */

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral' | 'glass';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Visual variant
   * @default 'neutral'
   */
  variant?: BadgeVariant;

  /**
   * Size
   * @default 'md'
   */
  size?: BadgeSize;

  /**
   * Badge content
   */
  children: ReactNode;

  /**
   * Optional icon
   */
  icon?: ReactNode;

  /**
   * Dot indicator
   */
  dot?: boolean;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'neutral',
      size = 'md',
      children,
      icon,
      dot = false,
      className,
      ...props
    },
    ref
  ) => {
    // Variant styles
    const variantStyles = {
      primary: 'bg-primary-100 text-primary-700 border-primary-200',
      secondary: 'bg-secondary-100 text-secondary-700 border-secondary-200',
      success: 'bg-success-100 text-success-700 border-success-200',
      warning: 'bg-warning-100 text-warning-700 border-warning-200',
      error: 'bg-error-100 text-error-700 border-error-200',
      neutral: 'bg-neutral-100 text-neutral-700 border-neutral-200',
      glass: 'glass-button text-neutral-900',
    };

    // Size styles
    const sizeStyles = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base',
    };

    // Dot color
    const dotColors = {
      primary: 'bg-primary-500',
      secondary: 'bg-secondary-500',
      success: 'bg-success-500',
      warning: 'bg-warning-500',
      error: 'bg-error-500',
      neutral: 'bg-neutral-500',
      glass: 'bg-neutral-900',
    };

    return (
      <span
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center gap-1.5 font-medium rounded-full border transition-colors',
          // Variant styles
          variantStyles[variant],
          // Size styles
          sizeStyles[size],
          // Custom className
          className
        )}
        {...props}
      >
        {/* Dot indicator */}
        {dot && (
          <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />
        )}

        {/* Icon */}
        {icon && <span className="flex-shrink-0">{icon}</span>}

        {/* Content */}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
