'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  useListBidsQuery,
  useCreateBidMutation,
  useUpdateBidMutation,
  useDeleteBidMutation,
} from '@/store/api/bidApi';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Loader from '@/components/common/Loader';
import toast from 'react-hot-toast';

export default function BidsPage() {
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

  const { data, isLoading, refetch } = useListBidsQuery(
    {
      companyId: companyId as string,
      params: { page, limit, q: searchTerm, sort },
    },
    { skip: !companyId }
  );
  const [createBid] = useCreateBidMutation();
  const [updateBid] = useUpdateBidMutation();
  const [deleteBid] = useDeleteBidMutation();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBid, setSelectedBid] = useState<any>(null);

  const [addForm, setAddForm] = useState({
    workName: '',
    employerName: '',
    tenderValue: '',
  });

  const [editForm, setEditForm] = useState({
    workName: '',
    employerName: '',
    tenderValue: '',
  });

  const bids = data?.data || [];
  const meta = data?.meta || { total: 0, totalPages: 1, page: 1 };

  if (!companyId) {
    return <div className="text-center py-10">Loading company information...</div>;
  }

  const resetAddForm = () => {
    setAddForm({
      workName: '',
      employerName: '',
      tenderValue: '',
    });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBid({ companyId, data: addForm }).unwrap();
      toast.success('Bid added');
      resetAddForm();
      setIsAddModalOpen(false);
      refetch();
    } catch (err) {
      toast.error('Failed to add bid');
    }
  };

  const handleUpdate = async () => {
    if (!selectedBid) return;
    try {
      await updateBid({
        companyId,
        bidId: selectedBid._id,
        data: editForm,
      }).unwrap();
      toast.success('Bid updated');
      setIsEditModalOpen(false);
      setSelectedBid(null);
      refetch();
    } catch (err) {
      toast.error('Failed to update bid');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this bid?')) {
      try {
        await deleteBid({ companyId, bidId: id }).unwrap();
        toast.success('Deleted');
        refetch();
      } catch (err) {
        toast.error('Failed to delete bid');
      }
    }
  };

  const openEditModal = (bid: any) => {
    setSelectedBid(bid);
    setEditForm({
      workName: bid.workName || '',
      employerName: bid.employerName || '',
      tenderValue: bid.tenderValue?.toString() || '',
    });
    setIsEditModalOpen(true);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-full mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Bids</h1>
        <div className="flex gap-3 items-start">
          <Input
            placeholder="Search by work name or employer..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-72"
          />
          <Button onClick={() => setIsAddModalOpen(true)}>+ Add Bid</Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employer Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tender Value (₹)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bids.map((bid: any) => (
              <tr key={bid._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bid.workName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bid.employerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {bid.tenderValue ? `₹${bid.tenderValue.toLocaleString()}` : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button onClick={() => openEditModal(bid)} className="text-primary-600 hover:text-primary-900">Edit</button>
                    <button onClick={() => handleDelete(bid._id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {bids.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-500">No bids found.</td>
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
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Bid" maxWidth="md">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="space-y-4">
            <Input label="Work Name" value={addForm.workName} onChange={(e) => setAddForm({ ...addForm, workName: e.target.value })} required />
            <Input label="Employer Name" value={addForm.employerName} onChange={(e) => setAddForm({ ...addForm, employerName: e.target.value })} required />
            <Input label="Tender Value (₹)" type="number" value={addForm.tenderValue} onChange={(e) => setAddForm({ ...addForm, tenderValue: e.target.value })} min="0" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit">Add Bid</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Bid" maxWidth="md">
        <div className="space-y-4">
          <div className="space-y-4">
            <Input label="Work Name" value={editForm.workName} onChange={(e) => setEditForm({ ...editForm, workName: e.target.value })} required />
            <Input label="Employer Name" value={editForm.employerName} onChange={(e) => setEditForm({ ...editForm, employerName: e.target.value })} required />
            <Input label="Tender Value (₹)" type="number" value={editForm.tenderValue} onChange={(e) => setEditForm({ ...editForm, tenderValue: e.target.value })} min="0" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdate}>Update Bid</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}