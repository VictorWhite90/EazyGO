'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
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

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  ACCEPTED: 'bg-blue-100 text-blue-700 border-blue-300',
  VISIT_SCHEDULED: 'bg-cyan-100 text-cyan-700 border-cyan-300',
  QUOTE_PENDING: 'bg-orange-100 text-orange-700 border-orange-300',
  QUOTE_SENT: 'bg-indigo-100 text-indigo-700 border-indigo-300',
  QUOTE_APPROVED: 'bg-teal-100 text-teal-700 border-teal-300',
  QUOTE_DECLINED: 'bg-red-100 text-red-700 border-red-300',
  IN_PROGRESS: 'bg-purple-100 text-purple-700 border-purple-300',
  WORK_COMPLETED: 'bg-emerald-100 text-emerald-700 border-emerald-300',
  COMPLETED: 'bg-green-100 text-green-700 border-green-300',
  CANCELLED: 'bg-red-100 text-red-700 border-red-300',
  DISPUTED: 'bg-gray-100 text-gray-700 border-gray-300',
};

const STATUS_ICONS: Record<string, any> = {
  PENDING: Clock,
  ACCEPTED: CheckCircle,
  VISIT_SCHEDULED: Calendar,
  QUOTE_PENDING: DollarSign,
  QUOTE_SENT: DollarSign,
  QUOTE_APPROVED: CheckCircle,
  QUOTE_DECLINED: XCircle,
  IN_PROGRESS: Clock,
  WORK_COMPLETED: CheckCircle,
  COMPLETED: CheckCircle,
  CANCELLED: XCircle,
  DISPUTED: AlertCircle,
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

      // Show success message for certain actions
      if (action === 'complete_work') {
        alert('Work marked as completed! Waiting for client confirmation.');
      }

      // Refresh bookings list
      fetchBookings();
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
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/20">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-50 shadow-sm">
        <Container>
          <div className="flex items-center justify-between py-4">
            <Link href="/">
              <Image
                src="/EAZYGO LOGO.png"
                alt="EazyGO"
                width={180}
                height={72}
                className="h-14 md:h-16 w-auto"
              />
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/">
                <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors" title="Back to Home">
                  <Home size={20} className="text-neutral-600" />
                </button>
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
          </div>
        </Container>
      </div>

      <Container className="py-8">
        {/* Profile Hero Section */}
        <div className="mb-8">
          <Card variant="glass" padding="lg" className="overflow-hidden">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Profile Picture */}
              <div className="relative flex-shrink-0">
                {profile.profilePhoto ? (
                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-primary-100 shadow-lg">
                    <Image
                      src={profile.profilePhoto}
                      alt={profile.user.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center ring-4 ring-primary-100 shadow-lg">
                    <User size={48} className="text-white" />
                  </div>
                )}
                {profile.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-full shadow-lg">
                    <Award size={20} />
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h1 className="text-3xl font-bold text-neutral-900 mb-1">
                      {profile.user.name}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-neutral-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Mail size={14} />
                        {profile.user.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone size={14} />
                        {profile.phone}
                      </div>
                      {profile.city && (
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          {profile.city}{profile.state && `, ${profile.state}`}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                        <Star size={16} className="text-yellow-600 fill-yellow-600" />
                        <span className="font-semibold text-yellow-900">{profile.rating.toFixed(1)}</span>
                      </div>
                      <div className="text-sm text-neutral-600">
                        {profile.totalJobs} {profile.totalJobs === 1 ? 'job' : 'jobs'} completed
                      </div>
                      {profile.yearsExp > 0 && (
                        <div className="text-sm text-neutral-600">
                          {profile.yearsExp} {profile.yearsExp === 1 ? 'year' : 'years'} experience
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                {profile.bio && (
                  <p className="text-neutral-700 mb-4 leading-relaxed">
                    {profile.bio}
                  </p>
                )}

                {/* Skills */}
                {profile.skills && profile.skills.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-neutral-600 mb-2">Skills & Expertise</p>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill) => (
                        <Badge key={skill} variant="primary" size="md">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Verification Alert */}
        {!profile.verified && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card variant="default" padding="md" className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="text-yellow-600" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900 mb-1 text-lg">
                    Get Verified & Stand Out
                  </h3>
                  <p className="text-sm text-neutral-700 mb-3">
                    Verified artisans receive 3x more booking requests. Complete your verification to build trust with clients.
                  </p>
                  <Button variant="primary" size="sm">
                    Start Verification Process
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card variant="default" padding="md" className="hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600 mb-1">Total Earnings</p>
                  <p className="text-3xl font-bold text-green-600">
                    ₦{stats.totalEarnings.toLocaleString()}
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">All time</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <DollarSign className="text-white" size={28} />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="default" padding="md" className="hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600 mb-1">Pending Requests</p>
                  <p className="text-3xl font-bold text-yellow-600">{bookingStats.pending}</p>
                  <p className="text-xs text-neutral-500 mt-1">Awaiting response</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <AlertCircle className="text-white" size={28} />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card variant="default" padding="md" className="hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600 mb-1">In Progress</p>
                  <p className="text-3xl font-bold text-purple-600">{bookingStats.inProgress}</p>
                  <p className="text-xs text-neutral-500 mt-1">Active jobs</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Clock className="text-white" size={28} />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card variant="default" padding="md" className="hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600 mb-1">Completed</p>
                  <p className="text-3xl font-bold text-primary-600">{profile.totalJobs}</p>
                  <p className="text-xs text-neutral-500 mt-1">Lifetime jobs</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Briefcase className="text-white" size={28} />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Bookings Section */}
        <Card variant="default" padding="lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Booking Requests</h2>
              <p className="text-sm text-neutral-600 mt-1">Manage your client bookings</p>
            </div>

            {/* Status Filter */}
            <div className="flex gap-2 flex-wrap">
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
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={48} className="text-neutral-400" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                No booking requests yet
              </h3>
              <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                Your bookings will appear here when clients request your services. Make sure your profile is complete to attract more clients.
              </p>
              <Link href={`/artisan/${profile.id}`}>
                <Button variant="primary" size="md">View Your Public Profile</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking, index) => {
                const StatusIcon = STATUS_ICONS[booking.status];
                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      variant="default"
                      padding="md"
                      className="hover:shadow-md transition-all border-l-4"
                      style={{
                        borderLeftColor: booking.status === 'PENDING' ? '#eab308' :
                                        booking.status === 'ACCEPTED' ? '#3b82f6' :
                                        booking.status === 'IN_PROGRESS' ? '#a855f7' :
                                        booking.status === 'COMPLETED' ? '#22c55e' : '#ef4444'
                      }}
                    >
                      <div className="flex flex-col lg:flex-row gap-4">
                        {/* Client Info */}
                        <div className="flex items-start gap-4 flex-1">
                          {/* Avatar */}
                          <div className="relative w-14 h-14 flex-shrink-0">
                            {booking.client.image ? (
                              <Image
                                src={booking.client.image}
                                alt={booking.client.name}
                                fill
                                className="rounded-xl object-cover border-2 border-neutral-200"
                              />
                            ) : (
                              <div className="w-full h-full rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
                                <User size={24} className="text-neutral-600" />
                              </div>
                            )}
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div>
                                <h3 className="text-lg font-semibold text-neutral-900">
                                  {booking.client.name}
                                </h3>
                                <p className="text-sm text-neutral-600">{booking.client.email}</p>
                              </div>

                              {/* Status Badge */}
                              <div
                                className={`px-3 py-1 rounded-full text-xs font-semibold border-2 flex items-center gap-1 ${STATUS_COLORS[booking.status]}`}
                              >
                                <StatusIcon size={14} />
                                {booking.status.replace('_', ' ')}
                              </div>
                            </div>

                            {/* Job Description */}
                            <p className="text-neutral-800 font-medium mb-3">
                              {booking.jobDescription}
                            </p>

                            {/* Client Notes */}
                            {booking.clientNotes && (
                              <div className="bg-neutral-50 border border-neutral-200 p-3 rounded-lg mb-3">
                                <p className="text-xs font-semibold text-neutral-600 mb-1">
                                  Client Notes:
                                </p>
                                <p className="text-sm text-neutral-700">{booking.clientNotes}</p>
                              </div>
                            )}

                            {/* Meta Info */}
                            <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
                              <div className="flex items-center gap-1">
                                <Calendar size={14} />
                                <span>
                                  {new Date(booking.createdAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </span>
                              </div>
                              {booking.visitDate && (
                                <div className="flex items-center gap-1 text-primary-600 font-medium">
                                  <Clock size={14} />
                                  <span>
                                    Visit: {new Date(booking.visitDate).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric'
                                    })}
                                  </span>
                                </div>
                              )}
                              {booking.quotedPrice && (
                                <div className="flex items-center gap-1 font-semibold text-green-600">
                                  <DollarSign size={14} />
                                  ₦{Number(booking.quotedPrice).toLocaleString()}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-row lg:flex-col gap-2 lg:items-end">
                          {booking.status === 'PENDING' && (
                            <>
                              <Button
                                variant="primary"
                                size="sm"
                                className="flex-1 lg:flex-initial"
                                onClick={() => handleBookingAction(booking.id, 'accept')}
                              >
                                Accept
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 lg:flex-initial"
                                onClick={() => handleBookingAction(booking.id, 'reject')}
                              >
                                Decline
                              </Button>
                            </>
                          )}
                          {(booking.status === 'ACCEPTED' || booking.status === 'VISIT_SCHEDULED') && (
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => setQuoteBooking(booking)}
                            >
                              Submit Quote
                            </Button>
                          )}
                          {booking.status === 'QUOTE_APPROVED' && (
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => {
                                if (confirm('Ready to start work on this project?')) {
                                  handleBookingAction(booking.id, 'start_work');
                                }
                              }}
                            >
                              Start Work
                            </Button>
                          )}
                          {booking.status === 'IN_PROGRESS' && (
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => {
                                if (confirm('Have you completed all work for this project?')) {
                                  handleBookingAction(booking.id, 'complete_work');
                                }
                              }}
                            >
                              Mark as Complete
                            </Button>
                          )}
                          {booking.status === 'WORK_COMPLETED' && (
                            <div className="bg-green-50 border-2 border-green-300 px-3 py-2 rounded-lg">
                              <p className="text-xs font-semibold text-green-800">
                                Awaiting client confirmation
                              </p>
                            </div>
                          )}
                          {booking.status === 'COMPLETED' && booking.quotedPrice && (
                            <div className="bg-blue-50 border-2 border-blue-300 px-3 py-2 rounded-lg">
                              <p className="text-xs font-semibold text-blue-800 mb-1">
                                Commission Due
                              </p>
                              <p className="text-sm font-bold text-blue-900">
                                ₦{(Number(booking.quotedPrice) * 0.1).toLocaleString()}
                              </p>
                            </div>
                          )}
                          <Link href={`/dashboard/artisan/bookings/${booking.id}`}>
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </Card>
      </Container>

      {/* Quote Submission Modal */}
      {quoteBooking && (
        <QuoteSubmissionForm
          bookingId={quoteBooking.id}
          jobTitle={quoteBooking.jobTitle}
          onClose={() => setQuoteBooking(null)}
          onSuccess={() => {
            setQuoteBooking(null);
            fetchBookings();
          }}
        />
      )}
    </div>
  );
}
