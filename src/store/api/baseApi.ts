import encryptedBaseQuery from '@/lib/Encryptedbasequery';
import { createApi } from '@reduxjs/toolkit/query/react';

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