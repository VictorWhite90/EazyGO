'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  DollarSign,
  FileText,
  Star,
  User,
  Phone,
  Mail,
  MessageSquare,
  AlertCircle,
  Wrench,
  Package,
  TrendingUp,
  Check
} from 'lucide-react';
import { ClientDashboardLayout } from '@/components/layout/ClientDashboardLayout';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

interface Booking {
  id: string;
  clientId: string;
  artisanId: string;
  status: 'PENDING' | 'ACCEPTED' | 'VISIT_SCHEDULED' | 'QUOTE_PENDING' | 'QUOTE_SENT' | 'QUOTE_APPROVED' | 'QUOTE_DECLINED' | 'IN_PROGRESS' | 'WORK_COMPLETED' | 'COMPLETED' | 'CANCELLED' | 'DISPUTED';
  jobTitle: string;
  jobDescription: string;
  location: string | null;
  urgency: string | null;
  visitDate: string | null;
  quotedPrice: number | null;
  laborCost: number | null;
  materialCost: number | null;
  estimatedDays: number | null;
  quoteNotes: string | null;
  completedDate: string | null;
  clientNotes: string | null;
  createdAt: string;
  artisan: {
    id: string;
    profilePhoto: string;
    city: string;
    rating: number;
    user: {
      id: string;
      name: string;
      email: string;
      image: string | null;
    };
  };
  review: {
    id: string;
    rating: number;
    comment: string;
  } | null;
}

interface TimelineStep {
  label: string;
  status: 'completed' | 'current' | 'upcoming';
  date?: string;
  icon: any;
}

