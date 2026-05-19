'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import {
    useGetContractorQuery,
    useUpdateContractorMutation,
} from '@/store/api/contractorApi';
import { setCredentials } from '@/store/slices/authSlice';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Loader from '@/components/common/Loader';
import toast from 'react-hot-toast';

export default function ProfilePage() {
    const dispatch = useDispatch();
    const { user, token } = useSelector((state: RootState) => state.auth);
    const contractorId = user?.userId;

    // Fetch latest contractor data from backend
    const { data: contractorData, isLoading: isLoadingFetch, refetch } = useGetContractorQuery(
        contractorId as string,
        { skip: !contractorId }
    );

    const [updateContractor, { isLoading: isUpdating }] = useUpdateContractorMutation();

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [isEditing, setIsEditing] = useState(false);

    // Populate form when contractor data is loaded
    useEffect(() => {
        if (contractorData?.data) {
            const contractor = contractorData.data;
            setForm({
                name: contractor.name || '',
                email: contractor.email || '',
                phone: contractor.phone || '',
            });
            // Also sync Redux user if needed (optional)
            if (user && (user.name !== contractor.name || user.email !== contractor.email)) {
                dispatch(setCredentials({ token: token!, user: { ...user, ...contractor } }));
            }
        }
    }, [contractorData, dispatch, token, user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!contractorId) {
            toast.error('User ID not found');
            return;
        }
        try {
            const result = await updateContractor({
                id: contractorId,
                data: form,
            }).unwrap();
            if (result?.success) {
                // Update Redux store
                const updatedUser = { ...user, ...form };
                dispatch(setCredentials({ token: token!, user: updatedUser }));
                toast.success('Profile updated successfully');
                setIsEditing(false);
                refetch(); // refetch to ensure we have latest data
            } else {
                toast.error(result?.message || 'Update failed');
            }
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to update profile');
        }
    };

    if (!contractorId) {
        return <div className="text-center py-10">Loading user information...</div>;
    }

    if (isLoadingFetch) {
        return <Loader />;
    }

    const contractor = contractorData?.data;

    if (!contractor) {
        return <div className="text-center py-10">Contractor not found</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <Card title="My Profile">
                {!isEditing ? (
                    // View mode
                    <div className="space-y-4">
                        <div className="border-b pb-3">
                            <label className="text-sm font-medium text-gray-500">Name</label>
                            <p className="mt-1 text-gray-900">{contractor.name || '-'}</p>
                        </div>
                        <div className="border-b pb-3">
                            <label className="text-sm font-medium text-gray-500">Email</label>
                            <p className="mt-1 text-gray-900">{contractor.email || '-'}</p>
                        </div>
                        <div className="border-b pb-3">
                            <label className="text-sm font-medium text-gray-500">Phone</label>
                            <p className="mt-1 text-gray-900">{contractor.phone || '-'}</p>
                        </div>
                        <div className="pt-4 flex justify-end">
                            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                        </div>
                    </div>
                ) : (
                    // Edit mode
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Full Name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Phone"
                            name="phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange}
                        />
                        <div className="flex justify-end gap-3 pt-2">
                            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" loading={isUpdating}>
                                Save Changes
                            </Button>
                        </div>
                    </form>
                )}
            </Card>
        </div>
    );
}