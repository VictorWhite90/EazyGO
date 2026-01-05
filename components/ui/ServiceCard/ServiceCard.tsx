'use client';

/**
 * ServiceCard Component
 * Professional service showcase card with glassmorphism hover effect
 */

import { forwardRef, HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

export interface ServiceCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'> {
  /**
   * Service image
   */
  image: string;

  /**
   * Service title
   */
  title: string;

  /**
   * Service description
   */
  description?: string;

  /**
   * Number of available artisans
   */
  artisanCount?: number;

  /**
   * Average price
   */
  avgPrice?: string;

  /**
   * Average rating
   */
  rating?: number;

  /**
   * Click handler
   */
  onClick?: () => void;
}

const ServiceCard = forwardRef<HTMLDivElement, ServiceCardProps>(
  (
    {
      image,
      title,
      description,
      artisanCount,
      avgPrice,
      rating,
      onClick,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'group relative h-80 rounded-2xl overflow-hidden cursor-pointer',
          className
        )}
        onClick={onClick}
        {...props}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={title}
            fill
            draggable={false}
            className="object-cover select-none pointer-events-none"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onContextMenu={(e) => e.preventDefault()}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            {artisanCount && (
              <p className="text-white/80 text-sm">
                {artisanCount}+ professionals available
              </p>
            )}
          </div>
        </div>
      </motion.div>
    );
  }
);

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;
