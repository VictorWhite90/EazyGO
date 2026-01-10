'use client';

/**
 * Features Grid Section - Modern Redesign
 * Clean feature showcase with icons and hover effects
 */

import { Shield, Clock, Award, CreditCard, Users, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Card } from '@/components/ui/Card';
import { FadeIn } from '@/components/animations';

const features = [
  {
    icon: Shield,
    title: 'Verified Professionals',
    description: 'Every artisan is thoroughly vetted and background-checked for your peace of mind.',
    color: 'bg-primary-100 text-primary-600',
  },
  {
    icon: Award,
    title: 'Top-Rated Service',
    description: 'Browse reviews and ratings from real customers to find the best professionals.',
    color: 'bg-secondary-100 text-secondary-600',
  },
  {
    icon: Clock,
    title: 'Fast Booking',
    description: 'Book appointments in seconds with our streamlined booking process.',
    color: 'bg-success-100 text-success-600',
  },
  {
    icon: Users,
    title: 'Local Experts',
    description: 'Connect with skilled professionals in your area who know the local market.',
    color: 'bg-primary-100 text-primary-600',
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'Pay safely through our platform with buyer protection and secure transactions.',
    color: 'bg-neutral-100 text-neutral-600',
  },
  {
    icon: Sparkles,
    title: 'Quality Guaranteed',
    description: 'Satisfaction guarantee on all services with our quality assurance program.',
    color: 'bg-secondary-100 text-secondary-600',
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-24 bg-neutral-50 scroll-mt-20">
      <Container>
        <SectionHeader
          badge="Why choose us"
          title="Built for trust, speed, and convenience"
          subtitle="Everything you need to find and hire the perfect professional for your project"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FadeIn key={feature.title} delay={index * 0.1}>
              <motion.div
                className="h-full"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <Card
                  variant="default"
                  padding="lg"
                  hover
                  hoverScale={1.02}
                  className="h-full group relative overflow-hidden"
                >
                  {/* Animated background gradient on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-transparent opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="relative z-10">
                    {/* Icon with advanced animations */}
                    <motion.div
                      className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6`}
                      whileHover={{
                        scale: 1.15,
                        rotate: [0, -10, 10, -10, 0],
                      }}
                      transition={{
                        scale: { duration: 0.3 },
                        rotate: { duration: 0.5 },
                      }}
                    >
                      <feature.icon size={28} />
                    </motion.div>

                    {/* Content */}
                    <motion.h3
                      className="text-lg md:text-xl font-semibold text-neutral-900 mb-3"
                      initial={{ opacity: 1 }}
                      whileHover={{ opacity: 1, x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      {feature.title}
                    </motion.h3>
                    <p className="text-sm md:text-base text-neutral-600 leading-relaxed mb-4">
                      {feature.description}
                    </p>

                    {/* Learn more link - fades in after card on scroll */}
                    <motion.div
                      className="flex items-center gap-2 text-primary-600 font-medium text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                    >
                      <span>Learn more</span>
                      <motion.svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </motion.svg>
                    </motion.div>
                  </div>

                  {/* Corner accent that grows on hover */}
                  <motion.div
                    className="absolute top-0 right-0 w-20 h-20 bg-primary-500/10 rounded-bl-full"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Card>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
