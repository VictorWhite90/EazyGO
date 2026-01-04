'use client';

/**
 * Support Section - Modern Redesign
 * FAQ accordion with contact options
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Mail, MessageCircle, Phone, HelpCircle } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/animations';

const faqs = [
  {
    question: 'How do I book an artisan?',
    answer: 'Simply search for the service you need, browse verified artisans in your area, view their profiles and reviews, then click "Book Now" to select a time slot. You\'ll receive instant confirmation and the artisan\'s contact details.',
  },
  {
    question: 'Are all artisans verified?',
    answer: 'Yes, every artisan on our platform goes through a thorough vetting process including background checks, credential verification, and review of past work. We only accept professionals who meet our high standards.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, debit cards, and mobile payment methods. All payments are processed securely through our platform with buyer protection included.',
  },
  {
    question: 'Can I cancel or reschedule a booking?',
    answer: 'Yes, you can cancel or reschedule up to 24 hours before your appointment at no charge. Cancellations within 24 hours may incur a small fee. You can manage your bookings from your account dashboard.',
  },
  {
    question: 'What if I\'m not satisfied with the service?',
    answer: 'We offer a satisfaction guarantee on all services. If you\'re not happy with the work, contact us within 48 hours and we\'ll help resolve the issue, including arranging for corrections or providing a refund.',
  },
  {
    question: 'How do I become an artisan on the platform?',
    answer: 'Click "Become an artisan" to start your application. You\'ll need to provide proof of expertise, business credentials, insurance information, and references. Once approved, you can start receiving bookings immediately.',
  },
  {
    question: 'Do you offer emergency services?',
    answer: 'Yes, many of our artisans offer emergency services for urgent situations like plumbing leaks or electrical issues. Use the "Emergency Service" filter when searching to find artisans available 24/7.',
  },
  {
    question: 'How are artisan ratings calculated?',
    answer: 'Ratings are based on verified customer reviews after completed jobs. We calculate an average from all reviews, considering factors like quality of work, professionalism, timeliness, and value for money.',
  },
];

const contactOptions = [
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Chat with our support team',
    action: 'Start chat',
    color: 'bg-primary-100 text-primary-600',
  },
  {
    icon: Mail,
    title: 'Email Us',
    description: 'support@eazygo.com',
    action: 'Send email',
    color: 'bg-secondary-100 text-secondary-600',
  },
  {
    icon: Phone,
    title: 'Call Us',
    description: '1-800-EAZY-GO',
    action: 'Call now',
    color: 'bg-success-100 text-success-600',
  },
];

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FadeIn delay={index * 0.05}>
      <Card
        variant="default"
        padding="none"
        hover
        className="overflow-hidden"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left transition-colors hover:bg-neutral-50"
        >
          <div className="flex items-start gap-4 flex-1">
            <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <HelpCircle size={18} className="text-primary-600" />
            </div>
            <span className="font-semibold text-neutral-900 text-lg">
              {question}
            </span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0"
          >
            <ChevronDown size={20} className="text-neutral-500" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-5 pl-18">
                <p className="text-neutral-600 leading-relaxed">
                  {answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </FadeIn>
  );
}

export default function SupportSection() {
  return (
    <section id="support" className="py-24 bg-neutral-50 scroll-mt-20">
      <Container>
        <SectionHeader
          badge="Support"
          title="Frequently asked questions"
          subtitle="Can't find what you're looking for? Our support team is here to help"
        />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* FAQ List - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                index={index}
              />
            ))}
          </div>

          {/* Contact Options - Takes 1 column */}
          <div className="space-y-6">
            <FadeIn delay={0.2}>
              <div className="sticky top-24">
                <h3 className="text-xl font-bold text-neutral-900 mb-4">
                  Still need help?
                </h3>
                <p className="text-neutral-600 mb-6">
                  Our support team is available 24/7 to assist you
                </p>

                <div className="space-y-4">
                  {contactOptions.map((option, index) => (
                    <Card
                      key={option.title}
                      variant="default"
                      padding="md"
                      hover
                      hoverScale={1.02}
                      className="cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl ${option.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                          <option.icon size={24} />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-neutral-900 mb-1">
                            {option.title}
                          </div>
                          <div className="text-sm text-neutral-600">
                            {option.description}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="mt-6">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    magneticEffect
                  >
                    Contact Support
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Bottom CTA */}
        <FadeIn delay={0.4}>
          <Card
            variant="glass"
            padding="lg"
            className="text-center max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-neutral-900 mb-3">
              Have feedback or suggestions?
            </h3>
            <p className="text-neutral-600 mb-6">
              We're always looking to improve. Share your thoughts with us and help make EazyGO better for everyone.
            </p>
            <Button variant="outline" size="md">
              Send Feedback
            </Button>
          </Card>
        </FadeIn>
      </Container>
    </section>
  );
}
