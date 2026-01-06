'use client';

import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PaymentMethodsPage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <Container>
        <Link href="/dashboard/client">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft size={16} className="mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <Card variant="default" padding="lg">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Payment Methods</h1>
          <p className="text-neutral-600">Payment methods page coming soon...</p>
        </Card>
      </Container>
    </div>
  );
}
