'use client';

/**
 * Stats Section
 * Animated statistics with glassmorphism cards
 */

import { TrendingUp, Users, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { GlassCard } from '@/components/ui/Card';
import AnimatedCounter from '@/components/ui/AnimatedCounter/AnimatedCounter';
import { FadeIn } from '@/components/animations';

const stats = [
  {
    icon: Users,
    value: 10000,
    suffix: '+',
    label: 'Happy Customers',
    color: 'bg-primary-100 text-primary-600',
  },
  {
    icon: TrendingUp,
    value: 50000,
    suffix: '+',
    label: 'Jobs Completed',
    color: 'bg-success-100 text-success-600',
  },
  {
    icon: Star,
    value: 4.9,
    prefix: '',
    suffix: '/5',
    label: 'Average Rating',
    color: 'bg-secondary-100 text-secondary-600',
  },
  {
    icon: Zap,
    value: 15,
    suffix: ' min',
    label: 'Avg Response Time',
    color: 'bg-primary-100 text-primary-600',
  },
];

export default function StatsSection() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
        }} />
      </div>

      <Container className="relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Trusted by thousands
            </h2>
            <p className="text-xl text-primary-100">
              Join our growing community of satisfied customers
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <FadeIn key={stat.label} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <GlassCard
                  blur="lg"
                  opacity={0.15}
                  glassVariant="dark"
                  padding="lg"
                  hover
                  hoverScale={1.0}
                  className="text-center group relative overflow-hidden"
                >
                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-white/5 rounded-2xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="relative z-10">
                    {/* Icon with bounce animation */}
                    <motion.div
                      className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center mx-auto mb-4`}
                      whileHover={{
                        scale: 1.2,
                        rotate: [0, -15, 15, -15, 0],
                      }}
                      transition={{
                        scale: { duration: 0.3 },
                        rotate: { duration: 0.6 },
                      }}
                    >
                      <stat.icon size={28} />
                    </motion.div>

                    {/* Counter */}
                    <motion.div
                      className="text-4xl sm:text-5xl font-bold text-white mb-2"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AnimatedCounter
                        value={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        duration={2500}
                      />
                    </motion.div>

                    {/* Label */}
                    <p className="text-primary-100 font-medium">
                      {stat.label}
                    </p>
                  </div>

                  {/* Particle effect on hover */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.5, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                </GlassCard>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </Container>

      {/* Decorative blobs with animation */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-primary-900/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </section>
  );
}
