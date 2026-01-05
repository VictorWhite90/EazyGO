'use client';

/**
 * Artisan Registration - Multi-step Onboarding
 * Enhanced registration flow with modern design system
 */

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  User,
  Briefcase,
  MapPin,
  CheckCircle,
  Upload,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/layout/Container';
import { BackToHome } from '@/components/ui/BackToHome';
import Image from 'next/image';

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

const STEPS = [
  { number: 1, title: 'Account', icon: User },
  { number: 2, title: 'Profile', icon: Briefcase },
  { number: 3, title: 'Location', icon: MapPin },
  { number: 4, title: 'Complete', icon: CheckCircle },
];

export default function ArtisanRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    // Step 1: Account Info
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Step 2: Profile Info
    phone: '',
    bio: '',
    skills: [] as string[],
    yearsExp: '',
    profilePhoto: null as File | null,
    profilePhotoPreview: '',
    // Step 3: Location & Availability
    address: '',
    city: '',
    state: '',
    zipCode: '',
    serviceRadius: '10', // in kilometers
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profilePhoto: file,
          profilePhotoPreview: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setFormData(prev => ({
      ...prev,
      profilePhoto: null,
      profilePhotoPreview: '',
    }));
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard/artisan' });
  };

  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.phone || !formData.bio) {
      setError('Please fill in all required fields');
      return false;
    }
    if (formData.skills.length === 0) {
      setError('Please select at least one skill');
      return false;
    }
    if (!formData.profilePhoto) {
      setError('Please upload a profile photo');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!formData.city) {
      setError('Please enter your city');
      return false;
    }
    return true;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;

    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setError('');
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: 'ARTISAN',
          artisanProfile: {
            phone: formData.phone,
            bio: formData.bio,
            skills: formData.skills,
            yearsExp: formData.yearsExp ? parseInt(formData.yearsExp) : 0,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            serviceRadius: parseInt(formData.serviceRadius),
            profilePhoto: formData.profilePhotoPreview,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Auto sign in after registration
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Registration successful, but login failed. Please try logging in.');
        setIsLoading(false);
      } else {
        setStep(4);
        setTimeout(() => {
          router.push('/');
          router.refresh();
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 py-12 px-4">
      <Container className="max-w-3xl">
        {/* Back Button and Back to Home */}
        <div className="mb-6 flex items-center justify-between">
          {step > 1 && step < 4 ? (
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <ArrowLeft size={20} />
              Back
            </button>
          ) : (
            <div />
          )}
          {step < 4 && <BackToHome variant="ghost" />}
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/">
            <Image
              src="/EAZYGO LOGO.png"
              alt="EazyGO Logo"
              width={120}
              height={120}
              className="h-20 w-auto mx-auto mb-4"
            />
          </Link>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            {step === 4 ? 'Welcome to EazyGO!' : 'Become an Artisan'}
          </h1>
          <p className="text-neutral-600">
            {step === 1 && 'Create your account to get started'}
            {step === 2 && 'Tell us about your skills and experience'}
            {step === 3 && 'Where do you provide services?'}
            {step === 4 && 'Your profile is ready!'}
          </p>
        </div>

        {/* Progress Steps */}
        {step < 4 && (
          <div className="flex justify-center gap-3 mb-8">
            {STEPS.slice(0, 3).map((s) => (
              <div key={s.number} className="flex flex-col items-center gap-2">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    step >= s.number
                      ? 'bg-primary-600 text-white shadow-glow'
                      : 'bg-neutral-200 text-neutral-500'
                  }`}
                >
                  {step > s.number ? (
                    <CheckCircle size={20} />
                  ) : (
                    <s.icon size={20} />
                  )}
                </div>
                <span className="text-xs font-medium text-neutral-600">
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6"
            >
              <Card variant="default" padding="md" className="bg-red-50 border-red-200">
                <p className="text-red-600 text-sm">{error}</p>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Content */}
        <Card variant="glass" padding="lg" className="backdrop-blur-md">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleNext}
                className="space-y-5"
              >
                <Input
                  label="Full Name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />

                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                />

                <Input
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Minimum 6 characters"
                  hint="Must be at least 6 characters long"
                />

                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Re-enter your password"
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  icon={<ArrowRight size={20} />}
                  iconPosition="right"
                  magneticEffect
                >
                  Continue
                </Button>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-neutral-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-neutral-500">Or continue with</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="mt-4 w-full px-6 py-3 bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-900 font-semibold rounded-full transition-all flex items-center justify-center gap-3"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign up with Google
                  </button>
                </div>
              </motion.form>
            )}

            {step === 2 && (
              <motion.form
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleNext}
                className="space-y-5"
              >
                {/* Profile Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Profile Photo *
                  </label>
                  {formData.profilePhotoPreview ? (
                    <div className="relative w-32 h-32 mx-auto">
                      <Image
                        src={formData.profilePhotoPreview}
                        alt="Profile preview"
                        fill
                        className="rounded-full object-cover border-4 border-primary-100"
                      />
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="block w-32 h-32 mx-auto border-2 border-dashed border-neutral-300 rounded-full hover:border-primary-500 cursor-pointer transition-all group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      <div className="h-full flex flex-col items-center justify-center text-neutral-500 group-hover:text-primary-600">
                        <Upload size={24} />
                        <span className="text-xs mt-2">Upload Photo</span>
                      </div>
                    </label>
                  )}
                  <p className="text-xs text-neutral-500 text-center mt-2">
                    Max 5MB. JPG, PNG accepted
                  </p>
                </div>

                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+234 800 123 4567"
                />

                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-neutral-700 mb-2">
                    Bio / About You *
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell clients about your experience, specialties, and what makes you great at what you do..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Skills * <span className="text-neutral-500 font-normal">(Select all that apply)</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto p-2">
                    {SKILLS.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`px-3 py-2 border-2 rounded-lg transition-all text-sm font-medium ${
                          formData.skills.includes(skill)
                            ? 'border-primary-600 bg-primary-50 text-primary-700'
                            : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                  {formData.skills.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {formData.skills.map((skill) => (
                        <Badge key={skill} variant="primary" size="sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <Input
                  label="Years of Experience"
                  name="yearsExp"
                  type="number"
                  value={formData.yearsExp}
                  onChange={handleChange}
                  min="0"
                  placeholder="5"
                  hint="Optional - helps build credibility"
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  icon={<ArrowRight size={20} />}
                  iconPosition="right"
                  magneticEffect
                >
                  Continue
                </Button>
              </motion.form>
            )}

            {step === 3 && (
              <motion.form
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <Input
                  label="Street Address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Main Street"
                  hint="Optional - helps clients find you"
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="City"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="Lagos"
                  />

                  <Input
                    label="State"
                    name="state"
                    type="text"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Lagos State"
                  />
                </div>

                <Input
                  label="ZIP / Postal Code"
                  name="zipCode"
                  type="text"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="100001"
                />

                <div>
                  <label htmlFor="serviceRadius" className="block text-sm font-medium text-neutral-700 mb-2">
                    Service Radius: {formData.serviceRadius}km
                  </label>
                  <input
                    id="serviceRadius"
                    name="serviceRadius"
                    type="range"
                    min="5"
                    max="50"
                    step="5"
                    value={formData.serviceRadius}
                    onChange={handleChange}
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                  />
                  <div className="flex justify-between text-xs text-neutral-500 mt-1">
                    <span>5km</span>
                    <span>50km</span>
                  </div>
                  <p className="text-sm text-neutral-600 mt-2">
                    How far are you willing to travel for jobs?
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={isLoading}
                  magneticEffect
                >
                  {isLoading ? 'Creating your profile...' : 'Complete Registration'}
                </Button>
              </motion.form>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-success-600" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-3">
                  Registration Complete!
                </h2>
                <p className="text-neutral-600 mb-6">
                  Your profile has been created successfully. You'll be redirected to the dashboard shortly.
                </p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Footer */}
        {step < 4 && (
          <p className="mt-6 text-center text-sm text-neutral-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary-600 hover:text-primary-700 font-semibold">
              Sign in
            </Link>
          </p>
        )}
      </Container>
    </div>
  );
}
