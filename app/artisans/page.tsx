'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, Star, Briefcase, Filter, X } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

const SKILLS = [
  'Plumbing',
  'Electrical',
  'Carpentry',
  'Painting',
  'Cleaning',
  'Landscaping',
  'Auto Repair',
  'Renovation',
  'Masonry',
  'Roofing',
  'HVAC',
  'Tiling',
  'Welding',
  'Flooring',
  'Appliance Repair',
];

interface Artisan {
  id: string;
  userId: string;
  bio: string;
  skills: string[];
  yearsExp: number;
  hourlyRate: number;
  phone: string;
  city: string;
  state: string;
  serviceRadius: number;
  profilePhoto: string;
  verified: boolean;
  rating: number;
  totalJobs: number;
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
}

export default function ArtisansPage() {
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [cityFilter, setCityFilter] = useState('');
  const [minRate, setMinRate] = useState('');
  const [maxRate, setMaxRate] = useState('');
  const [minRating, setMinRating] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('rating');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchArtisans();
  }, [currentPage, sortBy, verifiedOnly]);

  const fetchArtisans = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        sortBy,
      });

      if (searchQuery) params.append('search', searchQuery);
      if (selectedSkills.length > 0) params.append('skills', selectedSkills.join(','));
      if (cityFilter) params.append('city', cityFilter);
      if (minRate) params.append('minRate', minRate);
      if (maxRate) params.append('maxRate', maxRate);
      if (minRating) params.append('minRating', minRating);
      if (verifiedOnly) params.append('verified', 'true');

      const response = await fetch(`/api/artisans?${params.toString()}`);
      const data = await response.json();

      if (response.ok && data.artisans && data.pagination) {
        setArtisans(data.artisans);
        setTotalPages(data.pagination.totalPages);
      } else {
        console.error('API error:', data.error || 'Unknown error');
        setArtisans([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Error fetching artisans:', error);
      setArtisans([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchArtisans();
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSkills([]);
    setCityFilter('');
    setMinRate('');
    setMaxRate('');
    setMinRating('');
    setVerifiedOnly(false);
    setSortBy('rating');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery ||
    selectedSkills.length > 0 ||
    cityFilter ||
    minRate ||
    maxRate ||
    minRating ||
    verifiedOnly;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <Container className="py-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-2">
            Find Skilled Artisans
          </h1>
          <p className="text-neutral-600">
            Browse and connect with verified professionals in your area
          </p>
        </Container>
      </div>

      <Container className="py-8">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block">
            <Card variant="default" padding="lg" className="sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                  <Filter size={20} />
                  Filters
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Verified Only */}
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={verifiedOnly}
                      onChange={(e) => setVerifiedOnly(e.target.checked)}
                      className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium text-neutral-700">
                      Verified only
                    </span>
                  </label>
                </div>

                {/* City Filter */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    City
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., Lagos"
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                  />
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Skills
                  </label>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {SKILLS.map((skill) => (
                      <label
                        key={skill}
                        className="flex items-center gap-2 cursor-pointer hover:bg-neutral-50 p-2 rounded"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSkills.includes(skill)}
                          onChange={() => toggleSkill(skill)}
                          className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-neutral-700">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rate Range */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Hourly Rate (₦)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={minRate}
                      onChange={(e) => setMinRate(e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={maxRate}
                      onChange={(e) => setMaxRate(e.target.value)}
                    />
                  </div>
                </div>

                {/* Minimum Rating */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Minimum Rating
                  </label>
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Any rating</option>
                    <option value="4">4+ stars</option>
                    <option value="4.5">4.5+ stars</option>
                    <option value="4.8">4.8+ stars</option>
                  </select>
                </div>

                <Button
                  onClick={handleSearch}
                  variant="primary"
                  size="md"
                  fullWidth
                >
                  Apply Filters
                </Button>
              </div>
            </Card>
          </aside>

          {/* Main Content */}
          <div>
            {/* Search Bar & Sort */}
            <div className="mb-6">
              <form onSubmit={handleSearch} className="flex gap-3 mb-4">
                <div className="flex-1 relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search by name or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="lg:hidden"
                >
                  Search
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                  icon={<Filter size={18} />}
                >
                  Filters
                </Button>
              </form>

              {/* Sort Dropdown */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-neutral-600">
                  {loading ? 'Loading...' : `${artisans.length} artisans found`}
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="jobs">Most Jobs</option>
                  <option value="rate-low">Price: Low to High</option>
                  <option value="rate-high">Price: High to Low</option>
                  <option value="experience">Most Experienced</option>
                </select>
              </div>

              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="primary"
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                      <X size={14} className="ml-1" />
                    </Badge>
                  ))}
                  {cityFilter && (
                    <Badge
                      variant="primary"
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => setCityFilter('')}
                    >
                      City: {cityFilter}
                      <X size={14} className="ml-1" />
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Artisan Grid */}
            {loading ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} variant="default" padding="none">
                    <div className="animate-pulse">
                      <div className="h-48 bg-neutral-200" />
                      <div className="p-6 space-y-3">
                        <div className="h-4 bg-neutral-200 rounded w-3/4" />
                        <div className="h-3 bg-neutral-200 rounded w-1/2" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : artisans.length === 0 ? (
              <Card variant="default" padding="lg" className="text-center py-12">
                <p className="text-neutral-600 mb-4">
                  No artisans found matching your criteria
                </p>
                <Button onClick={clearFilters} variant="primary" size="md">
                  Clear Filters
                </Button>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {artisans.map((artisan) => (
                  <motion.div
                    key={artisan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link href={`/artisan/${artisan.id}`}>
                      <Card
                        variant="default"
                        padding="none"
                        className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group"
                      >
                        {/* Profile Image */}
                        <div className="relative h-48 bg-neutral-200">
                          {artisan.profilePhoto ? (
                            <Image
                              src={artisan.profilePhoto}
                              alt={artisan.user.name || 'Artisan'}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
                              <Briefcase size={48} className="text-primary-600" />
                            </div>
                          )}
                          {artisan.verified && (
                            <div className="absolute top-3 right-3 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                              <Star size={12} fill="currentColor" />
                              Verified
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                            {artisan.user.name}
                          </h3>

                          {/* Rating & Jobs */}
                          <div className="flex items-center gap-3 text-sm text-neutral-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Star
                                size={16}
                                className="text-yellow-500"
                                fill="currentColor"
                              />
                              <span className="font-medium">{artisan.rating.toFixed(1)}</span>
                            </div>
                            <span>•</span>
                            <span>{artisan.totalJobs} jobs</span>
                          </div>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {artisan.skills.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="neutral" size="sm">
                                {skill}
                              </Badge>
                            ))}
                            {artisan.skills.length > 3 && (
                              <Badge variant="neutral" size="sm">
                                +{artisan.skills.length - 3}
                              </Badge>
                            )}
                          </div>

                          {/* Location */}
                          <div className="flex items-center gap-1 text-sm text-neutral-600">
                            <MapPin size={14} />
                            <span>{artisan.city}</span>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                <Button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                >
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === i + 1
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <Button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="sm"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Mobile Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="absolute right-0 top-0 h-full w-full max-w-sm bg-white overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-neutral-900">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-neutral-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile filter content */}
              <div className="space-y-6">
                {/* Verified Only */}
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={verifiedOnly}
                      onChange={(e) => setVerifiedOnly(e.target.checked)}
                      className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium text-neutral-700">
                      Verified only
                    </span>
                  </label>
                </div>

                {/* City Filter */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    City
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., Lagos"
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                  />
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Skills
                  </label>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {SKILLS.map((skill) => (
                      <label
                        key={skill}
                        className="flex items-center gap-2 cursor-pointer hover:bg-neutral-50 p-2 rounded"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSkills.includes(skill)}
                          onChange={() => toggleSkill(skill)}
                          className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-neutral-700">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rate Range */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Hourly Rate (₦)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={minRate}
                      onChange={(e) => setMinRate(e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={maxRate}
                      onChange={(e) => setMaxRate(e.target.value)}
                    />
                  </div>
                </div>

                {/* Minimum Rating */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Minimum Rating
                  </label>
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Any rating</option>
                    <option value="4">4+ stars</option>
                    <option value="4.5">4.5+ stars</option>
                    <option value="4.8">4.8+ stars</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button onClick={clearFilters} variant="outline" size="md" fullWidth>
                  Clear
                </Button>
                <Button
                  onClick={() => {
                    handleSearch(new Event('submit') as any);
                    setShowFilters(false);
                  }}
                  variant="primary"
                  size="md"
                  fullWidth
                >
                  Apply
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
