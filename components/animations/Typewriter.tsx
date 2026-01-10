'use client';

/**
 * Typewriter Effect Component
 * Types out text character by character with cursor
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export interface TypewriterProps {
  /**
   * Text to type out
   */
  text: string;

  /**
   * Typing speed in milliseconds
   * @default 50
   */
  speed?: number;

  /**
   * Delay before starting
   * @default 0
   */
  delay?: number;

  /**
   * Show blinking cursor
   * @default true
   */
  showCursor?: number;

  /**
   * Custom className
   */
  className?: string;

  /**
   * Callback when typing completes
   */
  onComplete?: () => void;
}

export default function Typewriter({
  text,
  speed = 50,
  delay = 0,
  showCursor = true,
  className = '',
  onComplete,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex === 0 && delay > 0) {
      const delayTimeout = setTimeout(() => {
        setCurrentIndex(1);
      }, delay);
      return () => clearTimeout(delayTimeout);
    }

    if (currentIndex > 0 && currentIndex <= text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex));
        setCurrentIndex(currentIndex + 1);

        if (currentIndex === text.length) {
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && !isComplete && (
        <motion.span
          className="inline-block w-0.5 h-[1em] bg-current ml-1"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </span>
  );
}
