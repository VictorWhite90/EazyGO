'use client';

/**
 * Input Component
 * Professional input field with floating label, icons, and error states
 */

import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { InputProps } from './Input.types';

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      icon,
      iconPosition = 'left',
      floatingLabel = false,
      fullWidth = false,
      className,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      props.onBlur?.(e);
    };

    const showFloatingLabel = floatingLabel && (isFocused || hasValue);

    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {/* Static label (non-floating) */}
        {label && !floatingLabel && (
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            {label}
          </label>
        )}

        {/* Input container */}
        <div className="relative">
          {/* Icon left */}
          {icon && iconPosition === 'left' && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
              {icon}
            </div>
          )}

          {/* Input field */}
          <input
            ref={ref}
            className={cn(
              // Base styles
              'w-full px-4 py-3 rounded-lg border transition-all duration-200',
              'bg-white text-neutral-900 placeholder:text-neutral-400',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              // Border states
              error
                ? 'border-error-300 focus:border-error-500 focus:ring-error-500/20'
                : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500/20',
              // Icon spacing
              icon && iconPosition === 'left' && 'pl-11',
              icon && iconPosition === 'right' && 'pr-11',
              // Floating label spacing
              floatingLabel && 'pt-6 pb-2',
              // Disabled state
              props.disabled && 'opacity-50 cursor-not-allowed bg-neutral-50',
              // Custom className
              className
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />

          {/* Floating label */}
          {label && floatingLabel && (
            <motion.label
              className={cn(
                'absolute left-4 pointer-events-none transition-all duration-200',
                showFloatingLabel
                  ? 'top-2 text-xs text-primary-600'
                  : 'top-1/2 -translate-y-1/2 text-base text-neutral-400'
              )}
              animate={{
                y: showFloatingLabel ? 0 : '-50%',
                scale: showFloatingLabel ? 0.85 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.label>
          )}

          {/* Icon right */}
          {icon && iconPosition === 'right' && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
              {icon}
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-sm text-error-600 flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </motion.p>
        )}

        {/* Hint text */}
        {hint && !error && (
          <p className="mt-1.5 text-sm text-neutral-500">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
