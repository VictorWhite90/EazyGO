'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  Camera,
  Save,
  X,
  Building,
  Globe
} from 'lucide-react';
import { ClientDashboardLayout } from '@/components/layout/ClientDashboardLayout';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function ClientProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock profile data - in real app, fetch from API
  const [profile, setProfile] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: '+234 123 456 7890',
    address: '123 Lagos Street, VI',
    city: 'Lagos',
    state: 'Lagos State',
    country: 'Nigeria',
    joinedDate: 'January 2024',
    totalBookings: 12,
    completedBookings: 8,
    activeBookings: 2,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <ClientDashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </ClientDashboardLayout>
    );
  }

  const handleSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsEditing(false);
    }, 1000);
  };

  const userInitials = profile.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <ClientDashboardLayout>
      <Container className="py-8 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
            My Profile
          </h1>
          <p className="text-neutral-500 text-base">Manage your personal information and account settings</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card variant="default" padding="lg">
              {/* Profile Photo */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative group mb-4">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                    {userInitials}
                  </div>
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-neutral-200 hover:border-primary-500 transition-colors group">
                    <Camera size={18} className="text-neutral-600 group-hover:text-primary-600" />
                  </button>
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-1">{profile.name}</h2>
                <p className="text-neutral-500 text-sm mb-4">{profile.email}</p>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Calendar size={16} />
                  <span>Joined {profile.joinedDate}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-200">
                <div className="text-center">
                  <p className="text-2xl font-bold text-neutral-900">{profile.totalBookings}</p>
                  <p className="text-xs text-neutral-500 mt-1">Total</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{profile.completedBookings}</p>
                  <p className="text-xs text-neutral-500 mt-1">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{profile.activeBookings}</p>
                  <p className="text-xs text-neutral-500 mt-1">Active</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Right Column - Profile Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card variant="default" padding="lg">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-neutral-200">
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900">Personal Information</h3>
                  <p className="text-neutral-500 text-sm mt-1">Update your personal details</p>
                </div>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="md"
                    icon={<Edit2 size={18} />}
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="md"
                      icon={<X size={18} />}
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      size="md"
                      icon={<Save size={18} />}
                      onClick={handleSave}
                      loading={loading}
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>

              {/* Profile Form */}
              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                    <User size={16} />
                    Full Name
                  </label>
                  {isEditing ? (
                    <Input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-neutral-50 rounded-xl text-neutral-900">
                      {profile.name}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                    <Mail size={16} />
                    Email Address
                  </label>
                  <div className="px-4 py-3 bg-neutral-50 rounded-xl text-neutral-600">
                    {profile.email}
                    <span className="ml-2 text-xs text-neutral-500">(cannot be changed)</span>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                    <Phone size={16} />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <Input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-neutral-50 rounded-xl text-neutral-900">
                      {profile.phone}
                    </div>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                    <Building size={16} />
                    Street Address
                  </label>
                  {isEditing ? (
                    <Input
                      type="text"
                      value={profile.address}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      placeholder="Enter your street address"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-neutral-50 rounded-xl text-neutral-900">
                      {profile.address}
                    </div>
                  )}
                </div>

                {/* City, State, Country */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                      <MapPin size={16} />
                      City
                    </label>
                    {isEditing ? (
                      <Input
                        type="text"
                        value={profile.city}
                        onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                        placeholder="City"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-neutral-50 rounded-xl text-neutral-900">
                        {profile.city}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-neutral-700 mb-2 block">
                      State
                    </label>
                    {isEditing ? (
                      <Input
                        type="text"
                        value={profile.state}
                        onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                        placeholder="State"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-neutral-50 rounded-xl text-neutral-900">
                        {profile.state}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                      <Globe size={16} />
                      Country
                    </label>
                    {isEditing ? (
                      <Input
                        type="text"
                        value={profile.country}
                        onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                        placeholder="Country"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-neutral-50 rounded-xl text-neutral-900">
                        {profile.country}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </Container>
    </ClientDashboardLayout>
  );
}
