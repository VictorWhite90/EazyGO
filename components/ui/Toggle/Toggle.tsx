'use client';

/**
 * Toggle Component
 * Modern toggle switch for boolean states
 */

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

export interface ToggleProps {
  /**
   * Whether the toggle is checked
   */
  checked: boolean;

  /**
   * Callback when toggle state changes
   */
  onChange: (checked: boolean) => void;

  /**
   * Whether the toggle is disabled
   */
  disabled?: boolean;

  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Color variant
   * @default 'primary'
   */
  variant?: 'primary' | 'success';

  /**
   * Label for the toggle
   */
  label?: string;

  /**
   * Description text
   */
  description?: string;

  /**
   * Additional className
   */
  className?: string;
}

const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      checked,
      onChange,
      disabled = false,
      size = 'md',
      variant = 'primary',
      label,
      description,
      className,
    },
    ref
  ) => {
    // Size styles
    const sizeStyles = {
      sm: {
        track: 'w-10 h-5',
        thumb: 'w-4 h-4',
        translate: 'translate-x-5',
      },
      md: {
        track: 'w-12 h-6',
        thumb: 'w-5 h-5',
        translate: 'translate-x-6',
      },
      lg: {
        track: 'w-14 h-7',
        thumb: 'w-6 h-6',
        translate: 'translate-x-7',
      },
    };

    // Variant styles
    const variantStyles = {
      primary: checked ? 'bg-primary-600' : 'bg-neutral-300',
      success: checked ? 'bg-green-600' : 'bg-neutral-300',
    };

    const currentSize = sizeStyles[size];

    const handleToggle = () => {
      if (!disabled) {
        onChange(!checked);
      }
    };

    const toggleButton = (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleToggle}
        className={cn(
          // Base styles
          'relative inline-flex flex-shrink-0 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
          // Size
          currentSize.track,
          // Variant
          variantStyles[variant],
          // Disabled
          disabled && 'opacity-50 cursor-not-allowed',
          !disabled && 'cursor-pointer',
          className
        )}
      >
        <motion.span
          animate={{
            x: checked ? currentSize.translate.replace('translate-x-', '') : '0',
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
          className={cn(
            'inline-block bg-white rounded-full shadow-lg transform transition-transform',
            currentSize.thumb,
            'mt-0.5 ml-0.5'
          )}
        />
      </button>
    );

    // If no label, return just the toggle
    if (!label) {
      return toggleButton;
    }

    // With label, return full layout
    return (
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <label
            className={cn(
              'text-sm font-medium text-neutral-900',
              disabled && 'text-neutral-500'
            )}
          >
            {label}
          </label>
          {description && (
            <p className={cn('text-sm text-neutral-600 mt-1', disabled && 'text-neutral-400')}>
              {description}
            </p>
          )}
        </div>
        {toggleButton}
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';

export default Toggle;
