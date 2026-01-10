'use client';

/**
 * Client Dashboard Layout
 * Wrapper component providing sidebar + main content layout for all client dashboard pages
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, Home } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ClientSidebar } from '../ClientSidebar/ClientSidebar';

interface ClientDashboardLayoutProps {
  children: React.ReactNode;
}

export function ClientDashboardLayout({ children }: ClientDashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/20">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-neutral-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu size={24} className="text-neutral-700" />
          </button>

          {/* Logo */}
          <Link href="/">
            <Image
              src="/EAZYGO LOGO.png"
              alt="EazyGO"
              width={120}
              height={48}
              className="h-10 w-auto"
            />
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Link href="/">
              <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                <Home size={20} className="text-neutral-600" />
              </button>
            </Link>
            <button className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors">
              <Bell size={20} className="text-neutral-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </div>
      </div>

      {/* Layout Grid */}
      <div className="lg:grid lg:grid-cols-[280px_1fr] lg:h-screen">
        {/* Sidebar - Desktop */}
        <ClientSidebar />

        {/* Sidebar - Mobile */}
        <ClientSidebar
          isMobile
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content */}
        <main className="lg:overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
