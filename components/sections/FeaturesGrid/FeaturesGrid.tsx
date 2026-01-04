'use client';

/**
 * Features Grid Section - Modern Redesign
 * Clean feature showcase with icons and hover effects
 */

import { Shield, Clock, Award, CreditCard, Users, Sparkles } from 'lucide-react';
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
              <Card
                variant="default"
                padding="lg"
                hover
                hoverScale={1.03}
                className="h-full group"
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                  <feature.icon size={28} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Hover arrow */}
                <div className="flex items-center gap-2 text-primary-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn more</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
