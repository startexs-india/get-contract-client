'use client';

import { useEffect, useState } from 'react';
import { useLoginMutation } from '@/store/api/authApi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const { user, token, isAuthenticated } = useSelector((state: RootState) => state.auth);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      // result is the full API response: { success, status, data: { accessToken, user } }
      if (result?.success) {
        toast.success('Login successful');
        router.push('/user/dashboard');
      } else {
        toast.error(result?.message || 'Login failed');
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Login failed');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/user/dashboard");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <div className="text-center mb-6">
          <div>
            <Link href="/" className="flex justify-center">
              <img src="/logo.png" alt="Logo" width={100} height={100} className="mx-auto mb-4" />
            </Link>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Hi User, Welcome back</h2>
          <p>Login your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" loading={isLoading} className="w-full">
            Sign in
          </Button>
          <div className='text-center'>
            <p className="mt-2 text-sm text-gray-600">
              Don't have an account? <Link href="/signup" className="text-primary-600">create account</Link> |{' '}
              <Link href="/otp-request" className="text-primary-600">Use OTP</Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
}