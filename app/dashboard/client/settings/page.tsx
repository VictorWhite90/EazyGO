'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Bell,
  Lock,
  Shield,
  Eye,
  Trash2,
  AlertTriangle,
  Save,
  Globe,
  Clock,
  DollarSign
} from 'lucide-react';
import { ClientDashboardLayout } from '@/components/layout/ClientDashboardLayout';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Toggle } from '@/components/ui/Toggle';

export default function ClientSettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailBookingUpdates: true,
    emailQuotes: true,
    emailReminders: true,
    smsNotifications: false,
    pushNotifications: true,
  });

  // Privacy Settings
  const [privacySettings, setPrivacySettings] = useState({
    showProfile: true,
    showPhoneToArtisans: true,
    showBookingHistory: false,
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
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

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
            Settings
          </h1>
          <p className="text-neutral-500 text-base">Manage your account preferences and privacy settings</p>
        </motion.div>

        <div className="max-w-4xl space-y-6">
          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card variant="default" padding="lg">
              <div className="mb-6 pb-6 border-b border-neutral-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Bell size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">Notification Preferences</h3>
                    <p className="text-sm text-neutral-500">Choose how you want to be notified</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <Toggle
                  checked={notificationSettings.emailBookingUpdates}
                  onChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, emailBookingUpdates: checked })
                  }
                  label="Email: Booking Updates"
                  description="Receive email notifications when your booking status changes"
                />

                <Toggle
                  checked={notificationSettings.emailQuotes}
                  onChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, emailQuotes: checked })
                  }
                  label="Email: Quotes Received"
                  description="Get notified when artisans send you quotes"
                />

                <Toggle
                  checked={notificationSettings.emailReminders}
                  onChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, emailReminders: checked })
                  }
                  label="Email: Appointment Reminders"
                  description="Receive reminders about upcoming appointments"
                />

                <Toggle
                  checked={notificationSettings.smsNotifications}
                  onChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, smsNotifications: checked })
                  }
                  label="SMS Notifications"
                  description="Receive important updates via text message"
                />

                <Toggle
                  checked={notificationSettings.pushNotifications}
                  onChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, pushNotifications: checked })
                  }
                  label="Push Notifications"
                  description="Get instant notifications on your device"
                />
              </div>
            </Card>
          </motion.div>

          {/* Privacy Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="default" padding="lg">
              <div className="mb-6 pb-6 border-b border-neutral-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Shield size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">Privacy & Visibility</h3>
                    <p className="text-sm text-neutral-500">Control who can see your information</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <Toggle
                  checked={privacySettings.showProfile}
                  onChange={(checked) =>
                    setPrivacySettings({ ...privacySettings, showProfile: checked })
                  }
                  label="Public Profile"
                  description="Allow artisans to view your profile information"
                />

                <Toggle
                  checked={privacySettings.showPhoneToArtisans}
                  onChange={(checked) =>
                    setPrivacySettings({ ...privacySettings, showPhoneToArtisans: checked })
                  }
                  label="Share Phone Number"
                  description="Display your phone number to artisans you've booked"
                />

                <Toggle
                  checked={privacySettings.showBookingHistory}
                  onChange={(checked) =>
                    setPrivacySettings({ ...privacySettings, showBookingHistory: checked })
                  }
                  label="Booking History Visibility"
                  description="Allow others to see your past bookings and reviews"
                />
              </div>
            </Card>
          </motion.div>

          {/* Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card variant="default" padding="lg">
              <div className="mb-6 pb-6 border-b border-neutral-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Globe size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">Preferences</h3>
                    <p className="text-sm text-neutral-500">Customize your experience</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                    <Globe size={16} />
                    Language
                  </label>
                  <select className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-900">
                    <option>English</option>
                    <option>Yoruba</option>
                    <option>Hausa</option>
                    <option>Igbo</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                    <Clock size={16} />
                    Timezone
                  </label>
                  <select className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-900">
                    <option>West Africa Time (WAT)</option>
                    <option>UTC</option>
                    <option>GMT</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                    <DollarSign size={16} />
                    Currency
                  </label>
                  <select className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-900">
                    <option>Nigerian Naira (₦)</option>
                    <option>US Dollar ($)</option>
                    <option>British Pound (£)</option>
                  </select>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Account Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card variant="default" padding="lg">
              <div className="mb-6 pb-6 border-b border-neutral-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Lock size={20} className="text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">Account Security</h3>
                    <p className="text-sm text-neutral-500">Manage your password and account access</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  variant="outline"
                  size="md"
                  fullWidth
                  icon={<Lock size={18} />}
                >
                  Change Password
                </Button>

                <Button
                  variant="outline"
                  size="md"
                  fullWidth
                  icon={<Eye size={18} />}
                >
                  Manage Login Sessions
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card variant="default" padding="lg" className="border-red-200">
              <div className="mb-6 pb-6 border-b border-red-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                    <AlertTriangle size={20} className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">Danger Zone</h3>
                    <p className="text-sm text-red-600">Irreversible actions - proceed with caution</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div>
                    <p className="font-medium text-neutral-900">Deactivate Account</p>
                    <p className="text-sm text-neutral-600 mt-1">Temporarily disable your account</p>
                  </div>
                  <Button variant="outline" size="md" className="border-red-300 text-red-700 hover:bg-red-50">
                    Deactivate
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div>
                    <p className="font-medium text-neutral-900">Delete Account</p>
                    <p className="text-sm text-neutral-600 mt-1">Permanently delete your account and all data</p>
                  </div>
                  <Button
                    variant="outline"
                    size="md"
                    icon={<Trash2 size={18} />}
                    className="border-red-500 text-red-700 hover:bg-red-100"
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-end gap-3 pt-4"
          >
            <Button
              variant="ghost"
              size="lg"
              onClick={() => router.push('/dashboard/client')}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="lg"
              icon={<Save size={20} />}
              onClick={handleSave}
              loading={saving}
            >
              Save All Settings
            </Button>
          </motion.div>
        </div>
      </Container>
    </ClientDashboardLayout>
  );
}