export default function BookingDetailPage() {
  const { status } = useSession();
  const router = useRouter();
  const params = useParams();
  const bookingId = params?.id as string;
  const [loading, setLoading] = useState(true);

  // Mock data - in production, fetch from API
  const [booking] = useState<Booking>({
    id: bookingId,
    clientId: '1',
    artisanId: '1',
    status: 'IN_PROGRESS',
    jobTitle: 'Kitchen Plumbing Repair',
    jobDescription: 'Need to fix leaking pipes under the kitchen sink and replace the faucet',
    location: '123 Lagos Street, Victoria Island, Lagos',
    urgency: 'urgent',
    visitDate: '2024-01-20T10:00:00',
    quotedPrice: 25000,
    laborCost: 15000,
    materialCost: 10000,
    estimatedDays: 2,
    quoteNotes: 'Will need to replace some pipes and install new fixtures',
    completedDate: null,
    clientNotes: 'Please arrive early in the morning',
    createdAt: '2024-01-15T08:30:00',
    artisan: {
      id: '1',
      profilePhoto: '',
      city: 'Lagos',
      rating: 4.8,
      user: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        image: null,
      },
    },
    review: null,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated') {
      setLoading(false);
    }
  }, [status, router]);

  if (status === 'loading' || loading) {
    return (
      <ClientDashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </ClientDashboardLayout>
    );
  }

  const getStatusConfig = (status: string) => {
    const config: Record<string, any> = {
      PENDING: {
        label: 'Pending',
        variant: 'warning' as const,
        icon: Clock,
      },
      ACCEPTED: {
        label: 'Accepted',
        variant: 'primary' as const,
        icon: CheckCircle,
      },
      VISIT_SCHEDULED: {
        label: 'Visit Scheduled',
        variant: 'primary' as const,
        icon: Calendar,
      },
      QUOTE_PENDING: {
        label: 'Quote Pending',
        variant: 'warning' as const,
        icon: Clock,
      },
      QUOTE_SENT: {
        label: 'Quote Sent',
        variant: 'primary' as const,
        icon: FileText,
      },
      QUOTE_APPROVED: {
        label: 'Quote Approved',
        variant: 'success' as const,
        icon: CheckCircle,
      },
      IN_PROGRESS: {
        label: 'In Progress',
        variant: 'primary' as const,
        icon: Wrench,
      },
      WORK_COMPLETED: {
        label: 'Work Completed',
        variant: 'success' as const,
        icon: CheckCircle,
      },
      COMPLETED: {
        label: 'Completed',
        variant: 'success' as const,
        icon: CheckCircle,
      },
      CANCELLED: {
        label: 'Cancelled',
        variant: 'error' as const,
        icon: XCircle,
      },
    };
    return config[status] || config.PENDING;
  };

  const getTimelineSteps = (): TimelineStep[] => {
    const baseSteps: TimelineStep[] = [
      {
        label: 'Request Submitted',
        status: 'completed',
        date: new Date(booking.createdAt).toLocaleDateString(),
        icon: FileText,
      },
      {
        label: 'Artisan Accepted',
        status: ['PENDING'].includes(booking.status) ? 'upcoming' : 'completed',
        date: booking.status !== 'PENDING' ? new Date(booking.createdAt).toLocaleDateString() : undefined,
        icon: CheckCircle,
      },
    ];

    if (booking.visitDate) {
      baseSteps.push({
        label: 'Site Visit',
        status: ['PENDING', 'ACCEPTED'].includes(booking.status) ? 'upcoming' : 'completed',
        date: new Date(booking.visitDate).toLocaleDateString(),
        icon: Calendar,
      });
    }

    baseSteps.push({
      label: 'Quote Provided',
      status: ['PENDING', 'ACCEPTED', 'VISIT_SCHEDULED', 'QUOTE_PENDING'].includes(booking.status)
        ? 'upcoming'
        : booking.status === 'QUOTE_SENT'
        ? 'current'
        : 'completed',
      icon: DollarSign,
    });

    baseSteps.push({
      label: 'Work in Progress',
      status: booking.status === 'IN_PROGRESS'
        ? 'current'
        : ['PENDING', 'ACCEPTED', 'VISIT_SCHEDULED', 'QUOTE_PENDING', 'QUOTE_SENT', 'QUOTE_APPROVED'].includes(
            booking.status
          )
        ? 'upcoming'
        : 'completed',
      icon: Wrench,
    });

    baseSteps.push({
      label: 'Completed',
      status: ['COMPLETED', 'WORK_COMPLETED'].includes(booking.status) ? 'completed' : 'upcoming',
      date: booking.completedDate ? new Date(booking.completedDate).toLocaleDateString() : undefined,
      icon: Check,
    });

    return baseSteps;
  };

  const timelineSteps = getTimelineSteps();
  const statusConfig = getStatusConfig(booking.status);
  const StatusIcon = statusConfig.icon;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <ClientDashboardLayout>
      <Container className="py-8 px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Link href="/dashboard/client">
            <Button variant="ghost" size="md" icon={<ArrowLeft size={18} />}>
              Back to Dashboard
            </Button>
          </Link>
        </motion.div>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
                {booking.jobTitle}
              </h1>
              <div className="flex items-center gap-3 text-neutral-600">
                <span className="text-sm">Booking #{booking.id.slice(0, 8).toUpperCase()}</span>
                <span className="text-neutral-400">•</span>
                <span className="text-sm">
                  Created {new Date(booking.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <Badge variant={statusConfig.variant} size="lg" icon={<StatusIcon size={18} />}>
              {statusConfig.label}
            </Badge>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card variant="default" padding="lg">
                <h3 className="text-xl font-bold text-neutral-900 mb-6">Booking Timeline</h3>

                <div className="relative">
                  {timelineSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isLast = index === timelineSteps.length - 1;

                    return (
                      <div key={index} className="relative flex gap-4 pb-8 last:pb-0">
                        {/* Vertical Line */}
                        {!isLast && (
                          <div
                            className={`absolute left-5 top-12 bottom-0 w-0.5 ${
                              step.status === 'completed'
                                ? 'bg-green-500'
                                : step.status === 'current'
                                ? 'bg-gradient-to-b from-green-500 to-neutral-300'
                                : 'bg-neutral-300'
                            }`}
                          />
                        )}

                        {/* Icon */}
                        <div
                          className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            step.status === 'completed'
                              ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                              : step.status === 'current'
                              ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30 ring-4 ring-primary-100'
                              : 'bg-neutral-200 text-neutral-500'
                          }`}
                        >
                          <Icon size={20} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 pt-1">
                          <div className="flex items-center justify-between gap-4 mb-1">
                            <h4
                              className={`font-semibold ${
                                step.status === 'upcoming' ? 'text-neutral-500' : 'text-neutral-900'
                              }`}
                            >
                              {step.label}
                            </h4>
                            {step.date && (
                              <span className="text-sm text-neutral-500 flex-shrink-0">
                                {step.date}
                              </span>
                            )}
                          </div>
                          {step.status === 'current' && (
                            <p className="text-sm text-primary-600 font-medium">Currently active</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>

            {/* Job Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card variant="default" padding="lg">
                <h3 className="text-xl font-bold text-neutral-900 mb-6">Job Details</h3>

                <div className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                      <FileText size={16} />
                      Description
                    </label>
                    <p className="text-neutral-900 leading-relaxed">{booking.jobDescription}</p>
                  </div>

                  {booking.location && (
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                        <MapPin size={16} />
                        Location
                      </label>
                      <p className="text-neutral-900">{booking.location}</p>
                    </div>
                  )}

                  {booking.urgency && (
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                        <Clock size={16} />
                        Urgency
                      </label>
                      <Badge
                        variant={booking.urgency === 'urgent' ? 'error' : 'warning'}
                        size="md"
                      >
                        {booking.urgency.charAt(0).toUpperCase() + booking.urgency.slice(1)}
                      </Badge>
                    </div>
                  )}

                  {booking.visitDate && (
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                        <Calendar size={16} />
                        Scheduled Visit
                      </label>
                      <p className="text-neutral-900">
                        {new Date(booking.visitDate).toLocaleString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  )}

                  {booking.clientNotes && (
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                        <MessageSquare size={16} />
                        Your Notes
                      </label>
                      <p className="text-neutral-900">{booking.clientNotes}</p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Quote Details */}
            {booking.quotedPrice && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card variant="default" padding="lg" className="border-l-4 border-primary-600">
                  <h3 className="text-xl font-bold text-neutral-900 mb-6">Quote Details</h3>

                  {/* Total Price */}
                  <div className="bg-gradient-to-r from-neutral-50 to-neutral-100/50 border-2 border-neutral-200 rounded-2xl p-6 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <DollarSign className="text-primary-600" size={28} />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500 font-medium mb-1">
                          Total Quoted Price
                        </p>
                        <p className="text-4xl font-bold text-neutral-900">
                          ₦{booking.quotedPrice.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {booking.laborCost !== null && (
                      <div className="border-2 border-neutral-200 rounded-xl p-4 hover:border-primary-300 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Wrench size={18} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="text-xs text-neutral-500 font-medium">Labor Cost</p>
                            <p className="text-xl font-bold text-neutral-900">
                              ₦{booking.laborCost.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {booking.materialCost !== null && (
                      <div className="border-2 border-neutral-200 rounded-xl p-4 hover:border-primary-300 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Package size={18} className="text-purple-600" />
                          </div>
                          <div>
                            <p className="text-xs text-neutral-500 font-medium">Materials</p>
                            <p className="text-xl font-bold text-neutral-900">
                              ₦{booking.materialCost.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {booking.estimatedDays && (
                    <div className="flex items-center gap-2 text-sm text-neutral-600 mb-4">
                      <Clock size={16} className="text-neutral-400" />
                      <span>
                        Estimated completion: {booking.estimatedDays} day
                        {booking.estimatedDays !== 1 ? 's' : ''}
                      </span>
                    </div>
                  )}

                  {booking.quoteNotes && (
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                        <MessageSquare size={16} />
                        Artisan Notes
                      </label>
                      <p className="text-neutral-900">{booking.quoteNotes}</p>
                    </div>
                  )}
                </Card>
              </motion.div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Artisan Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card variant="default" padding="lg">
                <h3 className="text-lg font-bold text-neutral-900 mb-4">Your Artisan</h3>

                <div className="flex items-start gap-3 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-lg font-bold shadow-md flex-shrink-0">
                    {getInitials(booking.artisan.user.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-neutral-900 text-lg mb-1">
                      {booking.artisan.user.name}
                    </h4>
                    <div className="flex items-center gap-1 mb-2">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold text-neutral-900 text-sm">
                        {booking.artisan.rating}
                      </span>
                      <span className="text-neutral-500 text-xs">rating</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <MapPin size={14} className="text-neutral-400" />
                      <span>{booking.artisan.city}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <a
                    href={`mailto:${booking.artisan.user.email}`}
                    className="flex items-center gap-2 text-sm text-neutral-600 hover:text-primary-600 transition-colors p-2 hover:bg-neutral-50 rounded-lg"
                  >
                    <Mail size={16} className="text-neutral-400" />
                    <span className="truncate">{booking.artisan.user.email}</span>
                  </a>
                </div>

                <Link href={`/artisan/${booking.artisan.id}`}>
                  <Button variant="outline" size="md" fullWidth icon={<User size={18} />}>
                    View Profile
                  </Button>
                </Link>
              </Card>
            </motion.div>

            {/* Actions */}
            {booking.status === 'QUOTE_SENT' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card variant="default" padding="lg" className="bg-gradient-to-br from-primary-50 to-purple-50">
                  <h3 className="text-lg font-bold text-neutral-900 mb-3">Action Required</h3>
                  <p className="text-sm text-neutral-600 mb-4">
                    Review and approve the quote to proceed with the work
                  </p>
                  <div className="space-y-2">
                    <Button variant="primary" size="md" fullWidth icon={<CheckCircle size={18} />}>
                      Approve Quote
                    </Button>
                    <Button variant="outline" size="md" fullWidth>
                      Request Changes
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Need Help */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card variant="default" padding="lg" className="border-orange-200">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertCircle size={20} className="text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-1">Need Help?</h3>
                    <p className="text-sm text-neutral-600">
                      Contact our support team for assistance
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="md" fullWidth icon={<MessageSquare size={18} />}>
                  Contact Support
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </Container>
    </ClientDashboardLayout>
  );
}
