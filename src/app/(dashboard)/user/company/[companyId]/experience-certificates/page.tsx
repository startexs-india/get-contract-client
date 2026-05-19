'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  useListExperienceCertificatesQuery,
  useCreateExperienceCertificateMutation,
  useUpdateExperienceCertificateMutation,
  useDeleteExperienceCertificateMutation,
} from '@/store/api/experienceCertificateApi';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import DatePicker from '@/components/ui/DatePicker';
import Modal from '@/components/ui/Modal';
import Loader from '@/components/common/Loader';
import toast from 'react-hot-toast';

export default function ExperienceCertificatesPage() {
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

  const { data, isLoading, refetch } = useListExperienceCertificatesQuery(
    {
      companyId: companyId as string,
      params: { page, limit, q: searchTerm, sort },
    },
    { skip: !companyId }
  );
  const [createCert] = useCreateExperienceCertificateMutation();
  const [updateCert] = useUpdateExperienceCertificateMutation();
  const [deleteCert] = useDeleteExperienceCertificateMutation();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<any>(null);

  const [addForm, setAddForm] = useState({
    workName: '',
    employerName: '',
    agreementValue: '',
    workDoneValue: '',
    agreementNo: '',
    completionDate: '',
  });

  const [editForm, setEditForm] = useState({
    workName: '',
    employerName: '',
    agreementValue: '',
    workDoneValue: '',
    agreementNo: '',
    completionDate: '',
  });

  const certificates = data?.data || [];
  const meta = data?.meta || { total: 0, totalPages: 1, page: 1 };

  if (!companyId) {
    return <div className="text-center py-10">Loading company information...</div>;
  }

  const resetAddForm = () => {
    setAddForm({
      workName: '',
      employerName: '',
      agreementValue: '',
      workDoneValue: '',
      agreementNo: '',
      completionDate: '',
    });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCert({ companyId, data: addForm }).unwrap();
      toast.success('Experience certificate added');
      resetAddForm();
      setIsAddModalOpen(false);
      refetch();
    } catch (err) {
      toast.error('Failed to add certificate');
    }
  };

  const handleUpdate = async () => {
    if (!selectedCert) return;
    try {
      await updateCert({
        companyId,
        certId: selectedCert._id,
        data: editForm,
      }).unwrap();
      toast.success('Certificate updated');
      setIsEditModalOpen(false);
      setSelectedCert(null);
      refetch();
    } catch (err) {
      toast.error('Failed to update certificate');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this certificate?')) {
      try {
        await deleteCert({ companyId, certId: id }).unwrap();
        toast.success('Deleted');
        refetch();
      } catch (err) {
        toast.error('Failed to delete certificate');
      }
    }
  };

  const openEditModal = (cert: any) => {
    setSelectedCert(cert);
    setEditForm({
      workName: cert.workName || '',
      employerName: cert.employerName || '',
      agreementValue: cert.agreementValue?.toString() || '',
      workDoneValue: cert.workDoneValue?.toString() || '',
      agreementNo: cert.agreementNo || '',
      completionDate: cert.completionDate ? cert.completionDate.split('T')[0] : '',
    });
    setIsEditModalOpen(true);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-full mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Experience Certificates</h1>
        <div className="flex gap-3 items-start">
          <Input
            placeholder="Search by work name, employer, agreement no..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-72"
          />
          <Button onClick={() => setIsAddModalOpen(true)}>+ Add Certificate</Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agreement No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agreement Value (₹)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Done (₹)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {certificates.map((cert: any) => (
              <tr key={cert._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cert.workName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cert.employerName || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cert.agreementNo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cert.agreementValue?.toLocaleString() || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cert.workDoneValue?.toLocaleString() || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {cert.completionDate ? new Date(cert.completionDate).toLocaleDateString() : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button onClick={() => openEditModal(cert)} className="text-primary-600 hover:text-primary-900">Edit</button>
                    <button onClick={() => handleDelete(cert._id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {certificates.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">No experience certificates found.</td>
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
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Experience Certificate" maxWidth="2xl">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Work Name" value={addForm.workName} onChange={(e) => setAddForm({ ...addForm, workName: e.target.value })} required />
            <Input label="Employer Name" value={addForm.employerName} onChange={(e) => setAddForm({ ...addForm, employerName: e.target.value })} />
            <Input label="Agreement No." value={addForm.agreementNo} onChange={(e) => setAddForm({ ...addForm, agreementNo: e.target.value })} required />
            <Input label="Agreement Value (₹)" type="number" value={addForm.agreementValue} onChange={(e) => setAddForm({ ...addForm, agreementValue: e.target.value })} min="0" />
            <Input label="Work Done Value (₹)" type="number" value={addForm.workDoneValue} onChange={(e) => setAddForm({ ...addForm, workDoneValue: e.target.value })} min="0" />
            <DatePicker label="Completion Date" value={addForm.completionDate} onChange={(e) => setAddForm({ ...addForm, completionDate: e.target.value })} />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit">Add Certificate</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Experience Certificate" maxWidth="2xl">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Work Name"  value={editForm.workName} onChange={(e) => setEditForm({ ...editForm, workName: e.target.value })} required />
            <Input label="Employer Name" value={editForm.employerName} onChange={(e) => setEditForm({ ...editForm, employerName: e.target.value })} />
            <Input label="Agreement No."  value={editForm.agreementNo} onChange={(e) => setEditForm({ ...editForm, agreementNo: e.target.value })} required />
            <Input label="Agreement Value (₹)" type="number" value={editForm.agreementValue} onChange={(e) => setEditForm({ ...editForm, agreementValue: e.target.value })} min="0" />
            <Input label="Work Done Value (₹)" type="number" value={editForm.workDoneValue} onChange={(e) => setEditForm({ ...editForm, workDoneValue: e.target.value })} min="0" />
            <DatePicker label="Completion Date" value={editForm.completionDate} onChange={(e) => setEditForm({ ...editForm, completionDate: e.target.value })} />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdate}>Update Certificate</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}