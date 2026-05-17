'use client';

import { useState } from 'react';
import { useVerifyOtpMutation } from '@/store/api/authApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

export default function OtpVerifyPage() {
  const [code, setCode] = useState('');
  const [identifier, setIdentifier] = useState('');
  const { otpId } = useSelector((state: RootState) => state.auth);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpId) {
      toast.error('Please request OTP first');
      router.push('/otp-request');
      return;
    }
    try {
      await verifyOtp({ otpId, identifier, code }).unwrap();
      toast.success('OTP verified successfully');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Verification failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Verify OTP</h2>
          <p className="mt-2 text-sm text-gray-600">Enter the code sent to your device</p>
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email / Phone"
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            placeholder="Enter email or phone"
          />
          <Input
            label="OTP Code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            placeholder="6-digit code"
          />
          <Button type="submit" loading={isLoading} className="w-full">
            Verify
          </Button>
        </form>
      </Card>
    </div>
  );
}