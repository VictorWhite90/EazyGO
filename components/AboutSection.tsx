'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-32 bg-green-600 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white/90 text-lg mb-4 font-medium">About us</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            EazyGO is the first artisan marketplace super-app.
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            We're making cities work better for people, offering convenient access to skilled
            professionals for every need — including plumbing, electrical work, carpentry, and home services.
          </p>
          <button className="px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-full transition-all text-lg">
            Our mission
          </button>
        </motion.div>
      </div>

      {/* Phone Mockup Image Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="max-w-2xl mx-auto mt-16 px-6"
      >
        <div className="relative h-[400px] bg-white/10 rounded-3xl backdrop-blur-sm flex items-center justify-center">
          <p className="text-white text-lg">Phone mockup image placeholder</p>
        </div>
      </motion.div>
    </section>
  );
}
