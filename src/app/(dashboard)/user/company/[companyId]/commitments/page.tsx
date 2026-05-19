'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  useListExistingCommitmentsQuery,
  useCreateExistingCommitmentMutation,
  useUpdateExistingCommitmentMutation,
  useDeleteExistingCommitmentMutation,
} from '@/store/api/existingCommitmentApi';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Loader from '@/components/common/Loader';
import toast from 'react-hot-toast';

export default function CommitmentsPage() {
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

  const { data, isLoading, refetch } = useListExistingCommitmentsQuery(
    {
      companyId: companyId as string,
      params: { page, limit, q: searchTerm, sort },
    },
    { skip: !companyId }
  );
  const [createCommitment] = useCreateExistingCommitmentMutation();
  const [updateCommitment] = useUpdateExistingCommitmentMutation();
  const [deleteCommitment] = useDeleteExistingCommitmentMutation();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCommitment, setSelectedCommitment] = useState<any>(null);

  const [addForm, setAddForm] = useState({
    workName: '',
    agreementNo: '',
    employerName: '',
    agreementValue: '',
    paymentReceived: '',
    completionPeriod: '',
    remarks: '',
  });

  const [editForm, setEditForm] = useState({
    workName: '',
    agreementNo: '',
    employerName: '',
    agreementValue: '',
    paymentReceived: '',
    completionPeriod: '',
    remarks: '',
  });

  const commitments = data?.data || [];
  const meta = data?.meta || { total: 0, totalPages: 1, page: 1 };

  if (!companyId) {
    return <div className="text-center py-10">Loading company information...</div>;
  }

  const resetAddForm = () => {
    setAddForm({
      workName: '',
      agreementNo: '',
      employerName: '',
      agreementValue: '',
      paymentReceived: '',
      completionPeriod: '',
      remarks: '',
    });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCommitment({ companyId, data: addForm }).unwrap();
      toast.success('Commitment added');
      resetAddForm();
      setIsAddModalOpen(false);
      refetch();
    } catch (err) {
      toast.error('Failed to add commitment');
    }
  };

  const handleUpdate = async () => {
    if (!selectedCommitment) return;
    try {
      await updateCommitment({
        companyId,
        commitmentId: selectedCommitment._id,
        data: editForm,
      }).unwrap();
      toast.success('Commitment updated');
      setIsEditModalOpen(false);
      setSelectedCommitment(null);
      refetch();
    } catch (err) {
      toast.error('Failed to update commitment');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this commitment?')) {
      try {
        await deleteCommitment({ companyId, commitmentId: id }).unwrap();
        toast.success('Deleted');
        refetch();
      } catch (err) {
        toast.error('Failed to delete commitment');
      }
    }
  };

  const openEditModal = (item: any) => {
    setSelectedCommitment(item);
    setEditForm({
      workName: item.workName || '',
      agreementNo: item.agreementNo || '',
      employerName: item.employerName || '',
      agreementValue: item.agreementValue?.toString() || '',
      paymentReceived: item.paymentReceived?.toString() || '',
      completionPeriod: item.completionPeriod || '',
      remarks: item.remarks || '',
    });
    setIsEditModalOpen(true);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-full mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Existing Commitments</h1>
        <div className="flex gap-3 items-start">
          <Input
            placeholder="Search by work name or agreement no..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-72"
          />
          <Button onClick={() => setIsAddModalOpen(true)}>+ Add Commitment</Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agreement No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agreement Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Received</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion Period</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {commitments.map((item: any) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.workName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.agreementNo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.employerName || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.agreementValue ? `₹${item.agreementValue.toLocaleString()}` : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.paymentReceived ? `₹${item.paymentReceived.toLocaleString()}` : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.completionPeriod || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button onClick={() => openEditModal(item)} className="text-primary-600 hover:text-primary-900">Edit</button>
                    <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {commitments.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">No commitments found.</td>
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
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Commitment" maxWidth="2xl">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Work Name"  value={addForm.workName} onChange={(e) => setAddForm({ ...addForm, workName: e.target.value })} required />
            <Input label="Agreement No."  value={addForm.agreementNo} onChange={(e) => setAddForm({ ...addForm, agreementNo: e.target.value })} required />
            <Input label="Employer Name" value={addForm.employerName} onChange={(e) => setAddForm({ ...addForm, employerName: e.target.value })} />
            <Input label="Agreement Value (₹)" type="number" value={addForm.agreementValue} onChange={(e) => setAddForm({ ...addForm, agreementValue: e.target.value })} min="0" />
            <Input label="Payment Received (₹)" type="number" value={addForm.paymentReceived} onChange={(e) => setAddForm({ ...addForm, paymentReceived: e.target.value })} min="0" />
            <Input label="Completion Period" value={addForm.completionPeriod} onChange={(e) => setAddForm({ ...addForm, completionPeriod: e.target.value })} />
            <Input label="Remarks" value={addForm.remarks} onChange={(e) => setAddForm({ ...addForm, remarks: e.target.value })} />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit">Add Commitment</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Commitment" maxWidth="2xl">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Work Name"  value={editForm.workName} onChange={(e) => setEditForm({ ...editForm, workName: e.target.value })} required />
            <Input label="Agreement No."  value={editForm.agreementNo} onChange={(e) => setEditForm({ ...editForm, agreementNo: e.target.value })} required />
            <Input label="Employer Name" value={editForm.employerName} onChange={(e) => setEditForm({ ...editForm, employerName: e.target.value })} />
            <Input label="Agreement Value (₹)" type="number" value={editForm.agreementValue} onChange={(e) => setEditForm({ ...editForm, agreementValue: e.target.value })} min="0" />
            <Input label="Payment Received (₹)" type="number" value={editForm.paymentReceived} onChange={(e) => setEditForm({ ...editForm, paymentReceived: e.target.value })} min="0" />
            <Input label="Completion Period" value={editForm.completionPeriod} onChange={(e) => setEditForm({ ...editForm, completionPeriod: e.target.value })} />
            <Input label="Remarks" value={editForm.remarks} onChange={(e) => setEditForm({ ...editForm, remarks: e.target.value })} />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdate}>Update Commitment</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}