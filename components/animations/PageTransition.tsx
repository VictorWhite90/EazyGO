'use client';

/**
 * Page Transition Wrapper
 * Smooth fade/slide transitions between page navigations
 */

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface PageTransitionProps {
  /**
   * Page content
   */
  children: ReactNode;

  /**
   * Transition variant
   * @default 'fade'
   */
  variant?: 'fade' | 'slide' | 'scale';

  /**
   * Custom className
   */
  className?: string;
}

const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
  },
};

export default function PageTransition({
  children,
  variant = 'fade',
  className = '',
}: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants[variant]}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
