'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Star,
  MapPin,
  User,
  ArrowRight,
  Bell,
  Activity,
  ChevronRight,
  Plus,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
} from 'lucide-react';
import { ClientDashboardLayout } from '@/components/layout/ClientDashboardLayout';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { QuoteApprovalCard } from '@/components/booking/QuoteApprovalCard';
import Image from 'next/image';

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

const STATUS_CONFIG: Record<string, any> = {
  PENDING: {
    label: 'Pending',
    color: 'text-yellow-700',
    bg: 'bg-yellow-100',
    border: 'border-yellow-300',
    icon: Clock,
    iconColor: 'text-yellow-600',
  },
  ACCEPTED: {
    label: 'Accepted',
    color: 'text-blue-700',
    bg: 'bg-blue-100',
    border: 'border-blue-300',
    icon: CheckCircle,
    iconColor: 'text-blue-600',
  },
  VISIT_SCHEDULED: {
    label: 'Visit Scheduled',
    color: 'text-cyan-700',
    bg: 'bg-cyan-100',
    border: 'border-cyan-300',
    icon: Calendar,
    iconColor: 'text-cyan-600',
  },
  QUOTE_PENDING: {
    label: 'Quote Pending',
    color: 'text-orange-700',
    bg: 'bg-orange-100',
    border: 'border-orange-300',
    icon: Clock,
    iconColor: 'text-orange-600',
  },
  QUOTE_SENT: {
    label: 'Quote Received',
    color: 'text-indigo-700',
    bg: 'bg-indigo-100',
    border: 'border-indigo-300',
    icon: Bell,
    iconColor: 'text-indigo-600',
  },
  QUOTE_APPROVED: {
    label: 'Quote Approved',
    color: 'text-teal-700',
    bg: 'bg-teal-100',
    border: 'border-teal-300',
    icon: CheckCircle,
    iconColor: 'text-teal-600',
  },
  QUOTE_DECLINED: {
    label: 'Quote Declined',
    color: 'text-red-700',
    bg: 'bg-red-100',
    border: 'border-red-300',
    icon: XCircle,
    iconColor: 'text-red-600',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    color: 'text-purple-700',
    bg: 'bg-purple-100',
    border: 'border-purple-300',
    icon: Activity,
    iconColor: 'text-purple-600',
  },
  WORK_COMPLETED: {
    label: 'Work Completed',
    color: 'text-emerald-700',
    bg: 'bg-emerald-100',
    border: 'border-emerald-300',
    icon: CheckCircle,
    iconColor: 'text-emerald-600',
  },
  COMPLETED: {
    label: 'Completed',
    color: 'text-green-700',
    bg: 'bg-green-100',
    border: 'border-green-300',
    icon: CheckCircle,
    iconColor: 'text-green-600',
  },
  CANCELLED: {
    label: 'Cancelled',
    color: 'text-red-700',
    bg: 'bg-red-100',
    border: 'border-red-300',
    icon: XCircle,
    iconColor: 'text-red-600',
  },
  DISPUTED: {
    label: 'Disputed',
    color: 'text-gray-700',
    bg: 'bg-gray-100',
    border: 'border-gray-300',
    icon: AlertCircle,
    iconColor: 'text-gray-600',
  },
};

