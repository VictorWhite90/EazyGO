'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Wrench } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl"
      >
        <div className="text-center mb-12">
          <Link href="/">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">EazyGO</h1>
          </Link>
          <p className="text-xl text-gray-600">Choose how you want to join</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Client Registration */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onClick={() => router.push('/auth/register/client')}
            className="cursor-pointer group"
          >
            <div className="p-8 border-2 border-gray-200 rounded-3xl hover:border-green-600 hover:shadow-xl transition-all duration-300 h-full">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
                <User className="text-green-600 group-hover:text-white transition-colors" size={32} />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-3">I need services</h2>
              <p className="text-gray-600 mb-6">
                Find and hire trusted artisans for your home and business needs
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Browse verified artisans</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Read reviews and ratings</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Secure payment protection</span>
                </li>
              </ul>

              <button className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition-all group-hover:scale-105">
                Sign up as Client
              </button>
            </div>
          </motion.div>

          {/* Artisan Registration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => router.push('/auth/register/artisan')}
            className="cursor-pointer group"
          >
            <div className="p-8 border-2 border-gray-200 rounded-3xl hover:border-green-600 hover:shadow-xl transition-all duration-300 h-full">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
                <Wrench className="text-blue-600 group-hover:text-white transition-colors" size={32} />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-3">I offer services</h2>
              <p className="text-gray-600 mb-6">
                Join as a skilled artisan and start earning on your schedule
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Set your own rates</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Choose your jobs</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Get paid securely</span>
                </li>
              </ul>

              <button className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition-all group-hover:scale-105">
                Sign up as Artisan
              </button>
            </div>
          </motion.div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-green-600 hover:text-green-700 font-semibold">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
