'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Plus,
  MoreVertical,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Download,
  Search,
  ArrowUpRight,
  Shield
} from 'lucide-react';
import { ClientDashboardLayout } from '@/components/layout/ClientDashboardLayout';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  cardBrand?: 'visa' | 'mastercard' | 'verve';
  last4: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  bankName?: string;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  artisan: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  type: 'payment' | 'refund';
}

export default function PaymentMethodsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - in production, fetch from API
  const [paymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      cardBrand: 'visa',
      last4: '4242',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true,
    },
    {
      id: '2',
      type: 'card',
      cardBrand: 'mastercard',
      last4: '8888',
      expiryMonth: 6,
      expiryYear: 2026,
      isDefault: false,
    },
  ]);

  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      date: '2024-01-15T10:30:00',
      description: 'Plumbing Service',
      artisan: 'John Doe',
      amount: 15000,
      status: 'completed',
      type: 'payment',
    },
    {
      id: '2',
      date: '2024-01-10T14:20:00',
      description: 'Electrical Repair',
      artisan: 'Jane Smith',
      amount: 8500,
      status: 'completed',
      type: 'payment',
    },
    {
      id: '3',
      date: '2024-01-05T09:15:00',
      description: 'Painting Service',
      artisan: 'Mike Johnson',
      amount: 25000,
      status: 'pending',
      type: 'payment',
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

  const getCardIcon = (brand: string) => {
    const icons: Record<string, string> = {
      visa: '💳',
      mastercard: '💳',
      verve: '💳',
    };
    return icons[brand] || '💳';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, { bg: string; text: string; icon: any }> = {
      completed: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
      failed: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle },
    };
    return colors[status] || colors.pending;
  };

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.artisan.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || tx.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalSpent = transactions
    .filter((tx) => tx.status === 'completed' && tx.type === 'payment')
    .reduce((sum, tx) => sum + tx.amount, 0);

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
            Payments & Billing
          </h1>
          <p className="text-neutral-500 text-base">
            Manage your payment methods and view transaction history
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card variant="default" padding="lg" className="hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-500 mb-1">Total Spent</p>
                  <p className="text-2xl md:text-3xl font-bold text-neutral-900">
                    ₦{totalSpent.toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="default" padding="lg" className="hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CreditCard className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-500 mb-1">Payment Methods</p>
                  <p className="text-2xl md:text-3xl font-bold text-neutral-900">
                    {paymentMethods.length}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card variant="default" padding="lg" className="hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="text-purple-600" size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-500 mb-1">Transactions</p>
                  <p className="text-2xl md:text-3xl font-bold text-neutral-900">
                    {transactions.length}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Payment Methods Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <Card variant="default" padding="lg">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-neutral-200">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">Payment Methods</h3>
                  <p className="text-sm text-neutral-500 mt-1">Manage your cards</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="group p-4 border-2 border-neutral-200 rounded-xl hover:border-primary-300 transition-all bg-white"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                          {method.type === 'card' && method.cardBrand
                            ? getCardIcon(method.cardBrand)
                            : '🏦'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-neutral-900 capitalize">
                              {method.cardBrand || method.type}
                            </p>
                            {method.isDefault && (
                              <Badge variant="success" size="sm">
                                Default
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-neutral-600">•••• {method.last4}</p>
                          {method.expiryMonth && method.expiryYear && (
                            <p className="text-xs text-neutral-500 mt-1">
                              Expires {method.expiryMonth}/{method.expiryYear}
                            </p>
                          )}
                        </div>
                      </div>
                      <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                        <MoreVertical size={18} className="text-neutral-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                size="md"
                fullWidth
                icon={<Plus size={18} />}
                className="border-2 border-dashed hover:border-primary-500 hover:bg-primary-50"
              >
                Add Payment Method
              </Button>

              {/* Security Badge */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <Shield className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-sm font-medium text-blue-900 mb-1">
                      Secure & Encrypted
                    </p>
                    <p className="text-xs text-blue-700 leading-relaxed">
                      Your payment information is encrypted and stored securely
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Transaction History Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <Card variant="default" padding="lg">
              <div className="mb-6 pb-6 border-b border-neutral-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">Transaction History</h3>
                    <p className="text-sm text-neutral-500 mt-1">All your payment transactions</p>
                  </div>
                  <Button variant="outline" size="md" icon={<Download size={18} />}>
                    Export
                  </Button>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Search transactions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    {['all', 'completed', 'pending', 'failed'].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setFilterStatus(filter)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                          filterStatus === filter
                            ? 'bg-primary-600 text-white'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                      >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Transactions List */}
              <div className="space-y-3">
                {filteredTransactions.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CreditCard size={32} className="text-neutral-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-neutral-900 mb-2">
                      No transactions found
                    </h4>
                    <p className="text-neutral-600">
                      {searchQuery
                        ? 'Try adjusting your search criteria'
                        : 'Your transaction history will appear here'}
                    </p>
                  </div>
                ) : (
                  filteredTransactions.map((transaction, index) => {
                    const statusConfig = getStatusColor(transaction.status);
                    const StatusIcon = statusConfig.icon;

                    return (
                      <motion.div
                        key={transaction.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group p-4 border border-neutral-200 rounded-xl hover:shadow-md transition-all bg-white"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1 min-w-0">
                            <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Calendar size={20} className="text-neutral-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-neutral-900 mb-1">
                                {transaction.description}
                              </h4>
                              <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-600">
                                <span>{transaction.artisan}</span>
                                <span>•</span>
                                <span>
                                  {new Date(transaction.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className="text-lg font-bold text-neutral-900">
                                ₦{transaction.amount.toLocaleString()}
                              </p>
                              <div
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}
                              >
                                <StatusIcon size={12} />
                                {transaction.status}
                              </div>
                            </div>
                            <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                              <ArrowUpRight size={18} className="text-neutral-600" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </Card>
          </motion.div>
        </div>
      </Container>
    </ClientDashboardLayout>
  );
}
