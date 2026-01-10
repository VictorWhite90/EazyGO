'use client';

/**
 * Sidebar Navigation Component
 * Displays navigation links with active states
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  Heart,
  CreditCard,
  User,
  Settings,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: number;
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard/client',
    icon: LayoutDashboard,
  },
  {
    label: 'My Bookings',
    href: '/dashboard/client/bookings',
    icon: Calendar,
  },
  {
    label: 'Saved Artisans',
    href: '/dashboard/client/saved',
    icon: Heart,
  },
  {
    label: 'Payments',
    href: '/dashboard/client/payments',
    icon: CreditCard,
  },
  {
    label: 'Profile',
    href: '/dashboard/client/profile',
    icon: User,
  },
  {
    label: 'Settings',
    href: '/dashboard/client/settings',
    icon: Settings,
  },
];

interface SidebarNavProps {
  currentPath: string;
  isCollapsed?: boolean;
  onNavigate?: () => void;
}

export function SidebarNav({ currentPath, isCollapsed = false, onNavigate }: SidebarNavProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard/client') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="space-y-1 px-3">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`
              group flex items-center gap-3 px-3 py-3 rounded-xl transition-all
              ${
                active
                  ? 'bg-green-50 text-primary-600 border-l-4 border-primary-600 pl-[10px]'
                  : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900'
              }
              ${isCollapsed ? 'justify-center' : ''}
            `}
          >
            <Icon
              size={20}
              className={`flex-shrink-0 ${
                active ? 'text-primary-600' : 'text-neutral-500 group-hover:text-neutral-700'
              }`}
            />
            {!isCollapsed && (
              <span className={`text-sm font-medium ${active ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            )}
            {!isCollapsed && item.badge && item.badge > 0 && (
              <span className="ml-auto bg-primary-600 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
