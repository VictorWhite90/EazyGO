'use client';

/**
 * Services Section
 * Showcase of available services with image overlays
 */

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { FadeIn } from '@/components/animations';

const services = [
  {
    title: 'Plumbing',
    image: '/plumber.jpg',
    description: 'Expert plumbers for all your water and pipe needs',
    professionals: '500+',
  },
  {
    title: 'Electrical',
    image: '/electrician.jpg',
    description: 'Licensed electricians for safe and reliable work',
    professionals: '450+',
  },
  {
    title: 'Carpentry',
    image: '/carpenter.jpg',
    description: 'Skilled carpenters for custom woodwork and repairs',
    professionals: '380+',
  },
  {
    title: 'Painting',
    image: '/painter.jpg',
    description: 'Professional painters for interior and exterior projects',
    professionals: '420+',
  },
];

export default function ServicesSection() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <SectionHeader
          badge="Our Services"
          title="Find the perfect professional for any job"
          subtitle="Browse our most popular service categories and connect with verified experts"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <FadeIn key={service.title} delay={index * 0.1}>
              <motion.div
                className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-soft"
              >
                {/* Background Image */}
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  draggable={false}
                  className="object-cover select-none pointer-events-none"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  onContextMenu={(e) => e.preventDefault()}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {service.professionals} professionals
                    </p>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* View All Services CTA */}
        <FadeIn delay={0.5}>
          <div className="text-center mt-12">
            <button className="group inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-full transition-all hover:shadow-lg">
              <span>View all services</span>
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
