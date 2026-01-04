'use client';

/**
 * Pricing Section - Modern Redesign
 * Clean pricing cards with glassmorphism and hover effects
 */

import { Check, Zap, Crown, Building2 } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FadeIn } from '@/components/animations';

const pricingTiers = [
  {
    name: 'Basic',
    icon: Zap,
    price: '0',
    period: 'Forever free',
    description: 'Perfect for trying out our platform',
    features: [
      'Browse all services',
      'View artisan profiles',
      'Read reviews and ratings',
      'Basic search filters',
      'Customer support',
    ],
    cta: 'Get started',
    variant: 'outline' as const,
    popular: false,
  },
  {
    name: 'Pro',
    icon: Crown,
    price: '9.99',
    period: 'per month',
    description: 'Best for regular users',
    features: [
      'Everything in Basic',
      'Priority booking',
      'Advanced search filters',
      'Save favorite artisans',
      'Booking history & analytics',
      'Priority customer support',
      '5% discount on all bookings',
    ],
    cta: 'Start free trial',
    variant: 'primary' as const,
    popular: true,
  },
  {
    name: 'Business',
    icon: Building2,
    price: '29.99',
    period: 'per month',
    description: 'For businesses and property managers',
    features: [
      'Everything in Pro',
      'Unlimited bookings',
      'Team account management',
      'Bulk booking discounts',
      'Dedicated account manager',
      'Custom invoicing',
      'API access',
      '15% discount on all bookings',
    ],
    cta: 'Contact sales',
    variant: 'outline' as const,
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-white scroll-mt-20">
      <Container>
        <SectionHeader
          badge="Pricing"
          title="Choose the plan that fits your needs"
          subtitle="Transparent pricing with no hidden fees. Upgrade, downgrade, or cancel anytime."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <FadeIn key={tier.name} delay={index * 0.1}>
              <Card
                variant="default"
                padding="none"
                hover
                hoverScale={1.03}
                className={`h-full relative overflow-hidden ${
                  tier.popular ? 'ring-2 ring-primary-500 shadow-glow' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 m-4">
                    <Badge variant="primary" size="sm">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="p-8">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl ${
                    tier.popular ? 'bg-primary-100' : 'bg-neutral-100'
                  } flex items-center justify-center mb-6`}>
                    <tier.icon
                      size={24}
                      className={tier.popular ? 'text-primary-600' : 'text-neutral-600'}
                    />
                  </div>

                  {/* Tier name */}
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                    {tier.name}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-600 mb-6">
                    {tier.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold text-neutral-900">
                        ${tier.price}
                      </span>
                      <span className="text-neutral-600">
                        /{tier.period}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant={tier.variant}
                    size="lg"
                    fullWidth
                    magneticEffect={tier.popular}
                    hoverScale={tier.popular ? 1.05 : undefined}
                    className="mb-8"
                  >
                    {tier.cta}
                  </Button>

                  {/* Features */}
                  <div className="space-y-4">
                    <div className="text-sm font-semibold text-neutral-900 mb-3">
                      What's included:
                    </div>
                    {tier.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full ${
                          tier.popular ? 'bg-primary-100' : 'bg-neutral-100'
                        } flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <Check
                            size={14}
                            className={tier.popular ? 'text-primary-600' : 'text-neutral-600'}
                          />
                        </div>
                        <span className="text-neutral-700 text-sm leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom accent for popular tier */}
                {tier.popular && (
                  <div className="h-1 bg-gradient-to-r from-primary-500 to-primary-600" />
                )}
              </Card>
            </FadeIn>
          ))}
        </div>

        {/* Additional info */}
        <FadeIn delay={0.4}>
          <div className="mt-12 text-center">
            <p className="text-neutral-600 mb-4">
              All plans include secure payments, verified artisans, and satisfaction guarantee
            </p>
            <p className="text-sm text-neutral-500">
              Need a custom plan? <a href="#support" className="text-primary-600 hover:text-primary-700 font-medium">Contact us</a>
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
