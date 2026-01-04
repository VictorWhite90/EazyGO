'use client';

/**
 * SectionHeader Component
 * Consistent section header with title and subtitle
 */

import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';
import { FadeIn } from '@/components/animations';

export interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Section title
   */
  title: string;

  /**
   * Section subtitle/description
   */
  subtitle?: string;

  /**
   * Title alignment
   * @default 'center'
   */
  align?: 'left' | 'center';

  /**
   * Badge/label above title
   */
  badge?: string;
}

const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    {
      title,
      subtitle,
      align = 'center',
      badge,
      className,
      ...props
    },
    ref
  ) => {
    const alignStyles = {
      left: 'text-left',
      center: 'text-center',
    };

    return (
      <FadeIn
        ref={ref}
        className={cn('mb-12', alignStyles[align], className)}
        {...props}
      >
        {badge && (
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary-600 bg-primary-50 rounded-full border border-primary-100">
            {badge}
          </span>
        )}

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
          {title}
        </h2>

        {subtitle && (
          <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
      </FadeIn>
    );
  }
);

SectionHeader.displayName = 'SectionHeader';

export default SectionHeader;
