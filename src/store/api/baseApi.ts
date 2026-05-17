import { createApi } from '@reduxjs/toolkit/query/react';
import encryptedBaseQuery from '@/lib/encryptedBaseQuery';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: encryptedBaseQuery,
  tagTypes: [
    'Tender',
    'Bid',
    'Company',
    'Contractor',
    'Director',
    'Engineer',
    'Equipment',
    'Registration',
    'Audit',
    'ExperienceCertificate',
    'ExperienceQuantity',
    'ExistingCommitment',
  ],
  endpoints: () => ({}),
});