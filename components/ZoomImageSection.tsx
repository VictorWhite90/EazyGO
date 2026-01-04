'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ZoomImageSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Transform scroll progress to scale (1 to 1.3)
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.3, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);

  return (
    <section ref={containerRef} className="relative h-screen bg-gray-900 overflow-hidden">
      <motion.div
        style={{ scale, opacity }}
        className="sticky top-0 w-full h-screen flex items-center justify-center"
      >
        {/* Placeholder for large zoom image */}
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-8xl mb-4">🚗</div>
            <p className="text-2xl font-semibold">Large Hero Image</p>
            <p className="text-gray-400 mt-2">Scales on scroll (Bolt effect)</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
