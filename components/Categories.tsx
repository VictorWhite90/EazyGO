'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Droplet, Home, Car, TreePine } from 'lucide-react';

const categories = [
  { image: '/plumber.jpg', name: 'Plumbing', count: '120+ artisans', color: 'bg-blue-100 text-blue-600' },
  { image: '/electrician.jpg', name: 'Electrical', count: '95+ artisans', color: 'bg-yellow-100 text-yellow-600' },
  { image: '/painter.jpg', name: 'Painting', count: '150+ artisans', color: 'bg-purple-100 text-purple-600' },
  { image: '/carpenter.jpg', name: 'Carpentry', count: '110+ artisans', color: 'bg-orange-100 text-orange-600' },
  { icon: Droplet, name: 'Cleaning', count: '200+ artisans', color: 'bg-cyan-100 text-cyan-600' },
  { icon: Home, name: 'Renovation', count: '80+ artisans', color: 'bg-red-100 text-red-600' },
  { icon: Car, name: 'Auto Repair', count: '65+ artisans', color: 'bg-gray-100 text-gray-600' },
  { icon: TreePine, name: 'Landscaping', count: '90+ artisans', color: 'bg-green-100 text-green-600' },
];

export default function Categories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Popular services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our most requested categories and find the perfect professional
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer"
            >
              <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col items-center text-center">
                {'image' in category && category.image ? (
                  <div className="w-16 h-16 rounded-xl overflow-hidden mb-4 group-hover:scale-110 transition-transform duration-300 relative">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={64}
                      height={64}
                      draggable={false}
                      className="object-cover w-full h-full select-none pointer-events-none"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </div>
                ) : 'icon' in category && category.icon ? (
                  <div className={`w-16 h-16 ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon size={32} />
                  </div>
                ) : null}
                <h3 className="text-lg font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count}</p>
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
          <button className="px-8 py-3 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold rounded-full transition-all">
            View all services
          </button>
        </motion.div>
      </div>
    </section>
  );
}
