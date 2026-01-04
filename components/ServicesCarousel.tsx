'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const services = [
  {
    title: 'Plumbing',
    description: 'Expert plumbers for all your needs, delivered fast.',
    cta: 'Find plumbers',
    image: '/plumber.jpg',
    bgColor: 'bg-gray-900',
  },
  {
    title: 'Electrical work',
    description: 'Licensed electricians you can trust, ready to help.',
    cta: 'Find electricians',
    image: '/electrician.jpg',
    bgColor: 'bg-gray-800',
  },
  {
    title: 'Carpentry',
    description: 'Skilled carpenters for quality woodwork.',
    cta: 'Find carpenters',
    image: '/carpenter.jpg',
    bgColor: 'bg-blue-900',
  },
  {
    title: 'Painting',
    description: 'Professional painters to transform your space.',
    cta: 'Find painters',
    image: '/painter.jpg',
    bgColor: 'bg-purple-900',
  },
];

export default function ServicesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.offsetWidth;
      const newScrollLeft =
        direction === 'left'
          ? containerRef.current.scrollLeft - scrollAmount
          : containerRef.current.scrollLeft + scrollAmount;

      containerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });

      if (direction === 'left') {
        setCurrentIndex(Math.max(0, currentIndex - 1));
      } else {
        setCurrentIndex(Math.min(services.length - 1, currentIndex + 1));
      }
    }
  };

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Navigation Arrows */}
        <div className="flex justify-end gap-4 mb-8">
          <button
            onClick={() => scroll('left')}
            disabled={currentIndex === 0}
            className={`w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center transition-all ${
              currentIndex === 0
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:bg-gray-100 hover:border-gray-400'
            }`}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={currentIndex === services.length - 1}
            className={`w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center transition-all ${
              currentIndex === services.length - 1
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:bg-gray-100 hover:border-gray-400'
            }`}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Services Cards */}
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex-none w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start"
            >
              <div className="relative h-[500px] rounded-3xl overflow-hidden group cursor-pointer">
                {/* Background Image */}
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  draggable={false}
                  className="object-cover select-none pointer-events-none"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  onContextMenu={(e) => e.preventDefault()}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-3xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-200 mb-6 text-lg">{service.description}</p>
                  <button className="px-6 py-3 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-full transition-all">
                    {service.cta}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                if (containerRef.current) {
                  containerRef.current.scrollTo({
                    left: containerRef.current.offsetWidth * index,
                    behavior: 'smooth',
                  });
                }
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-green-600 w-8' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
