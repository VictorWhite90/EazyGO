'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  Star,
  User,
  Settings,
  TrendingUp,
  Briefcase,
  Home,
  MapPin,
  Phone,
  Mail,
  Award,
  AlertCircle,
  Activity,
  Bell,
  Sparkles,
  TrendingDown,
  Menu,
  LogOut,
  ArrowRight,
} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { QuoteSubmissionForm } from '@/components/booking/QuoteSubmissionForm';

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
  client: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
  review: {
    id: string;
    rating: number;
    comment: string;
  } | null;
}

interface ArtisanProfile {
  id: string;
  userId: string;
  phone: string;
  bio: string;
  skills: string[];
  yearsExp: number;
  rating: number;
  totalJobs: number;
  verified: boolean;
  profilePhoto: string | null;
  city: string;
  state: string;
  user: {
    name: string;
    email: string;
  };
}

const STATUS_CONFIG: Record<string, any> = {
  PENDING: {
    label: 'Pending',
    color: 'text-yellow-700',
    bg: 'bg-yellow-100',
    border: 'border-yellow-300',
    icon: Clock,
  },
  ACCEPTED: {
    label: 'Accepted',
    color: 'text-blue-700',
    bg: 'bg-blue-100',
    border: 'border-blue-300',
    icon: CheckCircle,
  },
  VISIT_SCHEDULED: {
    label: 'Visit Scheduled',
    color: 'text-cyan-700',
    bg: 'bg-cyan-100',
    border: 'border-cyan-300',
    icon: Calendar,
  },
  QUOTE_PENDING: {
    label: 'Quote Pending',
    color: 'text-orange-700',
    bg: 'bg-orange-100',
    border: 'border-orange-300',
    icon: DollarSign,
  },
  QUOTE_SENT: {
    label: 'Quote Sent',
    color: 'text-indigo-700',
    bg: 'bg-indigo-100',
    border: 'border-indigo-300',
    icon: DollarSign,
  },
  QUOTE_APPROVED: {
    label: 'Quote Approved',
    color: 'text-teal-700',
    bg: 'bg-teal-100',
    border: 'border-teal-300',
    icon: CheckCircle,
  },
  IN_PROGRESS: {
    label: 'In Progress',
    color: 'text-purple-700',
    bg: 'bg-purple-100',
    border: 'border-purple-300',
    icon: Activity,
  },
  WORK_COMPLETED: {
    label: 'Work Completed',
    color: 'text-emerald-700',
    bg: 'bg-emerald-100',
    border: 'border-emerald-300',
    icon: CheckCircle,
  },
  COMPLETED: {
    label: 'Completed',
    color: 'text-green-700',
    bg: 'bg-green-100',
    border: 'border-green-300',
    icon: CheckCircle,
  },
};

