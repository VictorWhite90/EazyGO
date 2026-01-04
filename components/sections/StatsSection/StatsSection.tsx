'use client';

/**
 * Stats Section
 * Animated statistics with glassmorphism cards
 */

import { TrendingUp, Users, Star, Zap } from 'lucide-react';
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
              <GlassCard
                blur="lg"
                opacity={0.15}
                glassVariant="dark"
                padding="lg"
                hover
                hoverScale={1.05}
                className="text-center group"
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110`}>
                  <stat.icon size={28} />
                </div>

                {/* Counter */}
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2500}
                  />
                </div>

                {/* Label */}
                <p className="text-primary-100 font-medium">
                  {stat.label}
                </p>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </Container>

      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-900/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
    </section>
  );
}
