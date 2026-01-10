'use client';

/**
 * How It Works Timeline - Modern Redesign
 * Vertical timeline with scroll animations
 */

import { Search, UserCheck, Calendar, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { FadeIn, SlideIn } from '@/components/animations';

const steps = [
  {
    number: 1,
    icon: Search,
    title: 'Search for services',
    description: 'Tell us what you need help with and your location. Browse through verified professionals in your area.',
    color: 'bg-primary-500',
  },
  {
    number: 2,
    icon: UserCheck,
    title: 'Choose your professional',
    description: 'Compare profiles, read reviews, and select the best professional for your specific needs.',
    color: 'bg-secondary-500',
  },
  {
    number: 3,
    icon: Calendar,
    title: 'Book & schedule',
    description: 'Pick a convenient time slot and confirm your booking. Get instant confirmation and reminders.',
    color: 'bg-success-500',
  },
  {
    number: 4,
    icon: CheckCircle,
    title: 'Get it done',
    description: 'Your professional arrives on time and completes the job. Rate your experience when finished.',
    color: 'bg-primary-500',
  },
];

export default function HowItWorksTimeline() {
  return (
    <section id="how-it-works" className="py-24 bg-white scroll-mt-20">
      <Container>
        <SectionHeader
          badge="Simple process"
          title="How it works"
          subtitle="Get connected with skilled professionals in 4 simple steps"
        />

        <div className="relative max-w-3xl mx-auto mt-16">
          {/* Center timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-neutral-200 -translate-x-1/2 hidden md:block" />

          {/* Animated timeline line overlay */}
          <motion.div
            className="absolute left-1/2 top-0 w-0.5 bg-gradient-to-b from-primary-500 to-secondary-500 -translate-x-1/2 hidden md:block"
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />

          {steps.map((step, index) => (
            <div key={step.number} className="relative mb-16 last:mb-0">
              <div className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                {/* Left side */}
                <SlideIn
                  direction={index % 2 === 0 ? 'left' : 'right'}
                  delay={index * 0.2}
                  className={index % 2 === 0 ? '' : 'md:order-2'}
                >
                  <motion.div
                    className={`${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'} border-l-4 border-b-4 border-primary-600 pl-6 pb-6`}
                    whileHover={{ x: index % 2 === 0 ? -5 : 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`inline-flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <motion.div
                        className={`w-12 h-12 rounded-full ${step.color} text-white flex items-center justify-center font-bold text-lg shadow-lg`}
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2, type: 'spring', stiffness: 200 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {step.number}
                      </motion.div>
                      <motion.div
                        className={`w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center`}
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <step.icon className="text-neutral-700" size={20} />
                      </motion.div>
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </SlideIn>

                {/* Center dot - visible on desktop */}
                <motion.div
                  className="hidden md:block absolute left-1/2 top-6 -translate-x-1/2 z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, type: 'spring', stiffness: 200 }}
                >
                  <motion.div
                    className={`w-4 h-4 rounded-full ${step.color} border-4 border-white shadow-md`}
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(59, 130, 246, 0.4)',
                        '0 0 0 10px rgba(59, 130, 246, 0)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />
                </motion.div>

                {/* Right side - empty on desktop for alternating layout */}
                <div className={index % 2 === 0 ? 'md:order-2' : ''} />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
