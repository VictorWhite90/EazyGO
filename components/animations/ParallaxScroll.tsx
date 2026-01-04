'use client';

/**
 * ParallaxScroll Animation Wrapper
 * Creates parallax scrolling effect
 */

import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

export interface ParallaxScrollProps {
  /**
   * Content to animate
   */
  children: ReactNode;

  /**
   * Parallax speed multiplier
   * Positive values move slower than scroll (parallax)
   * Negative values move faster (reverse parallax)
   * @default 0.5
   */
  speed?: number;

  /**
   * Custom className
   */
  className?: string;
}

export default function ParallaxScroll({
  children,
  speed = 0.5,
  className,
}: ParallaxScrollProps) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Transform scroll progress to y position
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * -100}%`, `${speed * 100}%`]
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}
