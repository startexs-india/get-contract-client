'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
    useGetCompanyQuery,
    useCreateCompanyMutation,
    useUpdateCompanyMutation,
} from '@/store/api/companyApi';
import toast from 'react-hot-toast';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Loader from '@/components/common/Loader';

export default function CompanyPage() {
    const { user } = useSelector((state: RootState) => state.auth);
    const companyId = user?.companyIds?.[0]; // take first company for now
    const { data: responseData, isLoading: fetching, refetch } = useGetCompanyQuery(companyId, {
        skip: !companyId,
    });
    const [createCompany, { isLoading: creating }] = useCreateCompanyMutation();
    const [updateCompany, { isLoading: updating }] = useUpdateCompanyMutation();

    const [isEditing, setIsEditing] = useState(false);
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

    const company = responseData?.data?.company;

    // Populate form when company data loads
    useEffect(() => {
        console.log(company)
        if (company) {
            setFormData({
                name: company.name || '',
                email: company.email || '',
                registeredAddress: company.registeredAddress || '',
                corporateAddress: company.corporateAddress || '',
                cin: company.cin || '',
                gstin: company.gstin || '',
                pan: company.pan || '',
                epf: company.epf || '',
                esic: company.esic || '',
            });
        }
    }, [company]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (companyId) {
                await updateCompany({ id: companyId, data: formData }).unwrap();
                toast.success('Company updated successfully');
                setIsEditing(false);
                refetch(); // refresh data
            } else {
                const result = await createCompany(formData).unwrap();
                toast.success('Company created successfully');
                // After creation, we might want to refetch user or redirect? For now just refetch company list.
                // Since companyId is null, after creation we need to get the new ID. Ideally the API returns the new company.
                // For simplicity, we can reload or refetch user data. But we'll just set isEditing false and hope the user object updates.
                // A better approach: after create, we could update the user slice with the new companyId. But that's beyond scope.
                // We'll just refetch and set isEditing false.
                setIsEditing(false);
                // Force refetch of user? The auth slice might need to be updated with companyIds.
                // For now, reload the page or instruct user to refresh.
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to save company');
        }
    };

    if (fetching) return <Loader />;

    // No company exists and not editing: show create button
    if (!company && !isEditing) {
        return (
            <div className="max-w-3xl mx-auto">
                <Card title="Company Profile">
                    <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">No company profile found.</p>
                        <Button onClick={() => setIsEditing(true)}>Create Company Profile</Button>
                    </div>
                </Card>
            </div>
        );
    }

    // View mode: display company details
    if (company && !isEditing) {
        return (
            <div className="max-w-3xl mx-auto">
                <Card title="Company Profile">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Company Name</label>
                                <p className="mt-1 text-gray-900">{company.name || '-'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Email</label>
                                <p className="mt-1 text-gray-900">{company.email || '-'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Registered Address</label>
                                <p className="mt-1 text-gray-900">{company.registeredAddress || '-'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Corporate Address</label>
                                <p className="mt-1 text-gray-900">{company.corporateAddress || '-'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">CIN</label>
                                <p className="mt-1 text-gray-900">{company.cin || '-'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">GSTIN</label>
                                <p className="mt-1 text-gray-900">{company.gstin || '-'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">PAN</label>
                                <p className="mt-1 text-gray-900">{company.pan || '-'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">EPF</label>
                                <p className="mt-1 text-gray-900">{company.epf || '-'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">ESIC</label>
                                <p className="mt-1 text-gray-900">{company.esic || '-'}</p>
                            </div>
                        </div>
                        <div className="flex justify-end pt-4">
                            <Button onClick={() => setIsEditing(true)}>Edit Company</Button>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    // Edit mode: show form
    return (
        <div className="max-w-3xl mx-auto">
            <Card title={companyId ? 'Edit Company Profile' : 'Create Company Profile'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Company Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled
                    />
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Registered Address"
                        name="registeredAddress"
                        value={formData.registeredAddress}
                        onChange={handleChange}
                    />
                    <Input
                        label="Corporate Address"
                        name="corporateAddress"
                        value={formData.corporateAddress}
                        onChange={handleChange}
                    />
                    <Input
                        label="CIN"
                        name="cin"
                        value={formData.cin}
                        onChange={handleChange}
                    />
                    <Input
                        label="GSTIN"
                        name="gstin"
                        value={formData.gstin}
                        onChange={handleChange}
                        disabled
                    />
                    <Input
                        label="PAN"
                        name="pan"
                        value={formData.pan}
                        onChange={handleChange}
                        disabled
                    />
                    <Input
                        label="EPF"
                        name="epf"
                        value={formData.epf}
                        onChange={handleChange}
                    />
                    <Input
                        label="ESIC"
                        name="esic"
                        value={formData.esic}
                        onChange={handleChange}
                    />
                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" loading={creating || updating}>
                            {companyId ? 'Update Company' : 'Create Company'}
                        </Button>

                    </div>
                </form>
            </Card>
        </div>
    );
}