export default function ArtisanDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [profile, setProfile] = useState<ArtisanProfile | null>(null);
  const [stats, setStats] = useState({ totalEarnings: 0, totalJobs: 0 });
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [quoteBooking, setQuoteBooking] = useState<Booking | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

      const response = await fetch(`/api/bookings/artisan?${params.toString()}`);
      const data = await response.json();

      if (data.error) {
        console.error('Error:', data.error);
        return;
      }

      setBookings(data.bookings || []);
      setProfile(data.profile);
      setStats(data.stats);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingAction = async (bookingId: string, action: string) => {
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
        alert(data.error || 'Failed to update booking');
        return;
      }

      if (action === 'complete_work') {
        alert('Work marked as completed! Waiting for client confirmation.');
      }

      fetchBookings();
      setQuoteBooking(null);
    } catch (error) {
      console.error('Error updating booking:', error);
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

  if (!profile) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <Card variant="default" padding="lg" className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Artisan Profile Not Found
          </h2>
          <p className="text-neutral-600 mb-6">
            You don't have an artisan profile. Please register as an artisan to access this dashboard.
          </p>
          <Link href="/auth/register/artisan">
            <Button variant="primary" size="md">
              Register as Artisan
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const bookingStats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'PENDING').length,
    inProgress: bookings.filter((b) => b.status === 'IN_PROGRESS').length,
    completed: bookings.filter((b) => b.status === 'COMPLETED').length,
  };

  const pendingBookings = bookings.filter((b) => b.status === 'PENDING');
  const activeBookings = bookings.filter((b) =>
    ['ACCEPTED', 'VISIT_SCHEDULED', 'QUOTE_PENDING', 'QUOTE_SENT', 'QUOTE_APPROVED', 'IN_PROGRESS'].includes(b.status)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/20">
      {/* Modern Top Navigation */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-50 shadow-sm backdrop-blur-sm bg-white/95">
        <Container>
          <div className="flex items-center justify-between py-3 sm:py-4">
            <Link href="/">
              <Image
                src="/EAZYGO LOGO.png"
                alt="EazyGO"
                width={140}
                height={56}
                className="h-10 sm:h-12 w-auto"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-2">
              <Link href="/">
                <Button variant="ghost" size="sm" icon={<Home size={16} />}>
                  Home
                </Button>
              </Link>
              <Link href={`/artisan/${profile.id}`}>
                <Button variant="ghost" size="sm" icon={<User size={16} />}>
                  Public Profile
                </Button>
              </Link>
              <Link href="/dashboard/artisan/settings">
                <Button variant="ghost" size="sm" icon={<Settings size={16} />}>
                  Settings
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <Menu size={24} className="text-neutral-700" />
            </button>
          </div>
        </Container>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-neutral-200 bg-white overflow-hidden"
            >
              <Container>
                <div className="py-3 space-y-1">
                  <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 rounded-lg transition-colors text-left">
                      <Home size={18} className="text-neutral-600" />
                      <span className="font-medium text-neutral-900">Home</span>
                    </button>
                  </Link>
                  <Link href={`/artisan/${profile.id}`} onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 rounded-lg transition-colors text-left">
                      <User size={18} className="text-neutral-600" />
                      <span className="font-medium text-neutral-900">Public Profile</span>
                    </button>
                  </Link>
                  <Link href="/dashboard/artisan/settings" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 rounded-lg transition-colors text-left">
                      <Settings size={18} className="text-neutral-600" />
                      <span className="font-medium text-neutral-900">Settings</span>
                    </button>
                  </Link>
                </div>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Container className="py-6 sm:py-8 px-4">
        {/* Modern Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 p-6 sm:p-8 shadow-2xl shadow-primary-500/30">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />

            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6">
                {/* Profile Picture */}
                <div className="relative flex-shrink-0">
                  {profile.profilePhoto ? (
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden ring-4 ring-white/30 shadow-xl">
                      <Image
                        src={profile.profilePhoto}
                        alt={profile.user.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center ring-4 ring-white/30 shadow-xl">
                      <User size={40} className="text-white" />
                    </div>
                  )}
                  {profile.verified && (
                    <div className="absolute -bottom-2 -right-2 bg-white text-primary-600 p-2 rounded-full shadow-lg">
                      <Award size={16} />
                    </div>
                  )}
                </div>

                {/* Profile Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white truncate">
                      {profile.user.name}
                    </h1>
                    {profile.verified && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white w-fit">
                        <Award size={14} />
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-white/90 mb-3">
                    <div className="flex items-center gap-1.5">
                      <Star size={16} className="text-yellow-300" fill="currentColor" />
                      <span className="font-semibold">{profile.rating.toFixed(1)}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={16} />
                      <span>{profile.city}, {profile.state}</span>
                    </div>
                    <span className="hidden sm:inline">•</span>
                    <div className="flex items-center gap-1.5">
                      <Briefcase size={16} />
                      <span>{profile.yearsExp} years experience</span>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm line-clamp-2 max-w-2xl">
                    {profile.bio}
                  </p>
                </div>
              </div>

              {/* Quick Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4">
                  <p className="text-white/70 text-xs font-medium mb-1">Total Earnings</p>
                  <p className="text-xl sm:text-2xl font-bold text-white">
                    ₦{stats.totalEarnings.toLocaleString()}
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4">
                  <p className="text-white/70 text-xs font-medium mb-1">Pending</p>
                  <p className="text-xl sm:text-2xl font-bold text-white">
                    {bookingStats.pending}
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4 col-span-2 sm:col-span-1">
                  <p className="text-white/70 text-xs font-medium mb-1">Completed</p>
                  <p className="text-xl sm:text-2xl font-bold text-white">
                    {bookingStats.completed}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Booking Requests Section */}
        {pendingBookings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">Booking Requests</h2>
                <p className="text-sm text-neutral-600 mt-1">New requests awaiting your response</p>
              </div>
              <Badge variant="primary" size="lg" className="bg-primary-600">
                {pendingBookings.length}
              </Badge>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {pendingBookings.map((booking, index) => {
                const statusConfig = STATUS_CONFIG[booking.status];
                const StatusIcon = statusConfig.icon;

                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card variant="default" padding="lg" className="border-l-4 border-yellow-500 hover:shadow-lg transition-all overflow-hidden">
                      <div className="flex flex-col gap-4">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                              <User size={24} className="text-yellow-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-base sm:text-lg font-semibold text-neutral-900 mb-1 truncate">
                                {booking.jobTitle}
                              </h3>
                              <p className="text-sm text-neutral-600 mb-2">
                                From: {booking.client.name}
                              </p>
                              <p className="text-sm text-neutral-700 line-clamp-2">
                                {booking.jobDescription}
                              </p>
                            </div>
                          </div>
                          <div className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap flex-shrink-0 w-fit ${statusConfig.bg} ${statusConfig.color} border ${statusConfig.border}`}>
                            <StatusIcon size={14} />
                            {statusConfig.label}
                          </div>
                        </div>

                        {/* Details */}
                        {booking.location && (
                          <div className="flex items-center gap-2 text-sm text-neutral-600">
                            <MapPin size={16} />
                            <span className="truncate">{booking.location}</span>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 border-t border-neutral-200">
                          <Button
                            variant="primary"
                            size="md"
                            onClick={() => handleBookingAction(booking.id, 'accept')}
                            className="w-full sm:w-auto"
                          >
                            Accept
                          </Button>
                          <Button
                            variant="outline"
                            size="md"
                            onClick={() => handleBookingAction(booking.id, 'decline')}
                            className="w-full sm:w-auto"
                          >
                            Decline
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Active Jobs Section */}
        {activeBookings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">Active Jobs</h2>
                <p className="text-sm text-neutral-600 mt-1">Jobs in progress or awaiting action</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {activeBookings.map((booking, index) => {
                const statusConfig = STATUS_CONFIG[booking.status];
                const StatusIcon = statusConfig.icon;

                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card variant="default" padding="md" className="h-full hover:shadow-lg transition-all overflow-hidden">
                      <div className="flex flex-col h-full">
                        <div className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 w-fit mb-3 ${statusConfig.bg} ${statusConfig.color} border ${statusConfig.border}`}>
                          <StatusIcon size={12} />
                          {statusConfig.label}
                        </div>
                        <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2">
                          {booking.jobTitle}
                        </h3>
                        <p className="text-sm text-neutral-600 mb-3 line-clamp-2 flex-1">
                          {booking.jobDescription}
                        </p>
                        <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                          <span className="text-xs text-neutral-500">
                            {booking.client.name}
                          </span>
                          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1">
                            View
                            <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {bookings.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 sm:py-16"
          >
            <Card variant="default" padding="lg" className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase size={40} className="text-neutral-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2">No bookings yet</h3>
              <p className="text-neutral-600 mb-6">
                You'll see booking requests from clients here once they start coming in.
              </p>
              <Link href={`/artisan/${profile.id}`}>
                <Button variant="primary" size="md">
                  View Public Profile
                </Button>
              </Link>
            </Card>
          </motion.div>
        )}
      </Container>

      {/* Quote Submission Modal */}
      <AnimatePresence>
        {quoteBooking && (
          <QuoteSubmissionForm
            bookingId={quoteBooking.id}
            jobTitle={quoteBooking.jobTitle}
            onClose={() => setQuoteBooking(null)}
            onSuccess={fetchBookings}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
