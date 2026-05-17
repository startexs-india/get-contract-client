'use client';

import { useState } from 'react';
import { useRequestOtpMutation } from '@/store/api/authApi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

export default function OtpRequestPage() {
  const [identifier, setIdentifier] = useState('');
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [requestOtp, { isLoading }] = useRequestOtpMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await requestOtp({ identifier, method, role: 'user' }).unwrap();
      toast.success('OTP sent successfully');
      router.push('/otp-verify');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to send OTP');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <div className="text-center mb-6">
          <Link href="/" className="flex justify-center">
            <img src="/logo.png" alt="Logo" width={100} height={100} className="mx-auto mb-4" />
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Request OTP</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as 'email' | 'phone')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </div>
          <Input
            label={method === 'email' ? 'Email address' : 'Phone number'}
            type={method === 'email' ? 'email' : 'tel'}
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
          <Button type="submit" loading={isLoading} className="w-full">
            Send OTP
          </Button>
          <p className="mt-2 text-sm text-gray-600 text-center">
            Or{' '}
            <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
              login with password
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
}