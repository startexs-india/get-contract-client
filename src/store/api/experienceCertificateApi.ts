import { baseApi } from './baseApi';

export const experienceCertificateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listExperienceCertificates: builder.query({
      query: ({ companyId, params }: { companyId: string; params: any }) => ({
        url: `/company/${companyId}/experience-certificate`,
        method: 'GET',
        params,
      }),
      providesTags: ['ExperienceCertificate'],
    }),
    createExperienceCertificate: builder.mutation({
      query: ({ companyId, data }: { companyId: string; data: any }) => ({
        url: `/company/${companyId}/experience-certificate`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ExperienceCertificate'],
    }),
    updateExperienceCertificate: builder.mutation({
      query: ({ companyId, certId, data }: { companyId: string; certId: string; data: any }) => ({
        url: `/company/${companyId}/experience-certificate/${certId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['ExperienceCertificate'],
    }),
    deleteExperienceCertificate: builder.mutation({
      query: ({ companyId, certId }: { companyId: string; certId: string }) => ({
        url: `/company/${companyId}/experience-certificate/${certId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ExperienceCertificate'],
    }),
  }),
});

export const {
  useListExperienceCertificatesQuery,
  useCreateExperienceCertificateMutation,
  useUpdateExperienceCertificateMutation,
  useDeleteExperienceCertificateMutation,
} = experienceCertificateApi;