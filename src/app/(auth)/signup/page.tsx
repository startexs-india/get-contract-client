'use client';

import { useState } from 'react';
import { useSignupMutation } from '@/store/api/authApi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signup, { isLoading }] = useSignupMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const result = await signup({ name, email, password, phone }).unwrap();
      if (result?.success) {
        toast.success('Account created and logged in!');
        router.push('/user/dashboard');
      } else {
        toast.error(result?.message || 'Signup failed');
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <div className="text-center mb-2">
          <Link href="/">
            <img src="/logo.png" alt="Logo" width={100} height={100} className="mx-auto mb-4" />
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Create account</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Phone Number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button type="submit" loading={isLoading} className="w-full">
            Sign up
          </Button>
          <div className='text-center'>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account? <Link href="/login" className="text-primary-600">Login</Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
}