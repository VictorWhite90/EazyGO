'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <>
      {/* Text Section - First */}
      <section className="bg-white pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8"
          >
            Skilled services are the new convenience
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl text-gray-600 mb-12 max-w-4xl mx-auto"
          >
            Find trusted artisans without the hassle. From plumbers to electricians, all you need is your location and a need.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-full transition-all min-w-[200px]">
              Get EazyGO
            </button>
            <button className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 text-lg font-semibold rounded-full transition-all min-w-[200px]">
              Earn with EazyGO
            </button>
          </motion.div>
        </div>
      </section>

      {/* Hero Image Section - Full Width */}
      <section className="w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative w-full h-[600px] lg:h-[700px]"
        >
          <Image
            src="/114e0aca-1ff9-4d33-9856-d5ae49bdc61c.jpg"
            alt="EazyGO Hero"
            fill
            draggable={false}
            className="object-cover object-center select-none pointer-events-none"
            priority
            onContextMenu={(e) => e.preventDefault()}
          />
        </motion.div>
      </section>
    </>
  );
}
