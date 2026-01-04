'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, UserCheck, Calendar, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Search for services',
    description: 'Tell us what you need and where you are located',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: UserCheck,
    title: 'Choose your professional',
    description: 'Browse verified artisans, compare ratings and reviews',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Calendar,
    title: 'Book & schedule',
    description: 'Pick a time that works for you and confirm the booking',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: CheckCircle,
    title: 'Get it done',
    description: 'Your artisan arrives on time and completes the job professionally',
    color: 'from-green-500 to-green-600',
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How it works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get connected with skilled artisans in 4 simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent z-0" />
              )}

              <div className="relative z-10 text-center">
                <div className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <step.icon className="text-white" size={40} />
                </div>
                <div className="absolute top-0 right-0 w-10 h-10 bg-white border-4 border-green-500 rounded-full flex items-center justify-center font-bold text-green-600 shadow-md">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition-all transform hover:scale-105 shadow-lg">
            Get started now
          </button>
        </motion.div>
      </div>
    </section>
  );
}
