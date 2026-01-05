'use client';

/**
 * CTA Section
 * Final call-to-action with glassmorphism
 */

import { ArrowRight, Briefcase } from 'lucide-react';
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
                    <Button
                      variant="primary"
                      size="lg"
                      icon={<ArrowRight size={20} />}
                      iconPosition="right"
                    >
                      Find a professional
                    </Button>
                  </Link>

                  <Link href="/auth/register/artisan">
                    <Button
                      variant="outline"
                      size="lg"
                      icon={<Briefcase size={20} />}
                    >
                      Join as an artisan
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right: Stats or visual element */}
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                  <div className="bg-primary-50 rounded-2xl p-6 text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-1">
                      24/7
                    </div>
                    <div className="text-sm text-neutral-600">Support</div>
                  </div>

                  <div className="bg-secondary-50 rounded-2xl p-6 text-center">
                    <div className="text-3xl font-bold text-secondary-600 mb-1">
                      100%
                    </div>
                    <div className="text-sm text-neutral-600">Satisfaction</div>
                  </div>

                  <div className="bg-success-50 rounded-2xl p-6 text-center">
                    <div className="text-3xl font-bold text-success-600 mb-1">
                      500+
                    </div>
                    <div className="text-sm text-neutral-600">Services</div>
                  </div>

                  <div className="bg-primary-50 rounded-2xl p-6 text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-1">
                      1M+
                    </div>
                    <div className="text-sm text-neutral-600">Connections</div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </FadeIn>
      </Container>

      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-200/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
    </section>
  );
}
