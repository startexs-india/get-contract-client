'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useCreateCompanyMutation } from '@/store/api/companyApi';
import { addCompanyId } from '@/store/slices/authSlice';
import toast from 'react-hot-toast';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function NewCompanyPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [createCompany, { isLoading }] = useCreateCompanyMutation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        registeredAddress: '',
        corporateAddress: '',
        cin: '',
        gstin: '',
        pan: '',
        epf: '',
        esic: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await createCompany(formData).unwrap();
            const slug: string | undefined = result?.data?.company?.slug ?? result?.data?.slug;

            if (!slug) throw new Error('API did not return a company slug');

            // Patch Redux immediately — sidebar re-renders with company links, no reload needed
            dispatch(addCompanyId(slug));

            toast.success('Company created successfully');
            router.push(`/company/${(slug)}`);
        } catch (error: any) {
            toast.error(error?.data?.message ?? error?.message ?? 'Failed to create company');
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <Card title="Create Company Profile">
                <p className="text-sm text-gray-500 mb-6">
                    You don't have a company yet. Fill in the details below to get started.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Company Name" name="name" value={formData.name} onChange={handleChange} required />
                    <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                    <Input label="Registered Address" name="registeredAddress" value={formData.registeredAddress} onChange={handleChange} />
                    <Input label="Corporate Address" name="corporateAddress" value={formData.corporateAddress} onChange={handleChange} />
                    <Input label="CIN" name="cin" value={formData.cin} onChange={handleChange} />
                    <Input label="GSTIN" name="gstin" value={formData.gstin} onChange={handleChange} />
                    <Input label="PAN" name="pan" value={formData.pan} onChange={handleChange} />
                    <Input label="EPF" name="epf" value={formData.epf} onChange={handleChange} />
                    <Input label="ESIC" name="esic" value={formData.esic} onChange={handleChange} />
                    <div className="flex justify-end pt-2">
                        <Button type="submit" loading={isLoading}>Create Company</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}