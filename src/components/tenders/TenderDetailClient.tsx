'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useApplyTenderMutation } from '@/store/api/tenderApi';
import toast from 'react-hot-toast';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Link from 'next/link';

interface Tender {
    _id: string;
    title: string;
    description?: string;
    deadline: string;
    status?: string;
}

export default function TenderDetailClient({
    tender,
    isLoggedIn,
}: {
    tender: Tender;
    isLoggedIn: boolean;
}) {
    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.auth);
    const [applyTender, { isLoading: applying }] = useApplyTenderMutation();
    const [bidAmount, setBidAmount] = useState('');
    const [showApplyForm, setShowApplyForm] = useState(false);

    const handleApply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.companyIds?.[0]) {
            toast.error('Please create your company profile first');
            router.push('/company/new');
            return;
        }
        try {
            await applyTender({
                id: tender._id,
                data: { bidAmount: Number(bidAmount), companyId: user.companyIds[0] },
            }).unwrap();
            toast.success('Application submitted!');
            router.push('/dashboard');
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to apply');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Card title={tender.title}>
                <div className="space-y-4">
                    <div>
                        <h4 className="text-sm font-medium text-gray-500">Description</h4>
                        <p className="mt-1 text-gray-900">
                            {tender.description || 'No description provided'}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="text-sm font-medium text-gray-500">Deadline</h4>
                            <p className="mt-1 text-gray-900">
                                {new Date(tender.deadline).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-gray-500">Status</h4>
                            <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${tender.status === 'active'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                    }`}
                            >
                                {tender.status || 'active'}
                            </span>
                        </div>
                    </div>

                    {/* ✅ Only show apply button if logged in */}
                    {isLoggedIn ? (
                        !showApplyForm ? (
                            <Button onClick={() => setShowApplyForm(true)} className="mt-4">
                                Apply for this Tender
                            </Button>
                        ) : (
                            <form onSubmit={handleApply} className="mt-4 border-t pt-4">
                                <Input
                                    label="Bid Amount (₹)"
                                    type="number"
                                    value={bidAmount}
                                    onChange={(e) => setBidAmount(e.target.value)}
                                    required
                                    min="0"
                                />
                                <div className="flex gap-3 mt-4">
                                    <Button type="submit" loading={applying}>
                                        Submit Application
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowApplyForm(false)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        )
                    ) : (
                        // ✅ Logged out — show login prompt instead
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                            <p className="text-blue-700 text-sm mb-2">
                                Login to apply for this tender
                            </p>
                            <Link
                                href="/login"
                                className="inline-block px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                            >
                                Login Now
                            </Link>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}