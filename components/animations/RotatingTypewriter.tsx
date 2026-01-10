'use client';

/**
 * Rotating Typewriter Effect
 * Cycles through multiple texts with typewriter animation
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface RotatingTypewriterProps {
  /**
   * Array of texts to cycle through
   */
  texts: string[];

  /**
   * Typing speed in milliseconds
   * @default 80
   */
  typingSpeed?: number;

  /**
   * Pause between texts in milliseconds
   * @default 2000
   */
  pauseDuration?: number;

  /**
   * Custom className
   */
  className?: string;
}

export default function RotatingTypewriter({
  texts,
  typingSpeed = 80,
  pauseDuration = 2000,
  className = '',
}: RotatingTypewriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentText = texts[currentTextIndex];

    if (isTyping) {
      // Typing phase
      if (displayedText.length < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, pause
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, pauseDuration);
        return () => clearTimeout(timeout);
      }
    } else {
      // Deleting phase
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, typingSpeed / 2);
        return () => clearTimeout(timeout);
      } else {
        // Move to next text
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        setIsTyping(true);
      }
    }
  }, [displayedText, isTyping, currentTextIndex, texts, typingSpeed, pauseDuration]);

  return (
    <span className={className}>
      {displayedText}
      <motion.span
        className="inline-block w-0.5 h-[0.9em] bg-primary-600 ml-1"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      />
    </span>
  );
}
