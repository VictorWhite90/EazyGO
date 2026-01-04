'use client';

/**
 * SlideIn Animation Wrapper
 * Slides content in from specified direction on scroll
 */

import { ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
  slideInFromBottom,
  reducedMotionVariants,
} from '@/lib/animations/variants';

export type SlideDirection = 'left' | 'right' | 'top' | 'bottom';

export interface SlideInProps {
  /**
   * Content to animate
   */
  children: ReactNode;

  /**
   * Slide direction
   * @default 'left'
   */
  direction?: SlideDirection;

  /**
   * Animation delay (in seconds)
   * @default 0
   */
  delay?: number;

  /**
   * Animation duration (in seconds)
   * @default 0.6
   */
  duration?: number;

  /**
   * Only animate once
   * @default true
   */
  once?: boolean;

  /**
   * Trigger animation when this percentage of element is in view
   * @default 0.1
   */
  amount?: number;

  /**
   * Custom className
   */
  className?: string;
}

export default function SlideIn({
  children,
  direction = 'left',
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.1,
  className,
}: SlideInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  // Choose variant based on direction
  const variants = {
    left: slideInFromLeft,
    right: slideInFromRight,
    top: slideInFromTop,
    bottom: slideInFromBottom,
  };

  return (
    <motion.div
      ref={ref}
      variants={reducedMotionVariants(variants[direction])}
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
