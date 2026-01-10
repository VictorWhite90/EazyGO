'use client';

/**
 * Booking Request Form
 * Form for clients to request bookings from artisans
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, MapPin, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface BookingRequestFormProps {
  artisanId: string;
  artisanName: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export function BookingRequestForm({
  artisanId,
  artisanName,
  onClose,
  onSuccess,
}: BookingRequestFormProps) {
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    location: '',
    urgency: 'normal',
    preferredDate: '',
    clientNotes: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
    if (!formData.jobTitle.trim()) {
      setError('Please provide a job title');
      setIsLoading(false);
      return;
    }

    if (!formData.jobDescription.trim()) {
      setError('Please describe the job you need done');
      setIsLoading(false);
      return;
    }

    if (!formData.location.trim()) {
      setError('Please provide the job location');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          artisanId,
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create booking');
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
            <h2 className="text-2xl font-bold text-neutral-900">Request a Booking</h2>
            <p className="text-neutral-600 mt-1">Book {artisanName} for your job</p>
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
              <p className="font-semibold text-green-900">Booking request sent!</p>
              <p className="text-sm text-green-700">
                {artisanName} will review your request and respond soon.
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
            {/* Job Title */}
            <Input
              label="Job Title *"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="e.g., Fix leaking kitchen sink"
              required
              disabled={isLoading}
              hint="Brief title describing the job"
            />

            {/* Job Description */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Job Description *
              </label>
              <textarea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                rows={5}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Describe the job in detail. Include what needs to be done, any specific requirements, and any relevant information the artisan should know."
              />
              <p className="text-xs text-neutral-500 mt-1">
                Be as detailed as possible to help the artisan prepare an accurate quote
              </p>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  Job Location *
                </div>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Full address where the work will be done"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {/* Urgency */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Urgency
                </label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="flexible">Flexible</option>
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    Preferred Visit Date
                  </div>
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  disabled={isLoading}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <p className="text-xs text-neutral-500 mt-1">Optional - for site visit</p>
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Additional Notes
              </label>
              <textarea
                name="clientNotes"
                value={formData.clientNotes}
                onChange={handleChange}
                rows={3}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Any other information you'd like to share (optional)"
              />
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Next steps:</strong> The artisan will review your request and schedule a site
                visit to assess the job. After the visit, they'll provide you with a detailed quote
                for your approval.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                size="md"
                fullWidth
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                disabled={isLoading}
                icon={isLoading ? <Loader2 size={20} className="animate-spin" /> : undefined}
              >
                {isLoading ? 'Submitting...' : 'Submit Request'}
              </Button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
