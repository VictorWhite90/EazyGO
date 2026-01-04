'use client';

/**
 * Avatar Component
 * User profile image with fallback initials
 */

import { forwardRef, HTMLAttributes } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Image source URL
   */
  src?: string;

  /**
   * Alt text for the image
   */
  alt?: string;

  /**
   * Fallback initials (max 2 characters)
   */
  initials?: string;

  /**
   * Size
   * @default 'md'
   */
  size?: AvatarSize;

  /**
   * Show online status indicator
   */
  online?: boolean;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = 'Avatar',
      initials,
      size = 'md',
      online,
      className,
      ...props
    },
    ref
  ) => {
    // Size styles
    const sizeStyles = {
      sm: 'w-8 h-8 text-xs',
      md: 'w-10 h-10 text-sm',
      lg: 'w-12 h-12 text-base',
      xl: 'w-16 h-16 text-lg',
    };

    // Online indicator size
    const indicatorSize = {
      sm: 'w-2 h-2',
      md: 'w-2.5 h-2.5',
      lg: 'w-3 h-3',
      xl: 'w-4 h-4',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center rounded-full bg-neutral-200 overflow-hidden',
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes={size === 'sm' ? '32px' : size === 'md' ? '40px' : size === 'lg' ? '48px' : '64px'}
          />
        ) : initials ? (
          <span className="font-semibold text-neutral-700 uppercase">
            {initials.slice(0, 2)}
          </span>
        ) : (
          <svg
            className="w-1/2 h-1/2 text-neutral-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        )}

        {/* Online indicator */}
        {online && (
          <span
            className={cn(
              'absolute bottom-0 right-0 rounded-full bg-success-500 border-2 border-white',
              indicatorSize[size]
            )}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;
