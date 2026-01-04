'use client';

/**
 * Landing Page - Modern Professional Redesign
 * Complete modern UI with glassmorphism, animations, and professional design
 */

import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { FeaturesGrid } from '@/components/sections/FeaturesGrid';
import { HowItWorksTimeline } from '@/components/sections/HowItWorksTimeline';
import { StatsSection } from '@/components/sections/StatsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { SupportSection } from '@/components/sections/SupportSection';
import { CTASection } from '@/components/sections/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Modern redesigned sections */}
      <Hero />
      <ServicesSection />
      <FeaturesGrid />
      <HowItWorksTimeline />
      <StatsSection />
      <TestimonialsSection />
      <SupportSection />
      <CTASection />

      <Footer />
    </main>
  );
}
