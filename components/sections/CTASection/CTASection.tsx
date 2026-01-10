'use client';

/**
 * CTA Section
 * Final call-to-action with glassmorphism
 */

import { ArrowRight, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/Card';
import { FadeIn } from '@/components/animations';

export default function CTASection() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-neutral-50 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
        }} />
      </div>

      <Container className="relative z-10">
        <FadeIn>
          <GlassCard
            blur="lg"
            opacity={0.8}
            padding="none"
            className="overflow-hidden"
          >
            <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
              {/* Left: Content */}
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
                  Ready to get started?
                </h2>
                <p className="text-lg sm:text-xl text-neutral-600 mb-8">
                  Join thousands of satisfied customers and find the perfect professional for your next project today.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/auth/register/client">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      animate={{
                        boxShadow: [
                          '0 10px 40px rgba(59, 130, 246, 0.3)',
                          '0 15px 50px rgba(59, 130, 246, 0.4)',
                          '0 10px 40px rgba(59, 130, 246, 0.3)',
                        ],
                      }}
                      transition={{
                        boxShadow: {
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        },
                      }}
                      className="rounded-xl"
                    >
                      <Button
                        variant="primary"
                        size="lg"
                        icon={<ArrowRight size={20} />}
                        iconPosition="right"
                        className="shadow-lg"
                      >
                        Find a professional
                      </Button>
                    </motion.div>
                  </Link>

                  <Link href="/auth/register/artisan">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        size="lg"
                        icon={<Briefcase size={20} />}
                      >
                        Join as an artisan
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </div>

              {/* Right: Stats or visual element */}
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                  {[
                    { value: '24/7', label: 'Support', color: 'primary' },
                    { value: '100%', label: 'Satisfaction', color: 'secondary' },
                    { value: '500+', label: 'Services', color: 'success' },
                    { value: '1M+', label: 'Connections', color: 'primary' },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className={`bg-${stat.color}-50 rounded-2xl p-6 text-center relative overflow-hidden`}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{
                        scale: 1.05,
                        y: -5,
                      }}
                    >
                      {/* Pulse effect */}
                      <motion.div
                        className={`absolute inset-0 bg-${stat.color}-200/30 rounded-2xl`}
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                      />

                      <div className="relative z-10">
                        <motion.div
                          className={`text-3xl font-bold text-${stat.color}-600 mb-1`}
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.2,
                          }}
                        >
                          {stat.value}
                        </motion.div>
                        <div className="text-sm text-neutral-600">{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </FadeIn>
      </Container>

      {/* Decorative blobs with animation */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-200/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"
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
