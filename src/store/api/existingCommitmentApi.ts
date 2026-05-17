import { baseApi } from './baseApi';

export const existingCommitmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listExistingCommitments: builder.query({
      query: ({ companyId, params }: { companyId: string; params: any }) => ({
        url: `/company/${companyId}/commitments`,
        method: 'GET',
        params,
      }),
      providesTags: ['ExistingCommitment'],
    }),
    createExistingCommitment: builder.mutation({
      query: ({ companyId, data }: { companyId: string; data: any }) => ({
        url: `/company/${companyId}/commitments`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ExistingCommitment'],
    }),
    updateExistingCommitment: builder.mutation({
      query: ({ companyId, commitmentId, data }: { companyId: string; commitmentId: string; data: any }) => ({
        url: `/company/${companyId}/commitments/${commitmentId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['ExistingCommitment'],
    }),
    deleteExistingCommitment: builder.mutation({
      query: ({ companyId, commitmentId }: { companyId: string; commitmentId: string }) => ({
        url: `/company/${companyId}/commitments/${commitmentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ExistingCommitment'],
    }),
  }),
});

export const {
  useListExistingCommitmentsQuery,
  useCreateExistingCommitmentMutation,
  useUpdateExistingCommitmentMutation,
  useDeleteExistingCommitmentMutation,
} = existingCommitmentApi;