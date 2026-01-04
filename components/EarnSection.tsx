'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function EarnSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            className="relative h-[500px] bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl overflow-hidden"
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-7xl mb-4">👷</div>
                <p className="text-gray-600 text-lg">Artisan image placeholder</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-green-600 text-lg mb-4 font-medium">Earn money as an artisan</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Work and earn money
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Our 1000+ clients will send you plenty of service requests. When demand is
              high, you can earn even more.
            </p>
            <button className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition-all text-lg">
              Register as artisan
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
