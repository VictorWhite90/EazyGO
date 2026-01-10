'use client';

/**
 * Quote Approval Card
 * Card for clients to review and approve/decline artisan quotes
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Calendar, Wrench, Package, AlertCircle, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface QuoteApprovalCardProps {
  bookingId: string;
  artisanName: string;
  jobTitle: string;
  quotedPrice: number;
  laborCost?: number | null;
  materialCost?: number | null;
  estimatedDays?: number | null;
  quoteNotes?: string | null;
  onApprove?: () => void;
  onDecline?: () => void;
}

export function QuoteApprovalCard({
  bookingId,
  artisanName,
  jobTitle,
  quotedPrice,
  laborCost,
  materialCost,
  estimatedDays,
  quoteNotes,
  onApprove,
  onDecline,
}: QuoteApprovalCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [actionTaken, setActionTaken] = useState<'approved' | 'declined' | null>(null);

  const handleAction = async (action: 'approve_quote' | 'reject') => {
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process quote');
      }

      setActionTaken(action === 'approve_quote' ? 'approved' : 'declined');
      setTimeout(() => {
        if (action === 'approve_quote') {
          onApprove?.();
        } else {
          onDecline?.();
        }
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  if (actionTaken) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card
          variant="default"
          padding="lg"
          className={`${
            actionTaken === 'approved'
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300'
              : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-300'
          }`}
        >
          <div className="text-center py-8">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                actionTaken === 'approved'
                  ? 'bg-green-100'
                  : 'bg-red-100'
              }`}
            >
              {actionTaken === 'approved' ? (
                <CheckCircle className="text-green-600" size={40} />
              ) : (
                <XCircle className="text-red-600" size={40} />
              )}
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">
              {actionTaken === 'approved' ? 'Quote Approved!' : 'Quote Declined'}
            </h3>
            <p className="text-neutral-700">
              {actionTaken === 'approved'
                ? 'The artisan has been notified. They can now proceed with the work.'
                : 'The artisan has been notified. You can discuss a new quote with them.'}
            </p>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <Card variant="default" padding="lg" className="border-l-4 border-primary-600 bg-white hover:shadow-lg transition-all">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
          <h3 className="text-2xl font-bold text-neutral-900">Quote Received</h3>
          <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap w-fit border border-indigo-200">
            Awaiting Your Approval
          </div>
        </div>
        <p className="text-neutral-600 text-base">
          {artisanName} has submitted a quote for <span className="font-semibold">{jobTitle}</span>
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
        >
          <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
          <p className="text-sm text-red-700">{error}</p>
        </motion.div>
      )}

      {/* Quote Details */}
      <div className="space-y-4 mb-6">
        {/* Total Price */}
        <div className="bg-gradient-to-r from-neutral-50 to-neutral-100/50 border-2 border-neutral-200 rounded-2xl p-6 hover:border-primary-300 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <DollarSign className="text-primary-600" size={28} />
            </div>
            <div>
              <p className="text-sm text-neutral-500 font-medium mb-1">Total Quoted Price</p>
              <p className="text-4xl font-bold text-neutral-900">₦{quotedPrice.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        {(laborCost || materialCost) && (
          <div className="grid sm:grid-cols-2 gap-4">
            {laborCost !== null && laborCost !== undefined && (
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 hover:border-neutral-300 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Wrench size={16} className="text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-neutral-600">Labor Cost</p>
                </div>
                <p className="text-2xl font-bold text-neutral-900">₦{Number(laborCost).toLocaleString()}</p>
              </div>
            )}
            {materialCost !== null && materialCost !== undefined && (
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 hover:border-neutral-300 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Package size={16} className="text-purple-600" />
                  </div>
                  <p className="text-sm font-medium text-neutral-600">Material Cost</p>
                </div>
                <p className="text-2xl font-bold text-neutral-900">₦{Number(materialCost).toLocaleString()}</p>
              </div>
            )}
          </div>
        )}

        {/* Estimated Duration */}
        {estimatedDays && (
          <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 hover:border-neutral-300 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar size={16} className="text-orange-600" />
              </div>
              <p className="text-sm font-medium text-neutral-600">Estimated Duration</p>
            </div>
            <p className="text-2xl font-bold text-neutral-900">
              {estimatedDays} {estimatedDays === 1 ? 'day' : 'days'}
            </p>
          </div>
        )}

        {/* Quote Notes */}
        {quoteNotes && (
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-neutral-700 mb-2">Notes from Artisan:</p>
            <p className="text-sm text-neutral-700 leading-relaxed">{quoteNotes}</p>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-900">
          <strong>Please review carefully:</strong> Once you approve this quote, the artisan can begin work.
          Payment will be handled offline. After both parties confirm job completion, the artisan will be
          billed 10% commission.
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          size="lg"
          fullWidth
          onClick={() => handleAction('reject')}
          disabled={isLoading}
          icon={isLoading ? <Loader2 size={20} className="animate-spin" /> : <XCircle size={20} />}
        >
          {isLoading ? 'Processing...' : 'Decline Quote'}
        </Button>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => handleAction('approve_quote')}
          disabled={isLoading}
          icon={isLoading ? <Loader2 size={20} className="animate-spin" /> : <CheckCircle size={20} />}
        >
          {isLoading ? 'Processing...' : 'Approve & Proceed'}
        </Button>
      </div>
    </Card>
  );
}