export default function ClientDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated') {
      fetchBookings();
    }
  }, [status, statusFilter]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);

      const response = await fetch(`/api/bookings/client?${params.toString()}`);
      const data = await response.json();
      setBookings(data.bookings || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmCompletion = async (bookingId: string, quotedPrice: number) => {
    const platformFee = quotedPrice * 0.1;
    const confirmation = confirm(
      `Confirm that the work has been completed satisfactorily?\n\n` +
      `The artisan will be billed a 10% platform commission (₦${platformFee.toLocaleString()}) ` +
      `and has 7 days to make payment.`
    );

    if (!confirmation) return;

    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'confirm_completion' }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Failed to confirm completion');
        return;
      }

      alert('Job completion confirmed! Thank you for using EazyGO.');
      fetchBookings();
    } catch (error) {
      console.error('Error confirming completion:', error);
      alert('An error occurred. Please try again.');
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Calculate daily stats
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const todayBookings = bookings.filter((b) => {
    const created = new Date(b.createdAt);
    created.setHours(0, 0, 0, 0);
    return created.getTime() === today.getTime();
  });

  const yesterdayBookings = bookings.filter((b) => {
    const created = new Date(b.createdAt);
    created.setHours(0, 0, 0, 0);
    return created.getTime() === yesterday.getTime();
  });

  const calculateTrend = (todayCount: number, yesterdayCount: number) => {
    if (yesterdayCount === 0) return { percentage: todayCount > 0 ? 100 : 0, direction: todayCount > 0 ? 'up' : 'neutral' };
    const change = ((todayCount - yesterdayCount) / yesterdayCount) * 100;
    return {
      percentage: Math.abs(Math.round(change)),
      direction: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral'
    };
  };

  const stats = {
    total: {
      today: todayBookings.length,
      trend: calculateTrend(todayBookings.length, yesterdayBookings.length)
    },
    pending: {
      today: todayBookings.filter((b) => b.status === 'PENDING').length,
      trend: calculateTrend(
        todayBookings.filter((b) => b.status === 'PENDING').length,
        yesterdayBookings.filter((b) => b.status === 'PENDING').length
      )
    },
    inProgress: {
      today: todayBookings.filter((b) => b.status === 'IN_PROGRESS').length,
      trend: calculateTrend(
        todayBookings.filter((b) => b.status === 'IN_PROGRESS').length,
        yesterdayBookings.filter((b) => b.status === 'IN_PROGRESS').length
      )
    },
    completed: {
      today: todayBookings.filter((b) => b.status === 'COMPLETED').length,
      trend: calculateTrend(
        todayBookings.filter((b) => b.status === 'COMPLETED').length,
        yesterdayBookings.filter((b) => b.status === 'COMPLETED').length
      )
    }
  };

  const quotesToApprove = bookings.filter((b) => b.status === 'QUOTE_SENT');
  const recentBookings = bookings.slice(0, 5);
  const upcomingBookings = bookings.filter(
    (b) => b.visitDate && new Date(b.visitDate) > new Date() && b.status !== 'CANCELLED'
  ).slice(0, 3);

  const filteredBookings = bookings.filter((booking) =>
    booking.artisan.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.jobDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ClientDashboardLayout>
      <Container className="py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section - Modern with date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-1">
                Welcome back, {session?.user?.name?.split(' ')[0]}! 👋
              </h1>
              <p className="text-neutral-600 text-sm sm:text-base">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-primary-50 to-primary-100 px-4 py-2 rounded-full border border-primary-200">
              <Sparkles size={18} className="text-primary-600" />
              <span className="text-sm font-semibold text-primary-700">Today's Overview</span>
            </div>
          </div>
        </motion.div>

        {/* Modern Stats Grid with Trends */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          {/* Total Bookings Today */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card variant="default" padding="lg" className="relative overflow-hidden border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full -mr-16 -mt-16" />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/30">
                    <Calendar className="text-white" size={20} />
                  </div>
                  {stats.total.trend.direction !== 'neutral' && (
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                      stats.total.trend.direction === 'up'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {stats.total.trend.direction === 'up' ? (
                        <TrendingUp size={12} />
                      ) : (
                        <TrendingDown size={12} />
                      )}
                      {stats.total.trend.percentage}%
                    </div>
                  )}
                </div>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">Today's Bookings</p>
                <p className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-1">{stats.total.today}</p>
                <p className="text-xs text-neutral-500">vs yesterday</p>
              </div>
            </Card>
          </motion.div>

          {/* Pending Today */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="default" padding="lg" className="relative overflow-hidden border-l-4 border-yellow-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-full -mr-16 -mt-16" />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg shadow-yellow-500/30">
                    <Clock className="text-white" size={20} />
                  </div>
                  {stats.pending.trend.direction !== 'neutral' && (
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                      stats.pending.trend.direction === 'up'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {stats.pending.trend.direction === 'up' ? (
                        <TrendingUp size={12} />
                      ) : (
                        <TrendingDown size={12} />
                      )}
                      {stats.pending.trend.percentage}%
                    </div>
                  )}
                </div>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">Pending Today</p>
                <p className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-1">{stats.pending.today}</p>
                <p className="text-xs text-neutral-500">awaiting response</p>
              </div>
            </Card>
          </motion.div>

          {/* In Progress Today */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card variant="default" padding="lg" className="relative overflow-hidden border-l-4 border-purple-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/5 to-transparent rounded-full -mr-16 -mt-16" />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg shadow-purple-500/30">
                    <Activity className="text-white" size={20} />
                  </div>
                  {stats.inProgress.trend.direction !== 'neutral' && (
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                      stats.inProgress.trend.direction === 'up'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {stats.inProgress.trend.direction === 'up' ? (
                        <TrendingUp size={12} />
                      ) : (
                        <TrendingDown size={12} />
                      )}
                      {stats.inProgress.trend.percentage}%
                    </div>
                  )}
                </div>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">In Progress Today</p>
                <p className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-1">{stats.inProgress.today}</p>
                <p className="text-xs text-neutral-500">active jobs</p>
              </div>
            </Card>
          </motion.div>

          {/* Completed Today */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card variant="default" padding="lg" className="relative overflow-hidden border-l-4 border-green-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/5 to-transparent rounded-full -mr-16 -mt-16" />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg shadow-green-500/30">
                    <CheckCircle className="text-white" size={20} />
                  </div>
                  {stats.completed.trend.direction !== 'neutral' && (
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                      stats.completed.trend.direction === 'up'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {stats.completed.trend.direction === 'up' ? (
                        <TrendingUp size={12} />
                      ) : (
                        <TrendingDown size={12} />
                      )}
                      {stats.completed.trend.percentage}%
                    </div>
                  )}
                </div>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">Completed Today</p>
                <p className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-1">{stats.completed.today}</p>
                <p className="text-xs text-neutral-500">finished jobs</p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Quotes to Approve Section */}
        {quotesToApprove.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Bell size={24} className="text-indigo-600" />
                <h2 className="text-2xl font-bold text-neutral-900">
                  Quotes Awaiting Your Approval
                </h2>
                <Badge variant="primary" size="md" className="bg-indigo-600">
                  {quotesToApprove.length}
                </Badge>
              </div>
              <p className="text-neutral-600">Review and approve quotes from artisans</p>
            </div>
            <div className="space-y-6">
              {quotesToApprove.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <QuoteApprovalCard
                    bookingId={booking.id}
                    artisanName={booking.artisan.user.name}
                    jobTitle={booking.jobTitle}
                    quotedPrice={Number(booking.quotedPrice)}
                    laborCost={booking.laborCost ? Number(booking.laborCost) : null}
                    materialCost={booking.materialCost ? Number(booking.materialCost) : null}
                    estimatedDays={booking.estimatedDays}
                    quoteNotes={booking.quoteNotes}
                    onApprove={fetchBookings}
                    onDecline={fetchBookings}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Modern CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 p-6 sm:p-8 shadow-2xl shadow-primary-500/30">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />

                <div className="relative z-10">
                  <div className="flex flex-col gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                          <Sparkles size={20} className="text-white" />
                        </div>
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                          Get Started
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                        Ready to hire an artisan?
                      </h3>
                      <p className="text-primary-50 text-sm sm:text-base max-w-xl">
                        Connect with thousands of verified professionals in your area. Get quotes, compare, and book with confidence.
                      </p>
                    </div>

                    <Link href="/artisans">
                      <Button
                        size="lg"
                        className="bg-white text-primary-600 hover:bg-primary-50 border-none shadow-xl w-full sm:w-auto"
                        icon={<Search size={20} />}
                      >
                        Browse Artisans
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recent Bookings */}
            <Card variant="default" padding="lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900">Recent Bookings</h3>
                  <p className="text-sm text-neutral-600 mt-1">Your latest service requests</p>
                </div>
                {bookings.length > 5 && (
                  <button
                    onClick={() => document.getElementById('all-bookings')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1"
                  >
                    View all
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>

              {recentBookings.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar size={48} className="text-neutral-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-neutral-900 mb-2">No bookings yet</h4>
                  <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                    Start by browsing our verified artisans and book your first service
                  </p>
                  <Link href="/artisans">
                    <Button variant="primary" size="md" icon={<Plus size={18} />}>
                      Create Booking
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentBookings.map((booking, index) => {
                    const statusConfig = STATUS_CONFIG[booking.status];
                    const StatusIcon = statusConfig.icon;

                    return (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card
                          variant="default"
                          padding="lg"
                          className="hover:shadow-lg transition-all hover:-translate-y-1 border-l-4 overflow-hidden"
                          style={{
                            borderLeftColor: booking.status === 'PENDING' ? '#eab308' :
                                            booking.status === 'ACCEPTED' ? '#3b82f6' :
                                            booking.status === 'IN_PROGRESS' ? '#a855f7' :
                                            booking.status === 'COMPLETED' ? '#22c55e' : '#ef4444'
                          }}
                        >
                          <div className="flex items-start gap-3 sm:gap-5">
                            <Link href={`/artisan/${booking.artisan.id}`}>
                              <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 cursor-pointer group">
                                {booking.artisan.profilePhoto ? (
                                  <Image
                                    src={booking.artisan.profilePhoto}
                                    alt={booking.artisan.user.name}
                                    fill
                                    className="rounded-2xl object-cover border-2 border-neutral-200 group-hover:border-primary-500 transition-colors"
                                  />
                                ) : (
                                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center border-2 border-neutral-200 group-hover:border-primary-500 transition-colors">
                                    <User size={24} className="sm:w-8 sm:h-8 text-neutral-600" />
                                  </div>
                                )}
                              </div>
                            </Link>

                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                                <div className="min-w-0 flex-1">
                                  <Link href={`/artisan/${booking.artisan.id}`}>
                                    <h4 className="text-base sm:text-lg font-semibold text-neutral-900 hover:text-primary-600 transition-colors mb-1 truncate">
                                      {booking.artisan.user.name}
                                    </h4>
                                  </Link>
                                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-neutral-600 flex-wrap">
                                    <div className="flex items-center gap-1">
                                      <Star size={14} className="text-yellow-500" fill="currentColor" />
                                      <span className="font-medium">{booking.artisan.rating.toFixed(1)}</span>
                                    </div>
                                    <span>•</span>
                                    <div className="flex items-center gap-1">
                                      <MapPin size={14} />
                                      <span className="truncate">{booking.artisan.city}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 sm:gap-2 whitespace-nowrap flex-shrink-0 ${statusConfig.bg} ${statusConfig.color} border ${statusConfig.border}`}>
                                  <StatusIcon size={14} className="sm:w-4 sm:h-4" />
                                  {statusConfig.label}
                                </div>
                              </div>

                              <p className="text-base text-neutral-700 mb-4 line-clamp-2 leading-relaxed">
                                {booking.jobDescription}
                              </p>

                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex items-center gap-4 text-sm text-neutral-600 flex-wrap">
                                  <div className="flex items-center gap-1.5">
                                    <Calendar size={16} />
                                    <span>{new Date(booking.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                  </div>
                                  {booking.quotedPrice && (
                                    <div className="font-bold text-green-600 text-base">
                                      ₦{Number(booking.quotedPrice).toLocaleString()}
                                    </div>
                                  )}
                                </div>

                                <div className="flex items-center gap-2 flex-wrap">
                                  {booking.status === 'WORK_COMPLETED' && booking.quotedPrice && (
                                    <Button
                                      variant="primary"
                                      size="md"
                                      onClick={() => handleConfirmCompletion(booking.id, Number(booking.quotedPrice))}
                                    >
                                      Confirm Completion
                                    </Button>
                                  )}
                                  <Link href={`/dashboard/client/bookings/${booking.id}`}>
                                    <Button variant="ghost" size="md" icon={<ArrowRight size={16} />} iconPosition="right">
                                      View Details
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Bookings */}
            {upcomingBookings.length > 0 && (
              <Card variant="default" padding="lg">
                <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <Clock size={20} className="text-primary-600" />
                  Upcoming Services
                </h3>
                <div className="space-y-3">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="p-4 bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-xl border border-primary-200">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center">
                          <Calendar size={18} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-neutral-900 truncate">
                            {booking.artisan.user.name}
                          </p>
                          <p className="text-xs text-neutral-600">
                            {booking.visitDate && new Date(booking.visitDate).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-neutral-700 line-clamp-2">
                        {booking.jobDescription}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

          </div>
        </div>

        {/* All Bookings Section */}
        {bookings.length > 5 && (
          <div id="all-bookings">
            <Card variant="default" padding="lg">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900">All Bookings</h3>
                  <p className="text-sm text-neutral-600 mt-1">Manage all your service requests</p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-initial">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search bookings..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full sm:w-64 pl-10 pr-4 py-2.5 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Status Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { value: 'all', label: 'All' },
                  { value: 'pending', label: 'Pending' },
                  { value: 'accepted', label: 'Accepted' },
                  { value: 'in_progress', label: 'In Progress' },
                  { value: 'completed', label: 'Completed' },
                ].map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setStatusFilter(filter.value)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      statusFilter === filter.value
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* Bookings List */}
              <div className="space-y-4">
                <AnimatePresence>
                  {filteredBookings.slice(5).map((booking, index) => {
                    const statusConfig = STATUS_CONFIG[booking.status];
                    const StatusIcon = statusConfig.icon;

                    return (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card
                          variant="default"
                          padding="lg"
                          className="hover:shadow-lg transition-all hover:-translate-y-1 border-l-4 overflow-hidden"
                          style={{
                            borderLeftColor: booking.status === 'PENDING' ? '#eab308' :
                                            booking.status === 'ACCEPTED' ? '#3b82f6' :
                                            booking.status === 'IN_PROGRESS' ? '#a855f7' :
                                            booking.status === 'COMPLETED' ? '#22c55e' : '#ef4444'
                          }}
                        >
                          <div className="flex items-start gap-3 sm:gap-5">
                            <Link href={`/artisan/${booking.artisan.id}`}>
                              <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 cursor-pointer group">
                                {booking.artisan.profilePhoto ? (
                                  <Image
                                    src={booking.artisan.profilePhoto}
                                    alt={booking.artisan.user.name}
                                    fill
                                    className="rounded-2xl object-cover border-2 border-neutral-200 group-hover:border-primary-500 transition-colors"
                                  />
                                ) : (
                                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center border-2 border-neutral-200 group-hover:border-primary-500 transition-colors">
                                    <User size={24} className="sm:w-8 sm:h-8 text-neutral-600" />
                                  </div>
                                )}
                              </div>
                            </Link>

                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                                <div className="min-w-0 flex-1">
                                  <Link href={`/artisan/${booking.artisan.id}`}>
                                    <h4 className="text-base sm:text-lg font-semibold text-neutral-900 hover:text-primary-600 transition-colors mb-1 truncate">
                                      {booking.artisan.user.name}
                                    </h4>
                                  </Link>
                                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-neutral-600 flex-wrap">
                                    <div className="flex items-center gap-1">
                                      <Star size={14} className="text-yellow-500" fill="currentColor" />
                                      <span className="font-medium">{booking.artisan.rating.toFixed(1)}</span>
                                    </div>
                                    <span>•</span>
                                    <div className="flex items-center gap-1">
                                      <MapPin size={14} />
                                      <span className="truncate">{booking.artisan.city}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 sm:gap-2 whitespace-nowrap flex-shrink-0 ${statusConfig.bg} ${statusConfig.color} border ${statusConfig.border}`}>
                                  <StatusIcon size={14} className="sm:w-4 sm:h-4" />
                                  {statusConfig.label}
                                </div>
                              </div>

                              <p className="text-base text-neutral-700 mb-4 line-clamp-2 leading-relaxed">
                                {booking.jobDescription}
                              </p>

                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex items-center gap-4 text-sm text-neutral-600 flex-wrap">
                                  <div className="flex items-center gap-1.5">
                                    <Calendar size={16} />
                                    <span>{new Date(booking.createdAt).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric'
                                    })}</span>
                                  </div>
                                  {booking.visitDate && (
                                    <div className="flex items-center gap-1.5 text-primary-600 font-medium">
                                      <Clock size={16} />
                                      <span>{new Date(booking.visitDate).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric'
                                      })}</span>
                                    </div>
                                  )}
                                  {booking.quotedPrice && (
                                    <div className="font-bold text-green-600 text-base">
                                      ₦{Number(booking.quotedPrice).toLocaleString()}
                                    </div>
                                  )}
                                </div>

                                <div className="flex items-center gap-2 flex-wrap">
                                  {booking.status === 'WORK_COMPLETED' && booking.quotedPrice && (
                                    <Button
                                      variant="primary"
                                      size="md"
                                      onClick={() => handleConfirmCompletion(booking.id, Number(booking.quotedPrice))}
                                    >
                                      Confirm Completion
                                    </Button>
                                  )}
                                  {booking.status === 'COMPLETED' && !booking.review && (
                                    <Button variant="outline" size="md">
                                      Leave Review
                                    </Button>
                                  )}
                                  <Link href={`/dashboard/client/bookings/${booking.id}`}>
                                    <Button variant="ghost" size="md" icon={<ArrowRight size={16} />} iconPosition="right">
                                      View Details
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </Card>
          </div>
        )}
      </Container>
    </ClientDashboardLayout>
  );
}
