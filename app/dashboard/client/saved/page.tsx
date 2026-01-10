'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Heart,
  Star,
  MapPin,
  Calendar,
  Search,
  X,
  CheckCircle,
  DollarSign
} from 'lucide-react';
import { ClientDashboardLayout } from '@/components/layout/ClientDashboardLayout';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

interface SavedArtisan {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  reviewCount: number;
  services: string[];
  location: string;
  priceRange: string;
  completedJobs: number;
  verified: boolean;
  responseTime: string;
}

export default function SavedArtisansPage() {
  const { status } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterService, setFilterService] = useState('all');
  const [filterRating, setFilterRating] = useState('all');

  // Mock data - in production, fetch from API
  const [savedArtisans] = useState<SavedArtisan[]>([
    {
      id: '1',
      name: 'John Doe',
      rating: 4.8,
      reviewCount: 124,
      services: ['Plumbing', 'Pipe Installation'],
      location: 'Lekki, Lagos',
      priceRange: '₦5,000 - ₦15,000',
      completedJobs: 156,
      verified: true,
      responseTime: 'Within 1 hour',
    },
    {
      id: '2',
      name: 'Jane Smith',
      rating: 4.9,
      reviewCount: 89,
      services: ['Electrical', 'Wiring'],
      location: 'Victoria Island, Lagos',
      priceRange: '₦8,000 - ₦20,000',
      completedJobs: 98,
      verified: true,
      responseTime: 'Within 30 mins',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      rating: 4.7,
      reviewCount: 156,
      services: ['Painting', 'Interior Design'],
      location: 'Ikeja, Lagos',
      priceRange: '₦10,000 - ₦30,000',
      completedJobs: 203,
      verified: true,
      responseTime: 'Within 2 hours',
    },
    {
      id: '4',
      name: 'Sarah Williams',
      rating: 4.6,
      reviewCount: 67,
      services: ['Carpentry', 'Furniture'],
      location: 'Surulere, Lagos',
      priceRange: '₦12,000 - ₦25,000',
      completedJobs: 89,
      verified: false,
      responseTime: 'Within 3 hours',
    },
  ]);

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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleRemove = (id: string) => {
    // In production, call API to remove from saved
    console.log('Remove artisan:', id);
  };

  const filteredArtisans = savedArtisans.filter((artisan) => {
    const matchesSearch =
      artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artisan.services.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      artisan.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesService =
      filterService === 'all' ||
      artisan.services.some((s) => s.toLowerCase().includes(filterService.toLowerCase()));

    const matchesRating =
      filterRating === 'all' ||
      (filterRating === '4.5+' && artisan.rating >= 4.5) ||
      (filterRating === '4+' && artisan.rating >= 4.0);

    return matchesSearch && matchesService && matchesRating;
  });

  return (
    <ClientDashboardLayout>
      <Container className="py-8 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <Heart size={24} className="text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
                Saved Artisans
              </h1>
            </div>
          </div>
          <p className="text-neutral-500 text-base">
            Your favorite artisans for quick bookings
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card variant="default" padding="lg" className="bg-gradient-to-r from-primary-50 to-purple-50">
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Heart size={20} className="text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-neutral-600 font-medium">Saved Artisans</p>
                  <p className="text-2xl font-bold text-neutral-900">{savedArtisans.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <CheckCircle size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-neutral-600 font-medium">Verified</p>
                  <p className="text-2xl font-bold text-neutral-900">
                    {savedArtisans.filter((a) => a.verified).length}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Card variant="default" padding="lg">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search by name, service, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Service Filter */}
              <div className="flex gap-2">
                <select
                  value={filterService}
                  onChange={(e) => setFilterService(e.target.value)}
                  className="px-4 py-2.5 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm min-w-[140px]"
                >
                  <option value="all">All Services</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="painting">Painting</option>
                  <option value="carpentry">Carpentry</option>
                </select>

                {/* Rating Filter */}
                <select
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                  className="px-4 py-2.5 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm min-w-[120px]"
                >
                  <option value="all">All Ratings</option>
                  <option value="4.5+">4.5+ Stars</option>
                  <option value="4+">4+ Stars</option>
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {(searchQuery || filterService !== 'all' || filterRating !== 'all') && (
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-neutral-200">
                <span className="text-sm font-medium text-neutral-700">Active filters:</span>
                {searchQuery && (
                  <Badge variant="neutral" className="flex items-center gap-1">
                    Search: {searchQuery}
                    <button onClick={() => setSearchQuery('')} className="ml-1">
                      <X size={12} />
                    </button>
                  </Badge>
                )}
                {filterService !== 'all' && (
                  <Badge variant="neutral" className="flex items-center gap-1">
                    Service: {filterService}
                    <button onClick={() => setFilterService('all')} className="ml-1">
                      <X size={12} />
                    </button>
                  </Badge>
                )}
                {filterRating !== 'all' && (
                  <Badge variant="neutral" className="flex items-center gap-1">
                    Rating: {filterRating}
                    <button onClick={() => setFilterRating('all')} className="ml-1">
                      <X size={12} />
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </Card>
        </motion.div>

        {/* Artisan Grid */}
        {filteredArtisans.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card variant="default" padding="lg">
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart size={48} className="text-neutral-400" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                  {searchQuery || filterService !== 'all' || filterRating !== 'all'
                    ? 'No artisans match your filters'
                    : 'No saved artisans yet'}
                </h3>
                <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                  {searchQuery || filterService !== 'all' || filterRating !== 'all'
                    ? 'Try adjusting your search criteria or filters'
                    : 'Start saving your favorite artisans for quick access and easy bookings'}
                </p>
                <Link href="/artisans">
                  <Button variant="primary" size="lg" icon={<Search size={20} />}>
                    Browse Artisans
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtisans.map((artisan, index) => (
              <motion.div
                key={artisan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card
                  variant="default"
                  padding="lg"
                  className="hover:shadow-lg transition-all h-full flex flex-col"
                >
                  {/* Header with Remove Button */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {/* Avatar */}
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-lg font-bold shadow-md flex-shrink-0">
                        {getInitials(artisan.name)}
                      </div>

                      {/* Name and Rating */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-neutral-900 text-lg truncate">
                            {artisan.name}
                          </h3>
                          {artisan.verified && (
                            <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          <Star size={14} className="text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold text-neutral-900 text-sm">
                            {artisan.rating}
                          </span>
                          <span className="text-neutral-500 text-xs">
                            ({artisan.reviewCount} reviews)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(artisan.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                      title="Remove from saved"
                    >
                      <Heart
                        size={20}
                        className="text-red-600 fill-red-600 group-hover:scale-110 transition-transform"
                      />
                    </button>
                  </div>

                  {/* Services */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {artisan.services.slice(0, 2).map((service) => (
                      <Badge key={service} variant="primary" size="sm">
                        {service}
                      </Badge>
                    ))}
                    {artisan.services.length > 2 && (
                      <Badge variant="neutral" size="sm">
                        +{artisan.services.length - 2}
                      </Badge>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4 flex-1">
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <MapPin size={14} className="text-neutral-400 flex-shrink-0" />
                      <span className="truncate">{artisan.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <DollarSign size={14} className="text-neutral-400 flex-shrink-0" />
                      <span>{artisan.priceRange}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <CheckCircle size={14} className="text-neutral-400 flex-shrink-0" />
                      <span>{artisan.completedJobs} jobs completed</span>
                    </div>
                  </div>

                  {/* Response Time Badge */}
                  <div className="mb-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                      <span className="text-xs font-medium text-green-700">
                        {artisan.responseTime}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-neutral-200">
                    <Link href={`/artisan/${artisan.id}`} className="flex-1">
                      <Button variant="outline" size="md" fullWidth>
                        View Profile
                      </Button>
                    </Link>
                    <Link href={`/booking/create?artisan=${artisan.id}`} className="flex-1">
                      <Button variant="primary" size="md" fullWidth icon={<Calendar size={16} />}>
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Results Count */}
        {filteredArtisans.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-neutral-600">
              Showing {filteredArtisans.length} of {savedArtisans.length} saved artisan
              {savedArtisans.length !== 1 ? 's' : ''}
            </p>
          </motion.div>
        )}
      </Container>
    </ClientDashboardLayout>
  );
}
