'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  MapPin,
  Briefcase,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  Award,
  ArrowLeft,
} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { BookingRequestForm } from '@/components/booking/BookingRequestForm';

interface Review {
  id: string;
  rating: number;
  comment: string;
  photos: string[];
  createdAt: string;
}

interface Booking {
  id: string;
  jobDescription: string;
  completedDate: string;
  review: Review | null;
  client: {
    id: string;
    name: string;
    image: string | null;
  };
}

interface Artisan {
  id: string;
  userId: string;
  bio: string;
  skills: string[];
  yearsExp: number;
  hourlyRate: number;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  serviceRadius: number;
  profilePhoto: string;
  verified: boolean;
  rating: number;
  totalJobs: number;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    createdAt: string;
  };
  bookings: Booking[];
}

export default function ArtisanProfilePage() {
  const params = useParams();
  const artisanId = params.id as string;

  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    fetchArtisan();
  }, [artisanId]);

  const fetchArtisan = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/artisans/${artisanId}`);
      const data = await response.json();
      setArtisan(data.artisan);
    } catch (error) {
      console.error('Error fetching artisan:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!artisan) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Card variant="default" padding="lg" className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Artisan Not Found
          </h2>
          <p className="text-neutral-600 mb-6">
            The artisan profile you're looking for doesn't exist.
          </p>
          <Link href="/artisans">
            <Button variant="primary" size="md">
              Browse Artisans
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const reviews = artisan.bookings
    .filter((b) => b.review)
    .map((b) => ({ ...b.review!, booking: b }));

  return (
    <div className="min-h-screen bg-neutral-50 pb-12">
      {/* Back Button */}
      <div className="bg-white border-b border-neutral-200">
        <Container className="py-4">
          <Link
            href="/artisans"
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Search
          </Link>
        </Container>
      </div>

      <Container className="mt-8">
        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Profile Header */}
            <Card variant="default" padding="lg">
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Profile Photo */}
                <div className="relative w-32 h-32 flex-shrink-0">
                  {artisan.profilePhoto ? (
                    <Image
                      src={artisan.profilePhoto}
                      alt={artisan.user.name || 'Artisan'}
                      fill
                      className="rounded-full object-cover border-4 border-primary-100"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                      <Briefcase size={48} className="text-primary-600" />
                    </div>
                  )}
                  {artisan.verified && (
                    <div className="absolute -bottom-2 -right-2 bg-primary-600 text-white p-2 rounded-full">
                      <CheckCircle size={20} fill="currentColor" />
                    </div>
                  )}
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-1">
                        {artisan.user.name}
                      </h1>
                      {artisan.verified && (
                        <Badge variant="primary" size="md" className="mb-2">
                          <CheckCircle size={14} className="mr-1" />
                          Verified Artisan
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <Star size={20} className="text-yellow-500" fill="currentColor" />
                      <span className="text-lg font-semibold text-neutral-900">
                        {artisan.rating.toFixed(1)}
                      </span>
                      <span className="text-neutral-600">
                        ({reviews.length} reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-600">
                      <Briefcase size={18} />
                      <span>{artisan.totalJobs} jobs completed</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-600">
                      <Award size={18} />
                      <span>{artisan.yearsExp} years experience</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-neutral-600">
                    <MapPin size={18} />
                    <span>
                      {artisan.city}
                      {artisan.state && `, ${artisan.state}`} • Service radius:{' '}
                      {artisan.serviceRadius}km
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* About */}
            <Card variant="default" padding="lg">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">About</h2>
              <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
                {artisan.bio}
              </p>
            </Card>

            {/* Skills */}
            <Card variant="default" padding="lg">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {artisan.skills.map((skill) => (
                  <Badge key={skill} variant="primary" size="md">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Reviews */}
            {reviews.length > 0 && (
              <Card variant="default" padding="lg">
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                  Reviews ({reviews.length})
                </h2>
                <div className="space-y-6">
                  {reviews.map((review: any) => (
                    <div
                      key={review.id}
                      className="pb-6 border-b border-neutral-200 last:border-0 last:pb-0"
                    >
                      <div className="flex items-start gap-4">
                        {/* Client Avatar */}
                        <div className="w-12 h-12 rounded-full bg-neutral-200 flex-shrink-0 overflow-hidden">
                          {review.booking.client.image ? (
                            <Image
                              src={review.booking.client.image}
                              alt={review.booking.client.name}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center text-neutral-600 font-semibold">
                              {review.booking.client.name.charAt(0)}
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-semibold text-neutral-900">
                                {review.booking.client.name}
                              </p>
                              <p className="text-sm text-neutral-600">
                                {new Date(review.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={16}
                                  className={
                                    i < review.rating
                                      ? 'text-yellow-500'
                                      : 'text-neutral-300'
                                  }
                                  fill="currentColor"
                                />
                              ))}
                            </div>
                          </div>

                          {review.comment && (
                            <p className="text-neutral-700 leading-relaxed">
                              {review.comment}
                            </p>
                          )}

                          {/* Review Photos */}
                          {review.photos && review.photos.length > 0 && (
                            <div className="mt-3 flex gap-2">
                              {review.photos.map((photo: string, idx: number) => (
                                <div
                                  key={idx}
                                  className="relative w-20 h-20 rounded-lg overflow-hidden"
                                >
                                  <Image
                                    src={photo}
                                    alt={`Review photo ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card variant="default" padding="lg" className="sticky top-8">
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-primary-600 mb-1">
                  ₦{artisan.hourlyRate.toLocaleString()}
                  <span className="text-lg text-neutral-600 font-normal">/hr</span>
                </p>
                <p className="text-sm text-neutral-600">Starting rate</p>
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                magneticEffect
                onClick={() => setShowBookingModal(true)}
              >
                Book Now
              </Button>

              <div className="mt-6 pt-6 border-t border-neutral-200 space-y-3">
                <div className="flex items-center gap-3 text-neutral-700">
                  <Phone size={18} className="text-neutral-500" />
                  <span className="text-sm">{artisan.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-700">
                  <Mail size={18} className="text-neutral-500" />
                  <span className="text-sm">{artisan.user.email}</span>
                </div>
                {artisan.address && (
                  <div className="flex items-start gap-3 text-neutral-700">
                    <MapPin size={18} className="text-neutral-500 mt-0.5" />
                    <span className="text-sm">
                      {artisan.address}
                      {artisan.city && `, ${artisan.city}`}
                      {artisan.zipCode && ` ${artisan.zipCode}`}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-neutral-700">
                  <Calendar size={18} className="text-neutral-500" />
                  <span className="text-sm">
                    Member since{' '}
                    {new Date(artisan.user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingRequestForm
          artisanId={artisan.id}
          artisanName={artisan.user.name}
          onClose={() => setShowBookingModal(false)}
          onSuccess={() => {
            // Optionally refresh data or show a success message
            fetchArtisan();
          }}
        />
      )}
    </div>
  );
}
