'use client';

/**
 * GlassCard Component
 * Professional glassmorphism card with blur and transparency effects
 */

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { GlassCardProps } from './Card.types';

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      blur = 'md',
      opacity = 0.7,
      glassVariant = 'light',
      border = true,
      padding = 'md',
      children,
      hover = false,
      hoverScale = 1.02,
      className,
      style,
      onDrag,
      onDragStart,
      onDragEnd,
      onAnimationStart,
      onAnimationEnd,
      ...props
    },
    ref
  ) => {
    // Blur styles
    const blurClasses = {
      sm: 'backdrop-blur-sm',
      md: 'backdrop-blur-md',
      lg: 'backdrop-blur-lg',
    };

    // Variant styles
    const variantStyles = {
      light: border ? 'border border-white/20' : '',
      dark: border ? 'border border-white/10' : '',
    };

    // Padding styles
    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    // Background color based on variant and opacity
    const backgroundColor =
      glassVariant === 'light'
        ? `rgba(255, 255, 255, ${opacity})`
        : `rgba(0, 0, 0, ${opacity * 0.5})`; // Dark variant uses half opacity

    const Component = hover ? motion.div : 'div';

    const hoverProps = hover
      ? {
          whileHover: {
            y: -8,
            scale: hoverScale,
            backgroundColor:
              glassVariant === 'light'
                ? `rgba(255, 255, 255, ${Math.min(opacity + 0.1, 1)})`
                : `rgba(0, 0, 0, ${Math.min(opacity * 0.5 + 0.1, 1)})`,
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
          'rounded-2xl shadow-glass transition-all duration-300',
          // Blur
          blurClasses[blur],
          // Variant styles
          variantStyles[glassVariant],
          // Padding
          paddingStyles[padding],
          // Hover effect
          hover && 'cursor-pointer hover:shadow-glass-lg',
          // Custom className
          className
        )}
        style={{
          backgroundColor,
          ...style,
        }}
        {...hoverProps}
        {...(props as any)}
      >
        {children}
      </Component>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;
