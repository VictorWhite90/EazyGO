'use client';

/**
 * Card Component
 * Versatile card component with multiple variants and hover effects
 */

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { CardProps } from './Card.types';

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      children,
      hover = false,
      hoverScale = 1.02,
      className,
      onDrag,
      onDragStart,
      onDragEnd,
      onAnimationStart,
      onAnimationEnd,
      ...props
    },
    ref
  ) => {
    // Variant styles
    const variantStyles = {
      default: 'bg-white border border-neutral-200 shadow-soft',
      elevated: 'bg-white shadow-soft-lg',
      bordered: 'bg-white border-2 border-neutral-300',
      glass: 'glass-card',
    };

    // Padding styles
    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const Component = hover ? motion.div : 'div';

    const hoverProps = hover
      ? {
          whileHover: {
            y: -8,
            scale: hoverScale,
            transition: {
              duration: 0.3,
              ease: 'easeOut',
            },
          },
        }
      : {};

    return (
      <Component
        ref={ref}
        className={cn(
          // Base styles
          'rounded-2xl transition-all duration-300',
          // Variant styles
          variantStyles[variant],
          // Padding styles
          paddingStyles[padding],
          // Hover effect
          hover && 'cursor-pointer hover:shadow-xl',
          // Custom className
          className
        )}
        {...hoverProps}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';

export default Card;
