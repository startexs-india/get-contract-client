'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  useListEquipmentQuery,
  useCreateEquipmentMutation,
  useUpdateEquipmentMutation,
  useDeleteEquipmentMutation,
} from '@/store/api/equipmentApi';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import DatePicker from '@/components/ui/DatePicker';
import Modal from '@/components/ui/Modal';
import Loader from '@/components/common/Loader';
import toast from 'react-hot-toast';

export default function EquipmentPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sort, setSort] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    if (user?.companyIds?.length) {
      const id = user.companyIds[0];
      // Ensure id is a string, not an object
      setCompanyId(typeof id === 'string' ? id : String(id));
    }
  }, [user]);

  console.log("companyid inside the equipement:" ,companyId)

  const { data, isLoading, refetch } = useListEquipmentQuery(
    { companyId: companyId as string, params: { page, limit, q: searchTerm, sort } },
    { skip: !companyId }
  );
  const [createEquipment] = useCreateEquipmentMutation();
  const [updateEquipment] = useUpdateEquipmentMutation();
  const [deleteEquipment] = useDeleteEquipmentMutation();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null);

  const [addForm, setAddForm] = useState({
    toolName: '',
    purchaseDate: '',
    purchaseFrom: '',
    invoiceNo: '',
    ownerName: '',
  });

  const [editForm, setEditForm] = useState({
    toolName: '',
    purchaseDate: '',
    purchaseFrom: '',
    invoiceNo: '',
    ownerName: '',
  });

  const equipmentList = data?.data || [];
  const meta = data?.meta || { total: 0, totalPages: 1, page: 1 };

  if (!companyId) {
    return <div className="text-center py-10">Loading company information...</div>;
  }

  const resetAddForm = () => {
    setAddForm({
      toolName: '',
      purchaseDate: '',
      purchaseFrom: '',
      invoiceNo: '',
      ownerName: '',
    });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEquipment({ companyId, data: addForm }).unwrap();
      toast.success('Equipment added');
      resetAddForm();
      setIsAddModalOpen(false);
      refetch();
    } catch (err) {
      toast.error('Failed to add equipment');
    }
  };

  const handleUpdate = async () => {
    if (!selectedEquipment) return;
    try {
      await updateEquipment({
        companyId,
        equipmentId: selectedEquipment._id,
        data: editForm,
      }).unwrap();
      toast.success('Equipment updated');
      setIsEditModalOpen(false);
      setSelectedEquipment(null);
      refetch();
    } catch (err) {
      toast.error('Failed to update equipment');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this equipment?')) {
      try {
        await deleteEquipment({ companyId, equipmentId: id }).unwrap();
        toast.success('Deleted');
        refetch();
      } catch (err) {
        toast.error('Failed to delete equipment');
      }
    }
  };

  const openEditModal = (equipment: any) => {
    setSelectedEquipment(equipment);
    setEditForm({
      toolName: equipment.toolName || '',
      purchaseDate: equipment.purchaseDate ? equipment.purchaseDate.split('T')[0] : '',
      purchaseFrom: equipment.purchaseFrom || '',
      invoiceNo: equipment.invoiceNo || '',
      ownerName: equipment.ownerName || '',
    });
    setIsEditModalOpen(true);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-full mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Equipment & Machinery</h1>
        <div className="flex gap-3 items-start">
          <Input
            placeholder="Search by tool name or invoice..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-72"
          />
          <Button onClick={() => setIsAddModalOpen(true)}>+ Add Equipment</Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tool Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Purchase Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Purchase From
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Owner Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {equipmentList.map((item: any) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.toolName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.purchaseDate
                    ? new Date(item.purchaseDate).toLocaleDateString()
                    : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.purchaseFrom || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.invoiceNo || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.ownerName || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {equipmentList.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-500">
                  No equipment found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-600">
            Showing {(meta.page - 1) * limit + 1} to{' '}
            {Math.min(meta.page * limit, meta.total)} of {meta.total}
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <span className="px-3 py-1 text-sm">
              Page {meta.page} of {meta.totalPages}
            </span>
            <Button
              size="sm"
              variant="outline"
              disabled={page === meta.totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Equipment"
        maxWidth="lg"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Tool Name"
              value={addForm.toolName}
              onChange={(e) =>
                setAddForm({ ...addForm, toolName: e.target.value })
              }
              required
            />
            <DatePicker
              label="Purchase Date"
              value={addForm.purchaseDate}
              onChange={(e) =>
                setAddForm({ ...addForm, purchaseDate: e.target.value })
              }
            />
            <Input
              label="Purchase From"
              value={addForm.purchaseFrom}
              onChange={(e) =>
                setAddForm({ ...addForm, purchaseFrom: e.target.value })
              }
            />
            <Input
              label="Invoice No."
              value={addForm.invoiceNo}
              onChange={(e) =>
                setAddForm({ ...addForm, invoiceNo: e.target.value })
              }
            />
            <Input
              label="Owner Name"
              value={addForm.ownerName}
              onChange={(e) =>
                setAddForm({ ...addForm, ownerName: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Equipment</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Equipment"
        maxWidth="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Tool Name"
              value={editForm.toolName}
              onChange={(e) =>
                setEditForm({ ...editForm, toolName: e.target.value })
              }
              required
            />
            <DatePicker
              label="Purchase Date"
              value={editForm.purchaseDate}
              onChange={(e) =>
                setEditForm({ ...editForm, purchaseDate: e.target.value })
              }
            />
            <Input
              label="Purchase From"
              value={editForm.purchaseFrom}
              onChange={(e) =>
                setEditForm({ ...editForm, purchaseFrom: e.target.value })
              }
            />
            <Input
              label="Invoice No."
              value={editForm.invoiceNo}
              onChange={(e) =>
                setEditForm({ ...editForm, invoiceNo: e.target.value })
              }
            />
            <Input
              label="Owner Name"
              value={editForm.ownerName}
              onChange={(e) =>
                setEditForm({ ...editForm, ownerName: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Update Equipment</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}