'use client';

/**
 * How It Works Timeline - Modern Redesign
 * Vertical timeline with scroll animations
 */

import { Search, UserCheck, Calendar, CheckCircle } from 'lucide-react';
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

          {steps.map((step, index) => (
            <div key={step.number} className="relative mb-16 last:mb-0">
              <div className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                {/* Left side */}
                <SlideIn
                  direction={index % 2 === 0 ? 'left' : 'right'}
                  delay={index * 0.2}
                  className={index % 2 === 0 ? '' : 'md:order-2'}
                >
                  <div className={`${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                    <div className={`inline-flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <div className={`w-12 h-12 rounded-full ${step.color} text-white flex items-center justify-center font-bold text-lg`}>
                        {step.number}
                      </div>
                      <div className={`w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center`}>
                        <step.icon className="text-neutral-700" size={20} />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </SlideIn>

                {/* Center dot - visible on desktop */}
                <div className="hidden md:block absolute left-1/2 top-6 -translate-x-1/2">
                  <div className={`w-4 h-4 rounded-full ${step.color} border-4 border-white shadow-md`} />
                </div>

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
