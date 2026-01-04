'use client';

/**
 * Container Component
 * Responsive container with max-width constraints
 */

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Content
   */
  children: ReactNode;

  /**
   * Container max-width
   * @default 'xl'
   */
  size?: ContainerSize;

  /**
   * Remove horizontal padding
   */
  noPadding?: boolean;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      children,
      size = 'xl',
      noPadding = false,
      className,
      ...props
    },
    ref
  ) => {
    // Size styles
    const sizeStyles = {
      sm: 'max-w-3xl',
      md: 'max-w-4xl',
      lg: 'max-w-5xl',
      xl: 'max-w-7xl',
      '2xl': 'max-w-[1400px]',
      full: 'max-w-full',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto w-full',
          sizeStyles[size],
          !noPadding && 'px-4 sm:px-6 lg:px-8',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

export default Container;
