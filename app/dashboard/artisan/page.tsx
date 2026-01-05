'use client';

/**
 * Artisan Dashboard
 * Main dashboard for artisans to manage profile, bookings, and earnings
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Calendar,
  DollarSign,
  Star,
  MapPin,
  Phone,
  Mail,
  Edit,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Card, GlassCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FadeIn } from '@/components/animations';
import Image from 'next/image';

// Mock data - will be replaced with real data from API
const mockArtisan = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+234 800 123 4567',
  bio: 'Professional plumber with 10+ years of experience. Specializing in residential and commercial plumbing repairs, installations, and maintenance.',
  skills: ['Plumbing', 'Electrical', 'HVAC'],
  yearsExp: 10,
  hourlyRate: 5000,
  city: 'Lagos',
  state: 'Lagos State',
  serviceRadius: 20,
  rating: 4.8,
  reviewsCount: 127,
  jobsCompleted: 342,
  profilePhoto: null,
  verified: true,
  availability: 'Available',
};

const stats = [
  {
    label: 'Jobs Completed',
    value: '342',
    change: '+12%',
    icon: CheckCircle,
    color: 'text-success-600',
    bgColor: 'bg-success-100',
  },
  {
    label: 'Avg. Rating',
    value: '4.8',
    change: '+0.3',
    icon: Star,
    color: 'text-secondary-600',
    bgColor: 'bg-secondary-100',
  },
  {
    label: 'This Month',
    value: '₦285K',
    change: '+18%',
    icon: TrendingUp,
    color: 'text-primary-600',
    bgColor: 'bg-primary-100',
  },
  {
    label: 'Active Clients',
    value: '23',
    change: '+5',
    icon: Users,
    color: 'text-primary-600',
    bgColor: 'bg-primary-100',
  },
];

const recentBookings = [
  {
    id: 1,
    client: 'Sarah Johnson',
    service: 'Plumbing Repair',
    date: '2024-01-15',
    time: '2:00 PM',
    status: 'Confirmed',
    location: 'Victoria Island, Lagos',
  },
  {
    id: 2,
    client: 'Michael Chen',
    service: 'Electrical Installation',
    date: '2024-01-16',
    time: '10:00 AM',
    status: 'Pending',
    location: 'Lekki, Lagos',
  },
  {
    id: 3,
    client: 'Emma Williams',
    service: 'HVAC Maintenance',
    date: '2024-01-17',
    time: '3:30 PM',
    status: 'Confirmed',
    location: 'Ikoyi, Lagos',
  },
];

export default function ArtisanDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'profile'>('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 py-8">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              Welcome back, {mockArtisan.name}!
            </h1>
            <p className="text-neutral-600">
              Here's what's happening with your account today
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={mockArtisan.availability === 'Available' ? 'success' : 'neutral'} size="md">
              <div className="w-2 h-2 rounded-full bg-current mr-2" />
              {mockArtisan.availability}
            </Badge>
            <Button variant="primary" size="md" icon={<Edit size={18} />}>
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-neutral-200">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'bookings', label: 'Bookings' },
            { id: 'profile', label: 'Profile' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 font-medium transition-all relative ${
                activeTab === tab.id
                  ? 'text-primary-600'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <FadeIn key={stat.label} delay={index * 0.1}>
                  <Card variant="default" padding="lg" hover hoverScale={1.02}>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                        <stat.icon size={24} className={stat.color} />
                      </div>
                      <Badge variant="glass" size="sm" className="text-xs">
                        {stat.change}
                      </Badge>
                    </div>
                    <div className="text-3xl font-bold text-neutral-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-neutral-600">{stat.label}</div>
                  </Card>
                </FadeIn>
              ))}
            </div>

            {/* Recent Bookings */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-neutral-900">Upcoming Bookings</h2>
                <Button variant="ghost" size="sm">
                  View all
                </Button>
              </div>

              <div className="space-y-4">
                {recentBookings.map((booking, index) => (
                  <FadeIn key={booking.id} delay={index * 0.1}>
                    <Card variant="default" padding="lg" hover>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                            <Briefcase size={20} className="text-primary-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-neutral-900 mb-1">
                              {booking.service}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600">
                              <span className="flex items-center gap-1">
                                <Users size={14} />
                                {booking.client}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                {booking.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock size={14} />
                                {booking.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin size={14} />
                                {booking.location}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={booking.status === 'Confirmed' ? 'success' : 'neutral'}
                            size="sm"
                          >
                            {booking.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div>
            <GlassCard padding="lg" className="text-center py-12">
              <Calendar size={48} className="text-neutral-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Booking Management
              </h3>
              <p className="text-neutral-600 mb-6">
                View and manage all your bookings, inquiries, and appointments
              </p>
              <Button variant="primary" size="md">
                View All Bookings
              </Button>
            </GlassCard>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Info Card */}
            <div className="lg:col-span-1">
              <Card variant="default" padding="lg">
                <div className="text-center">
                  {/* Profile Photo */}
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    {mockArtisan.profilePhoto ? (
                      <Image
                        src={mockArtisan.profilePhoto}
                        alt={mockArtisan.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-4xl font-bold text-primary-600">
                          {mockArtisan.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    {mockArtisan.verified && (
                      <div className="absolute bottom-0 right-0 w-10 h-10 bg-success-500 rounded-full border-4 border-white flex items-center justify-center">
                        <CheckCircle size={20} className="text-white" />
                      </div>
                    )}
                  </div>

                  <h2 className="text-2xl font-bold text-neutral-900 mb-1">
                    {mockArtisan.name}
                  </h2>

                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Star size={18} className="text-secondary-500 fill-secondary-500" />
                    <span className="font-semibold text-neutral-900">{mockArtisan.rating}</span>
                    <span className="text-neutral-600">({mockArtisan.reviewsCount} reviews)</span>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {mockArtisan.skills.map((skill) => (
                      <Badge key={skill} variant="primary" size="sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <Button variant="primary" size="md" fullWidth icon={<Edit size={18} />}>
                    Edit Profile
                  </Button>
                </div>
              </Card>
            </div>

            {/* Details Card */}
            <div className="lg:col-span-2">
              <Card variant="default" padding="lg">
                <h3 className="text-xl font-semibold text-neutral-900 mb-6">
                  Profile Details
                </h3>

                <div className="space-y-6">
                  {/* Bio */}
                  <div>
                    <label className="text-sm font-medium text-neutral-700 mb-2 block">
                      About
                    </label>
                    <p className="text-neutral-600 leading-relaxed">{mockArtisan.bio}</p>
                  </div>

                  {/* Contact Info */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-neutral-700 mb-2 flex items-center gap-2">
                        <Mail size={16} />
                        Email
                      </label>
                      <p className="text-neutral-900">{mockArtisan.email}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-neutral-700 mb-2 flex items-center gap-2">
                        <Phone size={16} />
                        Phone
                      </label>
                      <p className="text-neutral-900">{mockArtisan.phone}</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-neutral-700 mb-2 flex items-center gap-2">
                        <MapPin size={16} />
                        Location
                      </label>
                      <p className="text-neutral-900">
                        {mockArtisan.city}, {mockArtisan.state}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-neutral-700 mb-2 block">
                        Service Radius
                      </label>
                      <p className="text-neutral-900">{mockArtisan.serviceRadius}km</p>
                    </div>
                  </div>

                  {/* Professional Info */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-neutral-700 mb-2 flex items-center gap-2">
                        <Briefcase size={16} />
                        Experience
                      </label>
                      <p className="text-neutral-900">{mockArtisan.yearsExp} years</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-neutral-700 mb-2 flex items-center gap-2">
                        <DollarSign size={16} />
                        Hourly Rate
                      </label>
                      <p className="text-neutral-900">₦{mockArtisan.hourlyRate.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
