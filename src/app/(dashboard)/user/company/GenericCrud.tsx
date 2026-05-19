'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Loader from '@/components/common/Loader';
import toast from 'react-hot-toast';

interface Field {
    name: string;
    label: string;
    type?: string;
    required?: boolean;
}

interface GenericCrudProps {
    title: string;
    fields: Field[];
    useListQuery: (companyId: string, options?: any) => any;
    useCreateMutation: () => any;
    useUpdateMutation: () => any;
    useDeleteMutation: () => any;
    companyId: string;
    renderItem?: (item: any, onEdit: (item: any) => void, onDelete: (id: string) => void) => React.ReactNode;
}

export default function GenericCrud({
    title,
    fields,
    useListQuery,
    useCreateMutation,
    useUpdateMutation,
    useDeleteMutation,
    companyId,
    renderItem,
}: GenericCrudProps) {
    const { data, isLoading, refetch } = useListQuery(companyId, { skip: !companyId });
    const [create] = useCreateMutation();
    const [update] = useUpdateMutation();
    const [remove] = useDeleteMutation();

    const [form, setForm] = useState<any>({});
    const [editingId, setEditingId] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await update({ id: editingId, data: form }).unwrap();
                toast.success(`${title} updated`);
            } else {
                await create({ companyId, data: form }).unwrap();
                toast.success(`${title} added`);
            }
            setForm({});
            setEditingId(null);
            refetch();
        } catch (err) {
            toast.error('Operation failed');
        }
    };

    const handleEdit = (item: any) => {
        setForm(item);
        setEditingId(item._id);
    };

    const handleDelete = async (id: string) => {
        if (confirm(`Delete this ${title.toLowerCase()}?`)) {
            await remove(id).unwrap();
            toast.success('Deleted');
            refetch();
        }
    };

    if (isLoading) return <Loader />;
    const items = data?.data || [];

    return (
        <div>
            <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded bg-gray-50">
                <h3 className="font-medium mb-3">{editingId ? `Edit ${title}` : `Add ${title}`}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {fields.map((field) => (
                        <Input
                            key={field.name}
                            label={field.label}
                            type={field.type || 'text'}
                            value={form[field.name] || ''}
                            onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                            required={field.required}
                        />
                    ))}
                </div>
                <div className="mt-3 flex gap-2">
                    <Button type="submit">{editingId ? 'Update' : 'Add'}</Button>
                    {editingId && (
                        <Button type="button" variant="outline" onClick={() => { setEditingId(null); setForm({}); }}>
                            Cancel
                        </Button>
                    )}
                </div>
            </form>
            <div className="space-y-2">
                {items.map((item: any) =>
                    renderItem ? (
                        renderItem(item, handleEdit, handleDelete)
                    ) : (
                        <div key={item._id} className="flex justify-between items-center p-3 border rounded">
                            <pre className="text-sm">{JSON.stringify(item, null, 2)}</pre>
                            <div>
                                <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>Edit</Button>
                                <Button size="sm" variant="danger" onClick={() => handleDelete(item._id)}>Delete</Button>
                            </div>
                        </div>
                    )
                )}
                {items.length === 0 && <p className="text-gray-500">No {title.toLowerCase()} added.</p>}
            </div>
        </div>
    );
}