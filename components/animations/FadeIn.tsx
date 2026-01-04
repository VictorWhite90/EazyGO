'use client';

/**
 * FadeIn Animation Wrapper
 * Reveals content with fade animation on scroll
 */

import { ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeIn, fadeInUp, reducedMotionVariants } from '@/lib/animations/variants';

export interface FadeInProps {
  /**
   * Content to animate
   */
  children: ReactNode;

  /**
   * Animation direction
   * @default 'none'
   */
  direction?: 'up' | 'down' | 'none';

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

export default function FadeIn({
  children,
  direction = 'none',
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.1,
  className,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  // Choose variant based on direction
  const variant = direction === 'up' ? fadeInUp : fadeIn;

  return (
    <motion.div
      ref={ref}
      variants={reducedMotionVariants(variant)}
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
