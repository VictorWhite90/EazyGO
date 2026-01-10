'use client';

/**
 * Sidebar User Profile Section
 * Displays user avatar and name at bottom of sidebar
 */

import { useSession, signOut } from 'next-auth/react';
import { LogOut, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarUserProfileProps {
  isCollapsed?: boolean;
}

export function SidebarUserProfile({ isCollapsed = false }: SidebarUserProfileProps) {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  if (!session?.user) {
    return null;
  }

  const userName = session.user.name || 'User';
  const userEmail = session.user.email || '';
  const userInitials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  // Collapsed version (icon only)
  if (isCollapsed) {
    return (
      <div className="p-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-semibold shadow-md mx-auto">
          {userInitials}
        </div>
      </div>
    );
  }

  // Full version
  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-full p-4 hover:bg-neutral-50 transition-colors flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-semibold shadow-md flex-shrink-0">
          {userInitials}
        </div>
        <div className="flex-1 text-left min-w-0">
          <p className="text-sm font-semibold text-neutral-900 truncate">{userName}</p>
          <p className="text-xs text-neutral-600 truncate">{userEmail}</p>
        </div>
        <ChevronUp
          size={16}
          className={`text-neutral-400 transition-transform ${
            showDropdown ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-neutral-200 rounded-xl shadow-soft-lg overflow-hidden mx-3"
          >
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-red-600"
            >
              <LogOut size={16} />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
