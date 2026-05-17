'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  useListExperienceQuantitiesQuery,
  useCreateExperienceQuantityMutation,
  useUpdateExperienceQuantityMutation,
  useDeleteExperienceQuantityMutation,
} from '@/store/api/experienceQuantityApi';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Loader from '@/components/common/Loader';
import toast from 'react-hot-toast';

export default function ExperienceQuantitiesPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sort, setSort] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    if (user?.companyIds?.length) {
      const id = user.companyIds[0];
      setCompanyId(typeof id === 'string' ? id : String(id));
    }
  }, [user]);

  const { data, isLoading, refetch } = useListExperienceQuantitiesQuery(
    {
      companyId: companyId as string,
      params: { page, limit, q: searchTerm, sort },
    },
    { skip: !companyId }
  );
  const [createQty] = useCreateExperienceQuantityMutation();
  const [updateQty] = useUpdateExperienceQuantityMutation();
  const [deleteQty] = useDeleteExperienceQuantityMutation();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const [addForm, setAddForm] = useState({
    agreementNo: '',
    qtyExecutedDescription: '',
    qtyExecuted: '',
  });

  const [editForm, setEditForm] = useState({
    agreementNo: '',
    qtyExecutedDescription: '',
    qtyExecuted: '',
  });

  const items = data?.data || [];
  const meta = data?.meta || { total: 0, totalPages: 1, page: 1 };

  if (!companyId) {
    return <div className="text-center py-10">Loading company information...</div>;
  }

  const resetAddForm = () => {
    setAddForm({
      agreementNo: '',
      qtyExecutedDescription: '',
      qtyExecuted: '',
    });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createQty({ companyId, data: addForm }).unwrap();
      toast.success('Experience quantity record added');
      resetAddForm();
      setIsAddModalOpen(false);
      refetch();
    } catch (err) {
      toast.error('Failed to add record');
    }
  };

  const handleUpdate = async () => {
    if (!selectedItem) return;
    try {
      await updateQty({
        companyId,
        quantityId: selectedItem._id,
        data: editForm,
      }).unwrap();
      toast.success('Record updated');
      setIsEditModalOpen(false);
      setSelectedItem(null);
      refetch();
    } catch (err) {
      toast.error('Failed to update record');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this record?')) {
      try {
        await deleteQty({ companyId, quantityId: id }).unwrap();
        toast.success('Deleted');
        refetch();
      } catch (err) {
        toast.error('Failed to delete record');
      }
    }
  };

  const openEditModal = (item: any) => {
    setSelectedItem(item);
    setEditForm({
      agreementNo: item.agreementNo || '',
      qtyExecutedDescription: item.qtyExecutedDescription || '',
      qtyExecuted: item.qtyExecuted?.toString() || '',
    });
    setIsEditModalOpen(true);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-full mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Experience Quantities</h1>
        <div className="flex gap-3 items-start">
          <Input
            placeholder="Search by agreement no..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-72"
          />
          <Button onClick={() => setIsAddModalOpen(true)}>+ Add Record</Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agreement No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity Executed</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item: any) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.agreementNo}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{item.qtyExecutedDescription || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.qtyExecuted}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button onClick={() => openEditModal(item)} className="text-primary-600 hover:text-primary-900">Edit</button>
                    <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-500">No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-600">
            Showing {(meta.page - 1) * limit + 1} to {Math.min(meta.page * limit, meta.total)} of {meta.total}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
            <span className="px-3 py-1 text-sm">Page {meta.page} of {meta.totalPages}</span>
            <Button size="sm" variant="outline" disabled={page === meta.totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
          </div>
        </div>
      )}

      {/* Add Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Experience Quantity Record" maxWidth="md">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="space-y-4">
            <Input label="Agreement No."  value={addForm.agreementNo} onChange={(e) => setAddForm({ ...addForm, agreementNo: e.target.value })} required />
            <Input label="Description" value={addForm.qtyExecutedDescription} onChange={(e) => setAddForm({ ...addForm, qtyExecutedDescription: e.target.value })} />
            <Input label="Quantity Executed"  type="number" value={addForm.qtyExecuted} onChange={(e) => setAddForm({ ...addForm, qtyExecuted: e.target.value })} required min="0" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit">Add Record</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Experience Quantity Record" maxWidth="md">
        <div className="space-y-4">
          <div className="space-y-4">
            <Input label="Agreement No."  value={editForm.agreementNo} onChange={(e) => setEditForm({ ...editForm, agreementNo: e.target.value })} required />
            <Input label="Description" value={editForm.qtyExecutedDescription} onChange={(e) => setEditForm({ ...editForm, qtyExecutedDescription: e.target.value })} />
            <Input label="Quantity Executed"  type="number" value={editForm.qtyExecuted} onChange={(e) => setEditForm({ ...editForm, qtyExecuted: e.target.value })} required min="0" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdate}>Update Record</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}