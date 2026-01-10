'use client';

/**
 * Services Section - Auto-Sliding Carousel
 * 9 service skills with image slider and overlay effects
 */

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { FadeIn } from '@/components/animations';

const services = [
  {
    title: 'Plumbing',
    image: '/plumber.jpg',
    description: 'Expert plumbers for all your water and pipe needs',
    professionals: '500+',
    position: 'left-bottom', // Text position
  },
  {
    title: 'Electrical',
    image: '/electrician.jpg',
    description: 'Licensed electricians for safe and reliable work',
    professionals: '450+',
    position: 'right-top',
  },
  {
    title: 'Carpentry',
    image: '/carpenter.jpg',
    description: 'Skilled carpenters for custom woodwork and repairs',
    professionals: '380+',
    position: 'center-middle',
  },
  {
    title: 'Painting',
    image: '/painter.jpg',
    description: 'Professional painters for interior and exterior projects',
    professionals: '420+',
    position: 'right-bottom',
  },
  {
    title: 'Masonry',
    image: '/plumber.jpg', // Reusing - replace with actual image
    description: 'Expert masons for bricklaying and construction',
    professionals: '320+',
    position: 'left-top',
  },
  {
    title: 'Welding',
    image: '/electrician.jpg', // Reusing - replace with actual image
    description: 'Professional welders for metalwork and fabrication',
    professionals: '280+',
    position: 'center-bottom',
  },
  {
    title: 'Roofing',
    image: '/carpenter.jpg', // Reusing - replace with actual image
    description: 'Certified roofers for installation and repairs',
    professionals: '350+',
    position: 'right-middle',
  },
  {
    title: 'Tiling',
    image: '/painter.jpg', // Reusing - replace with actual image
    description: 'Skilled tilers for floors and walls',
    professionals: '390+',
    position: 'left-middle',
  },
  {
    title: 'HVAC',
    image: '/plumber.jpg', // Reusing - replace with actual image
    description: 'Heating and cooling system specialists',
    professionals: '310+',
    position: 'center-top',
  },
];

// Position classes for text placement
const positionClasses = {
  'left-bottom': 'justify-end items-start',
  'right-bottom': 'justify-end items-end',
  'left-top': 'justify-start items-start',
  'right-top': 'justify-start items-end',
  'center-middle': 'justify-center items-center text-center',
  'center-bottom': 'justify-end items-center text-center',
  'center-top': 'justify-start items-center text-center',
  'left-middle': 'justify-center items-start',
  'right-middle': 'justify-center items-end',
};

export default function ServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showExplore, setShowExplore] = useState(false);

  // Auto-slide effect - longer viewing time per image
  useEffect(() => {
    const interval = setInterval(() => {
      setShowExplore(false); // Reset explore button
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 15000); // Change slide every 15 seconds for better readability

    return () => clearInterval(interval);
  }, []);

  // Show explore button after text animations complete
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowExplore(true);
    }, 2500); // Show after 2.5 seconds

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  const nextSlide = () => {
    setShowExplore(false);
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setShowExplore(false);
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <section className="py-16 sm:py-24 bg-white">
      <Container>
        <SectionHeader
          badge="Our Services"
          title="Find the perfect professional for any job"
          subtitle="Browse our most popular service categories and connect with verified experts"
        />

        {/* Image Carousel Slider */}
        <div className="relative h-[400px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              {/* Background Image */}
              <Image
                src={services[currentIndex].image}
                alt={services[currentIndex].title}
                fill
                className="object-cover"
                priority
              />

              {/* Transparent Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Content - dynamic positioning with proper spacing from arrows */}
              <div className={`absolute inset-0 flex flex-col p-8 sm:p-12 pl-20 sm:pl-24 pr-20 sm:pr-24 ${positionClasses[services[currentIndex].position as keyof typeof positionClasses]}`}>
                <div className="max-w-xl">
                  {/* Title - slides from left */}
                  <motion.h3
                    key={`title-${currentIndex}`}
                    initial={{ x: -60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6, type: 'spring', stiffness: 80 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3"
                  >
                    {services[currentIndex].title}
                  </motion.h3>

                  {/* Description - slides from right */}
                  <motion.p
                    key={`desc-${currentIndex}`}
                    initial={{ x: 60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6, type: 'spring', stiffness: 80 }}
                    className="text-white/90 text-base sm:text-lg mb-2"
                  >
                    {services[currentIndex].description}
                  </motion.p>

                  {/* Professional count - slides from bottom */}
                  <motion.p
                    key={`count-${currentIndex}`}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.6, type: 'spring', stiffness: 80 }}
                    className="text-white/70 text-sm sm:text-base mb-6"
                  >
                    {services[currentIndex].professionals} professionals available
                  </motion.p>

                  {/* Auto-fading Explore Button - fades from below */}
                  <AnimatePresence>
                    {showExplore && (
                      <motion.button
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ delay: 0.3, duration: 0.6, type: 'spring', stiffness: 90 }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-xl"
                      >
                        <span>Explore</span>
                        <ArrowRight size={18} />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-all z-10"
            aria-label="Previous slide"
          >
            <ArrowRight size={24} className="rotate-180 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-all z-10"
            aria-label="Next slide"
          >
            <ArrowRight size={24} className="text-white" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setShowExplore(false);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-white'
                    : 'w-2 bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Services CTA - Styled like Get Started button */}
        <FadeIn delay={0.5}>
          <div className="text-center mt-12">
            <a href="/auth/register">
              <motion.button
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>View all services</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowRight size={20} />
                </motion.div>
              </motion.button>
            </a>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
