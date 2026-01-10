'use client';

/**
 * Client Dashboard Sidebar
 * Persistent navigation for client dashboard pages
 * Responsive: Fixed on desktop, collapsible on tablet, hidden (mobile menu) on mobile
 */

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { SidebarNav } from './SidebarNav';
import { SidebarUserProfile } from './SidebarUserProfile';

interface ClientSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

export function ClientSidebar({ isOpen = true, onClose, isMobile = false }: ClientSidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Load collapsed state from localStorage on mount (desktop only)
  useEffect(() => {
    if (!isMobile) {
      const savedState = localStorage.getItem('sidebar-collapsed');
      if (savedState !== null) {
        setIsCollapsed(savedState === 'true');
      }
    }
  }, [isMobile]);

  // Save collapsed state to localStorage (desktop only)
  const toggleCollapsed = () => {
    if (!isMobile) {
      const newState = !isCollapsed;
      setIsCollapsed(newState);
      localStorage.setItem('sidebar-collapsed', String(newState));
    }
  };

  // Mobile sidebar (slide-in overlay)
  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-[280px] bg-white shadow-soft-lg z-50 lg:hidden flex flex-col"
            >
              {/* Close button */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                <h2 className="text-lg font-bold text-neutral-900">Menu</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} className="text-neutral-600" />
                </button>
              </div>

              {/* Navigation */}
              <div className="flex-1 overflow-y-auto py-6">
                <SidebarNav currentPath={pathname} onNavigate={onClose} />
              </div>

              {/* User Profile */}
              <div className="border-t border-neutral-200">
                <SidebarUserProfile />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Desktop sidebar (persistent)
  return (
    <aside
      className={`hidden lg:flex flex-col bg-white border-r border-neutral-200 transition-all duration-300 ${
        isCollapsed ? 'w-[72px]' : 'w-[280px]'
      }`}
    >
      {/* Logo/Header */}
      <div className="h-20 flex items-center justify-center border-b border-neutral-200 px-6">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-primary-600">EazyGO</h1>
        )}
        {isCollapsed && (
          <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6">
        <SidebarNav currentPath={pathname} isCollapsed={isCollapsed} />
      </nav>

      {/* User Profile */}
      <div className="border-t border-neutral-200">
        <SidebarUserProfile isCollapsed={isCollapsed} />
      </div>

      {/* Collapse Toggle (optional - can be removed) */}
      {/*
      <div className="border-t border-neutral-200 p-4">
        <button
          onClick={toggleCollapsed}
          className="w-full flex items-center justify-center p-2 hover:bg-neutral-50 rounded-lg transition-colors text-neutral-600"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      */}
    </aside>
  );
}
