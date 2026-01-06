'use client';

/**
 * Quote Submission Form
 * Form for artisans to submit quotes after site visit
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, DollarSign, AlertCircle, Loader2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface QuoteSubmissionFormProps {
  bookingId: string;
  jobTitle: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export function QuoteSubmissionForm({
  bookingId,
  jobTitle,
  onClose,
  onSuccess,
}: QuoteSubmissionFormProps) {
  const [formData, setFormData] = useState({
    quotedPrice: '',
    laborCost: '',
    materialCost: '',
    estimatedDays: '',
    quoteNotes: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation
    if (!formData.quotedPrice || parseFloat(formData.quotedPrice) <= 0) {
      setError('Please provide a valid quoted price');
      setIsLoading(false);
      return;
    }

    // Validate that labor + material doesn't exceed quoted price
    const quotedPrice = parseFloat(formData.quotedPrice);
    const laborCost = formData.laborCost ? parseFloat(formData.laborCost) : 0;
    const materialCost = formData.materialCost ? parseFloat(formData.materialCost) : 0;

    if (laborCost + materialCost > quotedPrice) {
      setError('Labor and material costs cannot exceed the quoted price');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'submit_quote',
          quotedPrice: parseFloat(formData.quotedPrice),
          laborCost: formData.laborCost ? parseFloat(formData.laborCost) : null,
          materialCost: formData.materialCost ? parseFloat(formData.materialCost) : null,
          estimatedDays: formData.estimatedDays ? parseInt(formData.estimatedDays) : null,
          quoteNotes: formData.quoteNotes || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit quote');
      }

      setSuccess(true);
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Submit Quote</h2>
            <p className="text-neutral-600 mt-1">{jobTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            disabled={isLoading}
          >
            <X size={24} className="text-neutral-600" />
          </button>
        </div>

        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-6 mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <p className="font-semibold text-green-900">Quote submitted successfully!</p>
              <p className="text-sm text-green-700">
                The client will be notified and can review your quote.
              </p>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
          >
            <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
            <p className="text-sm text-red-700">{error}</p>
          </motion.div>
        )}

        {/* Form */}
        {!success && (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
            {/* Quoted Price */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                <div className="flex items-center gap-2">
                  <DollarSign size={16} />
                  Total Quoted Price *
                </div>
              </label>
              <input
                type="number"
                name="quotedPrice"
                value={formData.quotedPrice}
                onChange={handleChange}
                step="0.01"
                min="0"
                required
                disabled={isLoading}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter the total agreed price"
              />
              <p className="text-xs text-neutral-500 mt-1">
                The total price agreed with the client
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {/* Labor Cost */}
              <Input
                label="Labor Cost (Optional)"
                name="laborCost"
                type="number"
                value={formData.laborCost}
                onChange={handleChange}
                step="0.01"
                min="0"
                disabled={isLoading}
                placeholder="0.00"
                hint="Cost of labor/service"
              />

              {/* Material Cost */}
              <Input
                label="Material Cost (Optional)"
                name="materialCost"
                type="number"
                value={formData.materialCost}
                onChange={handleChange}
                step="0.01"
                min="0"
                disabled={isLoading}
                placeholder="0.00"
                hint="Cost of materials"
              />
            </div>

            {/* Estimated Days */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  Estimated Days to Complete (Optional)
                </div>
              </label>
              <input
                type="number"
                name="estimatedDays"
                value={formData.estimatedDays}
                onChange={handleChange}
                min="1"
                disabled={isLoading}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="e.g., 5"
              />
              <p className="text-xs text-neutral-500 mt-1">
                How many days will this job take?
              </p>
            </div>

            {/* Quote Notes */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Quote Notes (Optional)
              </label>
              <textarea
                name="quoteNotes"
                value={formData.quoteNotes}
                onChange={handleChange}
                rows={4}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Explain what's included in the quote, any assumptions made, or other relevant details..."
              />
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Note:</strong> Once you submit this quote, the client will be notified and
                can review it. Make sure all pricing details are accurate before submitting.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                size="lg"
                fullWidth
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={isLoading}
                icon={isLoading ? <Loader2 size={20} className="animate-spin" /> : undefined}
              >
                {isLoading ? 'Submitting...' : 'Submit Quote'}
              </Button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
