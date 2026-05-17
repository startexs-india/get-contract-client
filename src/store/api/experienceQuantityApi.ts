import { baseApi } from './baseApi';

export const experienceQuantityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listExperienceQuantities: builder.query({
      query: ({ companyId, params }: { companyId: string; params: any }) => ({
        url: `/company/${companyId}/experience-quantity`,
        method: 'GET',
        params,
      }),
      providesTags: ['ExperienceQuantity'],
    }),
    createExperienceQuantity: builder.mutation({
      query: ({ companyId, data }: { companyId: string; data: any }) => ({
        url: `/company/${companyId}/experience-quantity`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ExperienceQuantity'],
    }),
    updateExperienceQuantity: builder.mutation({
      query: ({ companyId, quantityId, data }: { companyId: string; quantityId: string; data: any }) => ({
        url: `/company/${companyId}/experience-quantity/${quantityId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['ExperienceQuantity'],
    }),
    deleteExperienceQuantity: builder.mutation({
      query: ({ companyId, quantityId }: { companyId: string; quantityId: string }) => ({
        url: `/company/${companyId}/experience-quantity/${quantityId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ExperienceQuantity'],
    }),
  }),
});

export const {
  useListExperienceQuantitiesQuery,
  useCreateExperienceQuantityMutation,
  useUpdateExperienceQuantityMutation,
  useDeleteExperienceQuantityMutation,
} = experienceQuantityApi;