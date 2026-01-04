'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              EazyGO
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <a href="#" className="text-gray-900 hover:text-gray-600 transition-colors text-base">
              Support
            </a>
            <button
              className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white rounded-full transition-all text-base font-medium"
            >
              Register
            </button>
            <button
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMegaMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mega Menu - Desktop */}
      <AnimatePresence>
        {isMegaMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="hidden lg:block absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl"
          >
            <div className="max-w-7xl mx-auto px-8 py-12">
              <div className="grid grid-cols-4 gap-8">
                {/* Services Column */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Services</h3>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Find artisans</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">All services</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Browse by category</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">How it works</a></li>
                  </ul>
                </div>

                {/* Earn with EazyGO Column */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Earn with EazyGO</h3>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Become an artisan</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Requirements</a></li>
                  </ul>
                </div>

                {/* Company Column */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Company</h3>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">About EazyGO</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Careers</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Press</a></li>
                  </ul>
                </div>

                {/* Support Column */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Support</h3>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Help Center</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Safety</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Terms & Conditions</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</a></li>
                  </ul>
                </div>
              </div>

              {/* CTA Section in Mega Menu */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center justify-between p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Become an artisan</h4>
                      <p className="text-sm text-gray-600">Start earning on your schedule</p>
                    </div>
                    <ChevronRight className="text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Find services</h4>
                      <p className="text-sm text-gray-600">Book trusted professionals</p>
                    </div>
                    <ChevronRight className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="px-6 py-6 space-y-4">
              <a href="#" className="block text-gray-900 font-medium">Services</a>
              <a href="#" className="block text-gray-900 font-medium">Become an artisan</a>
              <a href="#" className="block text-gray-900 font-medium">About</a>
              <a href="#" className="block text-gray-900 font-medium">Support</a>
              <button className="w-full px-6 py-3 bg-black text-white rounded-full font-medium">
                Register
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
