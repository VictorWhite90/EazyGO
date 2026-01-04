'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Clock, Star, MapPin, CreditCard, Users } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Verified Professionals',
    description: 'All artisans are background-checked and verified for your safety and peace of mind.',
  },
  {
    icon: Star,
    title: 'Top-Rated Service',
    description: 'Browse reviews and ratings from real customers to find the best professionals.',
  },
  {
    icon: Clock,
    title: 'Fast Booking',
    description: 'Book services in minutes and get matched with available artisans instantly.',
  },
  {
    icon: MapPin,
    title: 'Local Experts',
    description: 'Find skilled professionals in your area with our location-based matching.',
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'Pay safely with our escrow system. Money is released only after job completion.',
  },
  {
    icon: Users,
    title: 'Wide Selection',
    description: 'Access hundreds of skilled artisans across 50+ service categories.',
  },
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why choose{' '}
            <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              EazyGO
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We make it easy to find, book, and hire trusted professionals for any job
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white hover:from-green-50 hover:to-white transition-all duration-300 hover:shadow-xl border border-gray-100"
            >
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors duration-300">
                <feature.icon className="text-green-600 group-hover:text-white transition-colors duration-300" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
