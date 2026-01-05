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
  Search,
  Star,
  MapPin,
  User,
  Settings,
  ArrowRight,
  Bell,
  Heart,
  CreditCard,
  Activity,
  ChevronRight,
  Plus,
  Home,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface Booking {
  id: string;
  clientId: string;
  artisanId: string;
  status: 'PENDING' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  jobDescription: string;
  estimatedPrice: number | null;
  finalPrice: number | null;
  scheduledDate: string | null;
  completedDate: string | null;
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

const STATUS_CONFIG = {
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
  IN_PROGRESS: {
    label: 'In Progress',
    color: 'text-purple-700',
    bg: 'bg-purple-100',
    border: 'border-purple-300',
    icon: Activity,
    iconColor: 'text-purple-600',
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

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'PENDING').length,
    inProgress: bookings.filter((b) => b.status === 'IN_PROGRESS').length,
    completed: bookings.filter((b) => b.status === 'COMPLETED').length,
  };

  const recentBookings = bookings.slice(0, 5);
  const upcomingBookings = bookings.filter(
    (b) => b.scheduledDate && new Date(b.scheduledDate) > new Date() && b.status !== 'CANCELLED'
  ).slice(0, 3);

  const filteredBookings = bookings.filter((booking) =>
    booking.artisan.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.jobDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <button className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                <Bell size={20} className="text-neutral-600" />
                {stats.pending > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                )}
              </button>
              <Link href="/dashboard/client/settings">
                <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                  <Settings size={20} className="text-neutral-600" />
                </button>
              </Link>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-semibold shadow-lg">
                {session?.user?.name?.charAt(0) || 'U'}
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            Welcome back, {session?.user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-neutral-600 text-lg">Here's an overview of your bookings and services</p>
        </motion.div>

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
                  <p className="text-sm font-medium text-neutral-600 mb-1">Total Bookings</p>
                  <p className="text-3xl font-bold text-neutral-900">{stats.total}</p>
                  <p className="text-xs text-neutral-500 mt-1">All time</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Calendar className="text-white" size={28} />
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
                  <p className="text-sm font-medium text-neutral-600 mb-1">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                  <p className="text-xs text-neutral-500 mt-1">Awaiting response</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Clock className="text-white" size={28} />
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
                  <p className="text-3xl font-bold text-purple-600">{stats.inProgress}</p>
                  <p className="text-xs text-neutral-500 mt-1">Active jobs</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Activity className="text-white" size={28} />
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
                  <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                  <p className="text-xs text-neutral-500 mt-1">All time</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <CheckCircle className="text-white" size={28} />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card variant="default" padding="lg" className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 border-0 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={20} />
                      <Badge variant="secondary" size="sm" className="bg-white/20 text-white border-white/30">
                        Quick Action
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Need a Service?</h3>
                    <p className="text-primary-100 mb-4 max-w-md">
                      Browse our network of verified artisans and book professional services instantly
                    </p>
                    <Link href="/artisans">
                      <Button
                        variant="secondary"
                        size="md"
                        className="bg-white text-primary-600 hover:bg-primary-50"
                        icon={<Search size={18} />}
                      >
                        Browse Artisans
                      </Button>
                    </Link>
                  </div>
                  <div className="hidden md:block">
                    <div className="w-32 h-32 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <Zap size={56} className="text-white" />
                    </div>
                  </div>
                </div>
              </Card>
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
                          padding="md"
                          className="hover:shadow-md transition-all border-l-4"
                          style={{
                            borderLeftColor: booking.status === 'PENDING' ? '#eab308' :
                                            booking.status === 'ACCEPTED' ? '#3b82f6' :
                                            booking.status === 'IN_PROGRESS' ? '#a855f7' :
                                            booking.status === 'COMPLETED' ? '#22c55e' : '#ef4444'
                          }}
                        >
                          <div className="flex items-start gap-4">
                            <Link href={`/artisan/${booking.artisan.id}`}>
                              <div className="relative w-14 h-14 flex-shrink-0 cursor-pointer group">
                                {booking.artisan.profilePhoto ? (
                                  <Image
                                    src={booking.artisan.profilePhoto}
                                    alt={booking.artisan.user.name}
                                    fill
                                    className="rounded-xl object-cover border-2 border-neutral-200 group-hover:border-primary-500 transition-colors"
                                  />
                                ) : (
                                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center border-2 border-neutral-200 group-hover:border-primary-500 transition-colors">
                                    <User size={24} className="text-neutral-600" />
                                  </div>
                                )}
                              </div>
                            </Link>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <div>
                                  <Link href={`/artisan/${booking.artisan.id}`}>
                                    <h4 className="font-semibold text-neutral-900 hover:text-primary-600 transition-colors">
                                      {booking.artisan.user.name}
                                    </h4>
                                  </Link>
                                  <div className="flex items-center gap-2 text-sm text-neutral-600 mt-1">
                                    <div className="flex items-center gap-1">
                                      <Star size={14} className="text-yellow-500" fill="currentColor" />
                                      <span className="font-medium">{booking.artisan.rating.toFixed(1)}</span>
                                    </div>
                                    <span>•</span>
                                    <div className="flex items-center gap-1">
                                      <MapPin size={14} />
                                      <span>{booking.artisan.city}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 ${statusConfig.bg} ${statusConfig.color} border-2 ${statusConfig.border}`}>
                                  <StatusIcon size={14} />
                                  {statusConfig.label}
                                </div>
                              </div>

                              <p className="text-sm text-neutral-700 mb-3 line-clamp-2">
                                {booking.jobDescription}
                              </p>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-xs text-neutral-600">
                                  <div className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    <span>{new Date(booking.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                  </div>
                                  {booking.estimatedPrice && (
                                    <div className="font-semibold text-green-600 text-sm">
                                      ₦{booking.estimatedPrice.toLocaleString()}
                                    </div>
                                  )}
                                </div>

                                <Link href={`/dashboard/client/bookings/${booking.id}`}>
                                  <Button variant="ghost" size="sm">
                                    View Details
                                    <ArrowRight size={14} className="ml-1" />
                                  </Button>
                                </Link>
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
                            {booking.scheduledDate && new Date(booking.scheduledDate).toLocaleDateString('en-US', {
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

            {/* Quick Links */}
            <Card variant="default" padding="lg">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                {[
                  { icon: Heart, label: 'Saved Artisans', href: '/dashboard/client/saved', color: 'text-red-500', bgColor: 'bg-red-50' },
                  { icon: CreditCard, label: 'Payment Methods', href: '/dashboard/client/payments', color: 'text-blue-500', bgColor: 'bg-blue-50' },
                  { icon: User, label: 'My Profile', href: '/dashboard/client/profile', color: 'text-purple-500', bgColor: 'bg-purple-50' },
                  { icon: Settings, label: 'Settings', href: '/dashboard/client/settings', color: 'text-neutral-600', bgColor: 'bg-neutral-50' },
                ].map((link) => (
                  <Link key={link.label} href={link.href}>
                    <button className="w-full flex items-center gap-3 p-3 hover:bg-neutral-50 rounded-xl transition-all group">
                      <div className={`w-10 h-10 ${link.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <link.icon size={18} className={link.color} />
                      </div>
                      <span className="text-sm font-medium text-neutral-700 flex-1 text-left">{link.label}</span>
                      <ChevronRight size={16} className="text-neutral-400 group-hover:text-primary-600 transition-colors" />
                    </button>
                  </Link>
                ))}
              </div>
            </Card>
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
                            <div className="flex items-start gap-4 flex-1">
                              <Link href={`/artisan/${booking.artisan.id}`}>
                                <div className="relative w-16 h-16 flex-shrink-0 cursor-pointer group">
                                  {booking.artisan.profilePhoto ? (
                                    <Image
                                      src={booking.artisan.profilePhoto}
                                      alt={booking.artisan.user.name}
                                      fill
                                      className="rounded-xl object-cover border-2 border-neutral-200 group-hover:border-primary-500 transition-colors"
                                    />
                                  ) : (
                                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center border-2 border-neutral-200 group-hover:border-primary-500 transition-colors">
                                      <User size={28} className="text-neutral-600" />
                                    </div>
                                  )}
                                </div>
                              </Link>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4 mb-3">
                                  <div>
                                    <Link href={`/artisan/${booking.artisan.id}`}>
                                      <h4 className="text-lg font-semibold text-neutral-900 hover:text-primary-600 transition-colors">
                                        {booking.artisan.user.name}
                                      </h4>
                                    </Link>
                                    <div className="flex items-center gap-3 text-sm text-neutral-600 mt-1">
                                      <div className="flex items-center gap-1">
                                        <Star size={14} className="text-yellow-500" fill="currentColor" />
                                        <span className="font-medium">{booking.artisan.rating.toFixed(1)}</span>
                                      </div>
                                      <span>•</span>
                                      <div className="flex items-center gap-1">
                                        <MapPin size={14} />
                                        <span>{booking.artisan.city}</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${statusConfig.bg} ${statusConfig.color} border-2 ${statusConfig.border}`}>
                                    <StatusIcon size={16} />
                                    {statusConfig.label}
                                  </div>
                                </div>

                                <p className="text-neutral-800 font-medium mb-4 line-clamp-2">
                                  {booking.jobDescription}
                                </p>

                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-6 text-sm text-neutral-600">
                                    <div className="flex items-center gap-2">
                                      <Calendar size={16} />
                                      <span>{new Date(booking.createdAt).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                      })}</span>
                                    </div>
                                    {booking.scheduledDate && (
                                      <div className="flex items-center gap-2 text-primary-600 font-medium">
                                        <Clock size={16} />
                                        <span>{new Date(booking.scheduledDate).toLocaleDateString('en-US', {
                                          month: 'short',
                                          day: 'numeric'
                                        })}</span>
                                      </div>
                                    )}
                                    {booking.estimatedPrice && (
                                      <div className="font-semibold text-green-600 text-base flex items-center gap-1">
                                        ₦{booking.estimatedPrice.toLocaleString()}
                                      </div>
                                    )}
                                  </div>

                                  <div className="flex items-center gap-3">
                                    {booking.status === 'COMPLETED' && !booking.review && (
                                      <Button variant="outline" size="sm">
                                        Leave Review
                                      </Button>
                                    )}
                                    <Link href={`/dashboard/client/bookings/${booking.id}`}>
                                      <Button variant="primary" size="sm">
                                        View Details
                                      </Button>
                                    </Link>
                                  </div>
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
    </div>
  );
}
