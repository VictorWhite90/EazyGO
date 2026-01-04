'use client';

/**
 * Testimonials Section
 * Customer reviews carousel
 */

import { Star } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { FadeIn } from '@/components/animations';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Homeowner',
    avatar: '',
    initials: 'SJ',
    rating: 5,
    text: 'Found an excellent plumber within minutes! The booking process was seamless, and the professional arrived right on time. Highly recommend EazyGO for anyone needing home services.',
  },
  {
    name: 'Michael Chen',
    role: 'Business Owner',
    avatar: '',
    initials: 'MC',
    rating: 5,
    text: 'As a business owner, I need reliable contractors fast. EazyGO has been a game-changer. The quality of professionals and the ease of booking is unmatched.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Property Manager',
    avatar: '',
    initials: 'ER',
    rating: 5,
    text: 'Managing multiple properties means I need trustworthy artisans quickly. EazyGO delivers every time. The verification process gives me peace of mind.',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <SectionHeader
          badge="Testimonials"
          title="Loved by thousands of customers"
          subtitle="See what our customers have to say about their experience"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={testimonial.name} delay={index * 0.1}>
              <Card
                variant="default"
                padding="lg"
                hover
                className="h-full flex flex-col"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="text-secondary-500 fill-secondary-500"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-neutral-700 leading-relaxed mb-6 flex-grow">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                  <Avatar
                    src={testimonial.avatar}
                    initials={testimonial.initials}
                    size="md"
                  />
                  <div>
                    <p className="font-semibold text-neutral-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-neutral-600">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
