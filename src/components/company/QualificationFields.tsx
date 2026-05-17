'use client';

import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import DatePicker from '@/components/ui/DatePicker';

interface Qualification {
  degree: string;
  stream?: string;
  institute?: string;
  startYear?: number;
  endYear?: number;
  grade?: string;
}

interface QualificationsProps {
  qualifications: Qualification[];
  onChange: (quals: Qualification[]) => void;
}

export default function QualificationFields({ qualifications, onChange }: QualificationsProps) {
  const addQualification = () => {
    onChange([...qualifications, { degree: '', stream: '', institute: '', startYear: undefined, endYear: undefined, grade: '' }]);
  };

  const removeQualification = (index: number) => {
    const newQuals = [...qualifications];
    newQuals.splice(index, 1);
    onChange(newQuals);
  };

  const updateQualification = (index: number, field: keyof Qualification, value: any) => {
    const newQuals = [...qualifications];
    newQuals[index][field] = value;
    onChange(newQuals);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">Qualifications</label>
        <Button type="button" size="sm" variant="outline" onClick={addQualification}>
          <PlusIcon className="h-4 w-4 mr-1" /> Add
        </Button>
      </div>
      {qualifications.map((qual, idx) => (
        <div key={idx} className="border rounded-lg p-3 bg-gray-50 relative">
          {idx > 0 && (
            <button
              type="button"
              onClick={() => removeQualification(idx)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="Degree"
              value={qual.degree}
              onChange={(e) => updateQualification(idx, 'degree', e.target.value)}
              required
            />
            <Input
              label="Stream"
              value={qual.stream || ''}
              onChange={(e) => updateQualification(idx, 'stream', e.target.value)}
            />
            <Input
              label="Institute"
              value={qual.institute || ''}
              onChange={(e) => updateQualification(idx, 'institute', e.target.value)}
            />
            <Input
              label="Start Year"
              type="number"
              value={qual.startYear || ''}
              onChange={(e) => updateQualification(idx, 'startYear', parseInt(e.target.value) || undefined)}
              min="1950"
              max={new Date().getFullYear()}
            />
            <Input
              label="End Year (Passing) *"
              type="number"
              value={qual.endYear || ''}
              onChange={(e) => updateQualification(idx, 'endYear', parseInt(e.target.value) || undefined)}
              required
              min="1950"
              max={new Date().getFullYear() + 5}
            />
            <Input
              label="Grade / Percentage"
              value={qual.grade || ''}
              onChange={(e) => updateQualification(idx, 'grade', e.target.value)}
            />
          </div>
        </div>
      ))}
      {qualifications.length === 0 && (
        <p className="text-sm text-gray-500">No qualifications added. Click "Add" to enter education details.</p>
      )}
    </div>
  );
}