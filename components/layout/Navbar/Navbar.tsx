'use client';

/**
 * Navbar - Modern Redesign
 * Professional navbar with glassmorphism effect on scroll
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'glass-navbar shadow-soft'
          : 'bg-white/80 backdrop-blur-sm border-b border-neutral-100'
      )}
    >
      <div className="max-w-7xl mx-auto pl-2 pr-4 sm:pl-3 sm:pr-6 lg:pl-4 lg:pr-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <a href="/" className="flex items-center">
              <Image
                src="/EAZYGO LOGO.png"
                alt="EazyGO Logo"
                width={400}
                height={400}
                draggable={false}
                className="h-20 sm:h-24 lg:h-32 w-auto select-none"
                priority
                onContextMenu={(e) => e.preventDefault()}
              />
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="#features"
              className="text-neutral-700 hover:text-primary-600 transition-colors font-medium"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-neutral-700 hover:text-primary-600 transition-colors font-medium"
            >
              How it works
            </a>
            <a
              href="#support"
              className="text-neutral-700 hover:text-primary-600 transition-colors font-medium"
            >
              Support
            </a>

            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-neutral-200">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="primary" size="sm" magneticEffect>
                  Get started
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass-morphism border-t border-white/20"
          >
            <div className="px-4 py-6 space-y-4">
              <a
                href="#features"
                className="block px-4 py-3 text-neutral-900 hover:bg-primary-50 rounded-lg transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="block px-4 py-3 text-neutral-900 hover:bg-primary-50 rounded-lg transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How it works
              </a>
              <a
                href="#support"
                className="block px-4 py-3 text-neutral-900 hover:bg-primary-50 rounded-lg transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Support
              </a>

              <div className="pt-4 border-t border-neutral-200 space-y-3">
                <Link href="/auth/login">
                  <Button variant="ghost" size="md" fullWidth>
                    Sign in
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="primary" size="md" fullWidth>
                    Get started
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
