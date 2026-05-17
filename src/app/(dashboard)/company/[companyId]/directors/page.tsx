'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  useListDirectorsQuery,
  useCreateDirectorMutation,
  useUpdateDirectorMutation,
  useDeleteDirectorMutation,
} from '@/store/api/directorApi';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import DatePicker from '@/components/ui/DatePicker';
import Modal from '@/components/ui/Modal';
import Loader from '@/components/common/Loader';
import toast from 'react-hot-toast';

export default function DirectorsPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sort, setSort] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    if (user?.companyIds?.length) {
      setCompanyId(user.companyIds[0]);
    }
  }, [user]);

  const { data, isLoading, refetch } = useListDirectorsQuery(
    { companyId: companyId as string, params: { page, limit, q: searchTerm, sort } },
    { skip: !companyId }
  );
  const [createDirector] = useCreateDirectorMutation();
  const [updateDirector] = useUpdateDirectorMutation();
  const [deleteDirector] = useDeleteDirectorMutation();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDirector, setSelectedDirector] = useState<any>(null);

  const [addForm, setAddForm] = useState({
    name: '',
    fatherOrSpouseName: '',
    dateOfBirth: '',
    designation: '',
    address: '',
    din: '',
    pan: '',
    aadhar: '',
  });

  const [editForm, setEditForm] = useState({
    name: '',
    fatherOrSpouseName: '',
    dateOfBirth: '',
    designation: '',
    address: '',
    din: '',
    pan: '',
    aadhar: '',
  });

  const directors = data?.data || [];
  const meta = data?.meta || { total: 0, totalPages: 1, page: 1 };

  if (!companyId) {
    return <div className="text-center py-10">Loading company information...</div>;
  }

  const resetAddForm = () => {
    setAddForm({
      name: '',
      fatherOrSpouseName: '',
      dateOfBirth: '',
      designation: '',
      address: '',
      din: '',
      pan: '',
      aadhar: '',
    });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createDirector({ companyId, data: addForm }).unwrap();
      toast.success('Director added');
      resetAddForm();
      setIsAddModalOpen(false);
      refetch();
    } catch (err) {
      toast.error('Failed to add director');
    }
  };

  const handleUpdate = async () => {
    if (!selectedDirector) return;
    try {
      await updateDirector({ companyId, directorId: selectedDirector._id, data: editForm }).unwrap();
      toast.success('Director updated');
      setIsEditModalOpen(false);
      setSelectedDirector(null);
      refetch();
    } catch (err) {
      toast.error('Failed to update director');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this director?')) {
      try {
        await deleteDirector({ companyId, directorId: id }).unwrap();
        toast.success('Deleted');
        refetch();
      } catch (err) {
        toast.error('Failed to delete director');
      }
    }
  };

  const openEditModal = (director: any) => {
    setSelectedDirector(director);
    setEditForm({
      name: director.name || '',
      fatherOrSpouseName: director.fatherOrSpouseName || '',
      dateOfBirth: director.dateOfBirth ? director.dateOfBirth.split('T')[0] : '',
      designation: director.designation || '',
      address: director.address || '',
      din: director.din || '',
      pan: director.pan || '',
      aadhar: director.aadhar || '',
    });
    setIsEditModalOpen(true);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-full mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Directors</h1>
        <div className="flex gap-3 items-start">
          <Input
            placeholder="Search by name, DIN, PAN..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
            className="w-72"
          />
          <Button className='px-2 py-1' onClick={() => setIsAddModalOpen(true)}>+ Add Director</Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Father/Spouse</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DIN</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PAN</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aadhar</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {directors.map((director: any) => (
              <tr key={director._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{director.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{director.fatherOrSpouseName || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {director.dateOfBirth ? new Date(director.dateOfBirth).toLocaleDateString() : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{director.designation || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{director.din || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{director.pan || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{director.aadhar || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button onClick={() => openEditModal(director)} className="text-primary-600 hover:text-primary-900">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(director._id)} className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {directors.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-8 text-gray-500">No directors found.</td>
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
            <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
              Previous
            </Button>
            <span className="px-3 py-1 text-sm">Page {meta.page} of {meta.totalPages}</span>
            <Button size="sm" variant="outline" disabled={page === meta.totalPages} onClick={() => setPage(p => p + 1)}>
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Add Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Director" maxWidth="2xl">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Full Name" value={addForm.name} onChange={(e) => setAddForm({ ...addForm, name: e.target.value })} required />
            <Input label="Father/Spouse Name" value={addForm.fatherOrSpouseName} onChange={(e) => setAddForm({ ...addForm, fatherOrSpouseName: e.target.value })} />
            <DatePicker label="Date of Birth" value={addForm.dateOfBirth} onChange={(e) => setAddForm({ ...addForm, dateOfBirth: e.target.value })} />
            <Input label="Designation" value={addForm.designation} onChange={(e) => setAddForm({ ...addForm, designation: e.target.value })} />
            <Input label="Address" value={addForm.address} onChange={(e) => setAddForm({ ...addForm, address: e.target.value })} />
            <Input label="DIN (8 digits)" value={addForm.din} onChange={(e) => setAddForm({ ...addForm, din: e.target.value })} pattern="[0-9]{8}" />
            <Input label="PAN" value={addForm.pan} onChange={(e) => setAddForm({ ...addForm, pan: e.target.value.toUpperCase() })} pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" />
            <Input label="Aadhar (12 digits)" value={addForm.aadhar} onChange={(e) => setAddForm({ ...addForm, aadhar: e.target.value })} pattern="[0-9]{12}" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit">Add Director</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Director" maxWidth="2xl">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Full Name" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} required />
            <Input label="Father/Spouse Name" value={editForm.fatherOrSpouseName} onChange={(e) => setEditForm({ ...editForm, fatherOrSpouseName: e.target.value })} />
            <DatePicker label="Date of Birth" value={editForm.dateOfBirth} onChange={(e) => setEditForm({ ...editForm, dateOfBirth: e.target.value })} />
            <Input label="Designation" value={editForm.designation} onChange={(e) => setEditForm({ ...editForm, designation: e.target.value })} />
            <Input label="Address" value={editForm.address} onChange={(e) => setEditForm({ ...editForm, address: e.target.value })} />
            <Input label="DIN (8 digits)" value={editForm.din} onChange={(e) => setEditForm({ ...editForm, din: e.target.value })} pattern="[0-9]{8}" />
            <Input label="PAN" value={editForm.pan} onChange={(e) => setEditForm({ ...editForm, pan: e.target.value.toUpperCase() })} pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" />
            <Input label="Aadhar (12 digits)" value={editForm.aadhar} onChange={(e) => setEditForm({ ...editForm, aadhar: e.target.value })} pattern="[0-9]{12}" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdate}>Update Director</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}