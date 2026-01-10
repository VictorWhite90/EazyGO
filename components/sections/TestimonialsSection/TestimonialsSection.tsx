'use client';

/**
 * Testimonials Section
 * Customer reviews carousel
 */

import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
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
            <FadeIn key={testimonial.name} delay={index * 0.15}>
              <motion.div
                className="h-full"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <Card
                  variant="default"
                  padding="lg"
                  hover
                  className="h-full flex flex-col relative overflow-hidden"
                >
                  {/* Quote decoration */}
                  <motion.div
                    className="absolute top-4 right-4 text-8xl text-primary-100 font-serif leading-none"
                    initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                  >
                    "
                  </motion.div>

                  <div className="relative z-10">
                    {/* Rating with stagger animation */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0, rotate: -180 }}
                          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.15 + i * 0.1, type: 'spring', stiffness: 200 }}
                        >
                          <Star
                            size={18}
                            className="text-secondary-500 fill-secondary-500"
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Text */}
                    <motion.p
                      className="text-neutral-700 leading-relaxed mb-6 flex-grow"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.4, duration: 0.6 }}
                    >
                      "{testimonial.text}"
                    </motion.p>

                    {/* Author */}
                    <motion.div
                      className="flex items-center gap-3 pt-4 border-t border-neutral-100"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.5 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Avatar
                          src={testimonial.avatar}
                          initials={testimonial.initials}
                          size="md"
                        />
                      </motion.div>
                      <div>
                        <p className="font-semibold text-neutral-900">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-neutral-600">
                          {testimonial.role}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 rounded-2xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
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
