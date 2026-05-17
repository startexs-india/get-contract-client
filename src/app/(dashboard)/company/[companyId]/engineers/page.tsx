'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  useListEngineersQuery,
  useCreateEngineerMutation,
  useUpdateEngineerMutation,
  useDeleteEngineerMutation,
} from '@/store/api/engineerApi';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import QualificationFields from '@/components/company/QualificationFields';
import Loader from '@/components/common/Loader';
import toast from 'react-hot-toast';

interface Qualification {
  degree: string;
  stream?: string;
  institute?: string;
  startYear?: number;
  endYear?: number;
  grade?: string;
}

export default function EngineersPage() {
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

  const { data, isLoading, refetch } = useListEngineersQuery(
    { companyId: companyId as string, params: { page, limit, q: searchTerm, sort } },
    { skip: !companyId }
  );
  const [createEngineer] = useCreateEngineerMutation();
  const [updateEngineer] = useUpdateEngineerMutation();
  const [deleteEngineer] = useDeleteEngineerMutation();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isQualModalOpen, setIsQualModalOpen] = useState(false);
  const [selectedEngineer, setSelectedEngineer] = useState<any>(null);
  const [viewingQualifications, setViewingQualifications] = useState<Qualification[]>([]);

  const [addForm, setAddForm] = useState({
    name: '',
    fatherName: '',
    qualification: [] as Qualification[],
    experienceYears: '',
    designation: '',
    department: '',
    address: '',
    aadhar: '',
    pan: '',
    uan: '',
  });

  const [editForm, setEditForm] = useState({
    name: '',
    fatherName: '',
    qualification: [] as Qualification[],
    experienceYears: '',
    designation: '',
    department: '',
    address: '',
    aadhar: '',
    pan: '',
    uan: '',
  });

  const engineers = data?.data || [];
  const meta = data?.meta || { total: 0, totalPages: 1, page: 1 };

  if (!companyId) {
    return <div className="text-center py-10">Loading company information...</div>;
  }

  const resetAddForm = () => {
    setAddForm({
      name: '',
      fatherName: '',
      qualification: [],
      experienceYears: '',
      designation: '',
      department: '',
      address: '',
      aadhar: '',
      pan: '',
      uan: '',
    });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEngineer({ companyId, data: addForm }).unwrap();
      toast.success('Engineer added');
      resetAddForm();
      setIsAddModalOpen(false);
      refetch();
    } catch (err) {
      toast.error('Failed to add engineer');
    }
  };

  const handleUpdate = async () => {
    if (!selectedEngineer) return;
    try {
      await updateEngineer({ companyId, engineerId: selectedEngineer._id, data: editForm }).unwrap();
      toast.success('Engineer updated');
      setIsEditModalOpen(false);
      setSelectedEngineer(null);
      refetch();
    } catch (err) {
      toast.error('Failed to update engineer');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this engineer?')) {
      try {
        await deleteEngineer({ companyId, engineerId: id }).unwrap();
        toast.success('Deleted');
        refetch();
      } catch (err) {
        toast.error('Failed to delete engineer');
      }
    }
  };

  const openEditModal = (engineer: any) => {
    setSelectedEngineer(engineer);
    setEditForm({
      name: engineer.name || '',
      fatherName: engineer.fatherName || '',
      qualification: engineer.qualification || [],
      experienceYears: engineer.experienceYears?.toString() || '',
      designation: engineer.designation || '',
      department: engineer.department || '',
      address: engineer.address || '',
      aadhar: engineer.aadhar || '',
      pan: engineer.pan || '',
      uan: engineer.uan || '',
    });
    setIsEditModalOpen(true);
  };

  const openQualificationsModal = (engineer: any) => {
    setViewingQualifications(engineer.qualification || []);
    setIsQualModalOpen(true);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-full mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Engineers</h1>
        <div className="flex gap-3 items-start">
          <Input
            placeholder="Search by name, PAN, Aadhar..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
            className="w-72"
          />
          <Button onClick={() => setIsAddModalOpen(true)}>+ Add Engineer</Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Father's Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience (yrs)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PAN</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aadhar</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qualifications</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {engineers.map((engineer: any) => (
              <tr key={engineer._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{engineer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{engineer.fatherName || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{engineer.experienceYears || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{engineer.designation || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{engineer.department || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{engineer.pan || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{engineer.aadhar || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <button
                    onClick={() => openQualificationsModal(engineer)}
                    className="text-primary-600 hover:text-primary-900 underline  "
                  >
                    View
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button onClick={() => openEditModal(engineer)} className="text-primary-600 hover:text-primary-900">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(engineer._id)} className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </div>
                </td>
               </tr>
            ))}
            {engineers.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center py-8 text-gray-500">No engineers found.</td>
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
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Engineer" maxWidth="2xl">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          {/* form fields same as before */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Full Name"  value={addForm.name} onChange={(e) => setAddForm({ ...addForm, name: e.target.value })} required />
            <Input label="Father's Name" value={addForm.fatherName} onChange={(e) => setAddForm({ ...addForm, fatherName: e.target.value })} />
            <Input label="Experience (years)" type="number" value={addForm.experienceYears} onChange={(e) => setAddForm({ ...addForm, experienceYears: e.target.value })} min="0" max="80" />
            <Input label="Designation" value={addForm.designation} onChange={(e) => setAddForm({ ...addForm, designation: e.target.value })} />
            <Input label="Department" value={addForm.department} onChange={(e) => setAddForm({ ...addForm, department: e.target.value })} />
            <Input label="Address" value={addForm.address} onChange={(e) => setAddForm({ ...addForm, address: e.target.value })} />
            <Input label="Aadhar (12 digits)" value={addForm.aadhar} onChange={(e) => setAddForm({ ...addForm, aadhar: e.target.value })} pattern="[0-9]{12}" />
            <Input label="PAN" value={addForm.pan} onChange={(e) => setAddForm({ ...addForm, pan: e.target.value.toUpperCase() })} pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" />
            <Input label="UAN (12 digits)" value={addForm.uan} onChange={(e) => setAddForm({ ...addForm, uan: e.target.value })} pattern="[0-9]{12}" />
          </div>
          <QualificationFields
            qualifications={addForm.qualification}
            onChange={(quals) => setAddForm({ ...addForm, qualification: quals })}
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit">Add Engineer</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Engineer" maxWidth="2xl">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Full Name"  value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} required />
            <Input label="Father's Name" value={editForm.fatherName} onChange={(e) => setEditForm({ ...editForm, fatherName: e.target.value })} />
            <Input label="Experience (years)" type="number" value={editForm.experienceYears} onChange={(e) => setEditForm({ ...editForm, experienceYears: e.target.value })} min="0" max="80" />
            <Input label="Designation" value={editForm.designation} onChange={(e) => setEditForm({ ...editForm, designation: e.target.value })} />
            <Input label="Department" value={editForm.department} onChange={(e) => setEditForm({ ...editForm, department: e.target.value })} />
            <Input label="Address" value={editForm.address} onChange={(e) => setEditForm({ ...editForm, address: e.target.value })} />
            <Input label="Aadhar (12 digits)" value={editForm.aadhar} onChange={(e) => setEditForm({ ...editForm, aadhar: e.target.value })} pattern="[0-9]{12}" />
            <Input label="PAN" value={editForm.pan} onChange={(e) => setEditForm({ ...editForm, pan: e.target.value.toUpperCase() })} pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" />
            <Input label="UAN (12 digits)" value={editForm.uan} onChange={(e) => setEditForm({ ...editForm, uan: e.target.value })} pattern="[0-9]{12}" />
          </div>
          <QualificationFields
            qualifications={editForm.qualification}
            onChange={(quals) => setEditForm({ ...editForm, qualification: quals })}
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdate}>Update Engineer</Button>
          </div>
        </div>
      </Modal>

      {/* View Qualifications Modal */}
      <Modal
        isOpen={isQualModalOpen}
        onClose={() => setIsQualModalOpen(false)}
        title="Engineer Qualifications"
        maxWidth="lg"
      >
        {viewingQualifications.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No qualifications recorded.</p>
        ) : (
          <div className="space-y-4">
            {viewingQualifications.map((qual, idx) => (
              <div key={idx} className="border rounded-lg p-3 bg-gray-50">
                <p className="font-semibold">{qual.degree}</p>
                {qual.stream && <p className="text-sm text-gray-600">Stream: {qual.stream}</p>}
                {qual.institute && <p className="text-sm text-gray-600">Institute: {qual.institute}</p>}
                <p className="text-sm text-gray-600">
                  Year: {qual.startYear || '?'} – {qual.endYear || '?'}
                </p>
                {qual.grade && <p className="text-sm text-gray-600">Grade: {qual.grade}</p>}
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={() => setIsQualModalOpen(false)}>Close</Button>
        </div>
      </Modal>
    </div>
  );
}