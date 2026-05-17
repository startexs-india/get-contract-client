import { baseApi } from './baseApi';

export const auditApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listAudits: builder.query({
      query: ({ companyId, params }: { companyId: string; params: any }) => ({
        url: `/company/${companyId}/audit`,
        method: 'GET',
        params,
      }),
      providesTags: ['Audit'],
    }),
    createAudit: builder.mutation({
      query: ({ companyId, data }: { companyId: string; data: any }) => ({
        url: `/company/${companyId}/audit`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Audit'],
    }),
    updateAudit: builder.mutation({
      query: ({ companyId, auditId, data }: { companyId: string; auditId: string; data: any }) => ({
        url: `/company/${companyId}/audit/${auditId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Audit'],
    }),
    deleteAudit: builder.mutation({
      query: ({ companyId, auditId }: { companyId: string; auditId: string }) => ({
        url: `/company/${companyId}/audit/${auditId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Audit'],
    }),
  }),
});

export const {
  useListAuditsQuery,
  useCreateAuditMutation,
  useUpdateAuditMutation,
  useDeleteAuditMutation,
} = auditApi;