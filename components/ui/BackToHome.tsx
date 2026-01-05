'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';
import { Button } from './Button';

interface BackToHomeProps {
  variant?: 'ghost' | 'outline';
  className?: string;
}

export function BackToHome({ variant = 'ghost', className = '' }: BackToHomeProps) {
  return (
    <Link href="/">
      <Button
        variant={variant}
        size="sm"
        icon={<Home size={18} />}
        className={className}
      >
        Back to Home
      </Button>
    </Link>
  );
}
