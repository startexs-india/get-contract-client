'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  useListAuditsQuery,
  useCreateAuditMutation,
  useUpdateAuditMutation,
  useDeleteAuditMutation,
} from '@/store/api/auditApi';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Loader from '@/components/common/Loader';
import toast from 'react-hot-toast';

export default function AuditsPage() {
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

  const { data, isLoading, refetch } = useListAuditsQuery(
    {
      companyId: companyId as string,
      params: { page, limit, q: searchTerm, sort },
    },
    { skip: !companyId }
  );
  const [createAudit] = useCreateAuditMutation();
  const [updateAudit] = useUpdateAuditMutation();
  const [deleteAudit] = useDeleteAuditMutation();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState<any>(null);

  const [addForm, setAddForm] = useState({
    financialYear: '',
    turnover: '',
    udin: '',
  });

  const [editForm, setEditForm] = useState({
    financialYear: '',
    turnover: '',
    udin: '',
  });

  const audits = data?.data || [];
  const meta = data?.meta || { total: 0, totalPages: 1, page: 1 };

  if (!companyId) {
    return <div className="text-center py-10">Loading company information...</div>;
  }

  const resetAddForm = () => {
    setAddForm({
      financialYear: '',
      turnover: '',
      udin: '',
    });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAudit({ companyId, data: addForm }).unwrap();
      toast.success('Audit record added');
      resetAddForm();
      setIsAddModalOpen(false);
      refetch();
    } catch (err) {
      toast.error('Failed to add audit record');
    }
  };

  const handleUpdate = async () => {
    if (!selectedAudit) return;
    try {
      await updateAudit({
        companyId,
        auditId: selectedAudit._id,
        data: editForm,
      }).unwrap();
      toast.success('Audit record updated');
      setIsEditModalOpen(false);
      setSelectedAudit(null);
      refetch();
    } catch (err) {
      toast.error('Failed to update audit record');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this audit record?')) {
      try {
        await deleteAudit({ companyId, auditId: id }).unwrap();
        toast.success('Deleted');
        refetch();
      } catch (err) {
        toast.error('Failed to delete audit record');
      }
    }
  };

  const openEditModal = (audit: any) => {
    setSelectedAudit(audit);
    setEditForm({
      financialYear: audit.financialYear || '',
      turnover: audit.turnover?.toString() || '',
      udin: audit.udin || '',
    });
    setIsEditModalOpen(true);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-full mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Financial Audits</h1>
        <div className="flex gap-3 items-start">
          <Input
            placeholder="Search by financial year or UDIN..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-72"
          />
          <Button onClick={() => setIsAddModalOpen(true)}>+ Add Audit</Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Financial Year</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Turnover (₹)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UDIN</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {audits.map((audit: any) => (
              <tr key={audit._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{audit.financialYear}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {audit.turnover ? `₹${audit.turnover.toLocaleString()}` : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{audit.udin || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button onClick={() => openEditModal(audit)} className="text-primary-600 hover:text-primary-900">Edit</button>
                    <button onClick={() => handleDelete(audit._id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {audits.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-500">No audit records found.</td>
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
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Audit Record" maxWidth="md">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="space-y-4">
            <Input
              label="Financial Year * (e.g., 2023-24)"
              value={addForm.financialYear}
              onChange={(e) => setAddForm({ ...addForm, financialYear: e.target.value })}
              required
              placeholder="2023-24"
            />
            <Input
              label="Turnover (₹)"
              type="number"
              value={addForm.turnover}
              onChange={(e) => setAddForm({ ...addForm, turnover: e.target.value })}
              min="0"
            />
            <Input
              label="UDIN (Unique Document Identification Number)"
              value={addForm.udin}
              onChange={(e) => setAddForm({ ...addForm, udin: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit">Add Audit</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Audit Record" maxWidth="md">
        <div className="space-y-4">
          <div className="space-y-4">
            <Input
              label="Financial Year"
              value={editForm.financialYear}
              onChange={(e) => setEditForm({ ...editForm, financialYear: e.target.value })}
              required
            />
            <Input
              label="Turnover (₹)"
              type="number"
              value={editForm.turnover}
              onChange={(e) => setEditForm({ ...editForm, turnover: e.target.value })}
              min="0"
            />
            <Input
              label="UDIN"
              value={editForm.udin}
              onChange={(e) => setEditForm({ ...editForm, udin: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdate}>Update Audit</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}