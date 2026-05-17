'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  useListRegistrationsQuery,
  useCreateRegistrationMutation,
  useUpdateRegistrationMutation,
  useDeleteRegistrationMutation,
} from '@/store/api/registrationApi';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import DatePicker from '@/components/ui/DatePicker';
import Modal from '@/components/ui/Modal';
import Loader from '@/components/common/Loader';
import toast from 'react-hot-toast';

export default function RegistrationsPage() {
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

  const { data, isLoading, refetch } = useListRegistrationsQuery(
    {
      companyId: companyId as string,
      params: { page, limit, q: searchTerm, sort },
    },
    { skip: !companyId }
  );
  const [createRegistration] = useCreateRegistrationMutation();
  const [updateRegistration] = useUpdateRegistrationMutation();
  const [deleteRegistration] = useDeleteRegistrationMutation();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState<any>(null);

  const [addForm, setAddForm] = useState({
    department: '',
    registrationNo: '',
    issueDate: '',
    expiryDate: '',
  });

  const [editForm, setEditForm] = useState({
    department: '',
    registrationNo: '',
    issueDate: '',
    expiryDate: '',
  });

  const registrations = data?.data || [];
  const meta = data?.meta || { total: 0, totalPages: 1, page: 1 };

  if (!companyId) {
    return <div className="text-center py-10">Loading company information...</div>;
  }

  const resetAddForm = () => {
    setAddForm({
      department: '',
      registrationNo: '',
      issueDate: '',
      expiryDate: '',
    });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createRegistration({ companyId, data: addForm }).unwrap();
      toast.success('Registration added');
      resetAddForm();
      setIsAddModalOpen(false);
      refetch();
    } catch (err) {
      toast.error('Failed to add registration');
    }
  };

  const handleUpdate = async () => {
    if (!selectedRegistration) return;
    try {
      await updateRegistration({
        companyId,
        registrationId: selectedRegistration._id,
        data: editForm,
      }).unwrap();
      toast.success('Registration updated');
      setIsEditModalOpen(false);
      setSelectedRegistration(null);
      refetch();
    } catch (err) {
      toast.error('Failed to update registration');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this registration?')) {
      try {
        await deleteRegistration({ companyId, registrationId: id }).unwrap();
        toast.success('Deleted');
        refetch();
      } catch (err) {
        toast.error('Failed to delete registration');
      }
    }
  };

  const openEditModal = (reg: any) => {
    setSelectedRegistration(reg);
    setEditForm({
      department: reg.department || '',
      registrationNo: reg.registrationNo || '',
      issueDate: reg.issueDate ? reg.issueDate.split('T')[0] : '',
      expiryDate: reg.expiryDate ? reg.expiryDate.split('T')[0] : '',
    });
    setIsEditModalOpen(true);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-full mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Registrations & Certifications</h1>
        <div className="flex gap-3 items-start">
          <Input
            placeholder="Search by department or registration no..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-72"
          />
          <Button onClick={() => setIsAddModalOpen(true)}>+ Add Registration</Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {registrations.map((reg: any) => (
              <tr key={reg._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reg.department}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reg.registrationNo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {reg.issueDate ? new Date(reg.issueDate).toLocaleDateString() : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {reg.expiryDate ? new Date(reg.expiryDate).toLocaleDateString() : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button onClick={() => openEditModal(reg)} className="text-primary-600 hover:text-primary-900">Edit</button>
                    <button onClick={() => handleDelete(reg._id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {registrations.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">No registrations found.</td>
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
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Registration" maxWidth="lg">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Department" value={addForm.department} onChange={(e) => setAddForm({ ...addForm, department: e.target.value })} required />
            <Input label="Registration No. " value={addForm.registrationNo} onChange={(e) => setAddForm({ ...addForm, registrationNo: e.target.value })} required />
            <DatePicker label="Issue Date " value={addForm.issueDate} onChange={(e) => setAddForm({ ...addForm, issueDate: e.target.value })} required />
            <DatePicker label="Expiry Date " value={addForm.expiryDate} onChange={(e) => setAddForm({ ...addForm, expiryDate: e.target.value })} required />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit">Add Registration</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Registration" maxWidth="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Department" value={editForm.department} onChange={(e) => setEditForm({ ...editForm, department: e.target.value })} required />
            <Input label="Registration No." value={editForm.registrationNo} onChange={(e) => setEditForm({ ...editForm, registrationNo: e.target.value })} required />
            <DatePicker label="Issue Date " value={editForm.issueDate} onChange={(e) => setEditForm({ ...editForm, issueDate: e.target.value })} required />
            <DatePicker label="Expiry Date " value={editForm.expiryDate} onChange={(e) => setEditForm({ ...editForm, expiryDate: e.target.value })} required />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdate}>Update Registration</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}