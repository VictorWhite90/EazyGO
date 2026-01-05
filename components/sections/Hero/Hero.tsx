'use client';

/**
 * Hero Section - Modern Redesign
 * Professional, trust-building hero with glassmorphism and micro-interactions
 */

import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, Shield, Clock, Star } from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { GlassCard } from '@/components/ui/Card';
import { FadeIn, SlideIn } from '@/components/animations';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 overflow-hidden pb-12">
      {/* Animated grid pattern background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
        }} />
      </div>

      <Container className="relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div>
            <FadeIn delay={0.1}>
              <Badge variant="glass" size="md" className="mb-6" icon={<Shield size={16} />}>
                Trusted by 10,000+ customers
              </Badge>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-tight">
                Connect with skilled artisans,
                <span className="text-primary-600"> instantly</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-xl sm:text-2xl text-neutral-600 mb-8 leading-relaxed">
                From plumbers to electricians, find verified professionals in your area. Book in seconds and get help.
              </p>
            </FadeIn>

            {/* CTA Buttons */}
            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/auth/register/client">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight size={20} />}
                    iconPosition="right"
                  >
                    Find an artisan
                  </Button>
                </Link>

                <Link href="/auth/register/artisan">
                  <Button
                    variant="glass"
                    size="lg"
                    icon={<Briefcase size={20} />}
                  >
                    Become an artisan
                  </Button>
                </Link>
              </div>
            </FadeIn>

            {/* Trust indicators */}
            <FadeIn delay={0.5}>
              <div className="grid grid-cols-3 gap-6 sm:gap-8">
                <div>
                  <div className="flex items-center gap-1 text-3xl sm:text-4xl font-bold text-neutral-900 mb-1">
                    <Star className="text-secondary-500 fill-secondary-500" size={28} />
                    <span>4.9</span>
                  </div>
                  <div className="text-sm text-neutral-600">Average rating</div>
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-1">
                    50K+
                  </div>
                  <div className="text-sm text-neutral-600">Jobs completed</div>
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-1">
                    15min
                  </div>
                  <div className="text-sm text-neutral-600">Avg. response</div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right: Interactive visual */}
          <SlideIn direction="right" delay={0.3}>
            <div className="relative hidden lg:block">
              {/* Main glass card */}
              <GlassCard
                blur="lg"
                opacity={0.7}
                padding="lg"
                className="relative"
              >
                <div className="space-y-6">
                  {/* Search preview */}
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                      Find a service
                    </h3>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="What do you need help with?"
                        className="w-full px-4 py-3 bg-white/50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Quick service options */}
                  <div className="grid grid-cols-2 gap-3">
                    {['Plumbing', 'Electrical', 'Carpentry', 'Painting'].map((service, i) => (
                      <motion.button
                        key={service}
                        className="px-4 py-3 bg-white/60 hover:bg-white/80 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                      >
                        {service}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </GlassCard>

              {/* Floating mini cards */}
              <motion.div
                className="absolute -top-4 -right-4 hidden lg:block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <GlassCard
                  blur="md"
                  opacity={0.9}
                  padding="sm"
                  className="flex items-center gap-2 shadow-lg"
                >
                  <div className="w-10 h-10 rounded-full bg-success-100 flex items-center justify-center">
                    <Shield className="text-success-600" size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-neutral-900">Verified</div>
                    <div className="text-xs text-neutral-600">All pros vetted</div>
                  </div>
                </GlassCard>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 hidden lg:block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <GlassCard
                  blur="md"
                  opacity={0.9}
                  padding="sm"
                  className="flex items-center gap-2 shadow-lg"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <Clock className="text-primary-600" size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-neutral-900">Fast</div>
                    <div className="text-xs text-neutral-600">Quick response</div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </SlideIn>
        </div>
      </Container>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl"
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

      <motion.div
        className="absolute bottom-20 left-10 w-96 h-96 bg-secondary-200/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </section>
  );
}
