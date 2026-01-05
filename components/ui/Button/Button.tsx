'use client';

/**
 * Button Component
 * Professional, accessible button with multiple variants and micro-interactions
 * Includes magnetic hover effect, ripple animation, and loading states
 */

import { forwardRef, useState, useRef, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { ButtonProps } from './Button.types';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      icon,
      iconPosition = 'left',
      loading = false,
      fullWidth = false,
      magneticEffect = false,
      hoverScale = 1.02,
      disableRipple = false,
      className,
      disabled,
      onClick,
      onDrag,
      onDragStart,
      onDragEnd,
      onAnimationStart,
      onAnimationEnd,
      ...props
    },
    ref
  ) => {
    // Explicitly exclude conflicting props - they're now destructured above and not spread to motion.button
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

    // Magnetic effect motion values
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springConfig = { damping: 20, stiffness: 300 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    // Variant styles
    const variantStyles = {
      primary:
        'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm hover:shadow-md',
      secondary:
        'bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700 shadow-sm hover:shadow-md',
      outline:
        'border-2 border-neutral-300 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400 active:bg-neutral-100',
      ghost:
        'text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200',
      glass:
        'glass-button text-neutral-900 hover:shadow-glass',
    };

    // Size styles
    const sizeStyles = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-2.5 text-base',
      lg: 'px-8 py-3.5 text-lg',
    };

    // Disabled/loading styles
    const disabledStyles = disabled || loading ? 'opacity-50 cursor-not-allowed' : '';

    // Handle magnetic effect
    const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
      if (!magneticEffect || disabled || loading) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      // Limit the magnetic effect to 10px
      x.set(Math.max(-10, Math.min(10, distanceX * 0.3)));
      y.set(Math.max(-10, Math.min(10, distanceY * 0.3)));
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    // Handle ripple effect
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      if (!disableRipple && !disabled && !loading) {
        const rect = e.currentTarget.getBoundingClientRect();
        const rippleX = e.clientX - rect.left;
        const rippleY = e.clientY - rect.top;
        const id = Date.now();

        setRipples((prev) => [...prev, { x: rippleX, y: rippleY, id }]);

        // Remove ripple after animation
        setTimeout(() => {
          setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
        }, 600);
      }

      onClick?.(e);
    };

    return (
      <motion.button
        ref={(node) => {
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          // @ts-ignore
          buttonRef.current = node;
        }}
        className={cn(
          // Base styles
          'relative inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 overflow-hidden',
          // Variant styles
          variantStyles[variant],
          // Size styles
          sizeStyles[size],
          // Disabled/loading styles
          disabledStyles,
          // Full width
          fullWidth && 'w-full',
          // Custom className
          className
        )}
        disabled={disabled || loading}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={!disabled && !loading ? { scale: hoverScale } : undefined}
        whileTap={!disabled && !loading ? { scale: 0.98 } : undefined}
        style={magneticEffect ? { x: springX, y: springY } : undefined}
        {...props}
      >
        {/* Ripple effect */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 pointer-events-none animate-ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 0,
              height: 0,
            }}
          />
        ))}

        {/* Loading spinner */}
        {loading && (
          <Loader2 className="animate-spin" size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />
        )}

        {/* Icon left */}
        {!loading && icon && iconPosition === 'left' && (
          <span className="flex-shrink-0">{icon}</span>
        )}

        {/* Content */}
        <span className="relative">{children}</span>

        {/* Icon right */}
        {!loading && icon && iconPosition === 'right' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
