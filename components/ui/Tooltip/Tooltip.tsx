'use client';

/**
 * Tooltip Component
 * Accessible tooltip with multiple positions
 */

import { forwardRef, HTMLAttributes, ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  /**
   * Tooltip content
   */
  content: ReactNode;

  /**
   * Element that triggers the tooltip
   */
  children: ReactNode;

  /**
   * Tooltip position
   * @default 'top'
   */
  position?: TooltipPosition;

  /**
   * Delay before showing tooltip (ms)
   * @default 200
   */
  delay?: number;
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      children,
      position = 'top',
      delay = 200,
      className,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
      const id = setTimeout(() => setIsVisible(true), delay);
      setTimeoutId(id);
    };

    const handleMouseLeave = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      setIsVisible(false);
    };

    // Position styles
    const positionStyles = {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    // Animation variants
    const variants = {
      initial: {
        opacity: 0,
        scale: 0.95,
        y: position === 'top' ? 5 : position === 'bottom' ? -5 : 0,
        x: position === 'left' ? 5 : position === 'right' ? -5 : 0,
      },
      animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        x: 0,
      },
      exit: {
        opacity: 0,
        scale: 0.95,
      },
    };

    return (
      <div
        ref={ref}
        className={cn('relative inline-flex', className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}

        <AnimatePresence>
          {isVisible && (
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.15 }}
              className={cn(
                'absolute z-50 px-3 py-1.5 text-sm text-white bg-neutral-900 rounded-lg shadow-lg whitespace-nowrap pointer-events-none',
                positionStyles[position]
              )}
            >
              {content}
              {/* Arrow */}
              <div
                className={cn(
                  'absolute w-2 h-2 bg-neutral-900 rotate-45',
                  position === 'top' && 'bottom-[-4px] left-1/2 -translate-x-1/2',
                  position === 'bottom' && 'top-[-4px] left-1/2 -translate-x-1/2',
                  position === 'left' && 'right-[-4px] top-1/2 -translate-y-1/2',
                  position === 'right' && 'left-[-4px] top-1/2 -translate-y-1/2'
                )}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;
