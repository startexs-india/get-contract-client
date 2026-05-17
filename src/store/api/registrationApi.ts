import { baseApi } from './baseApi';

export const registrationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listRegistrations: builder.query({
      query: ({ companyId, params }: { companyId: string; params: any }) => ({
        url: `/company/${companyId}/registration`,
        method: 'GET',
        params,
      }),
      providesTags: ['Registration'],
    }),
    createRegistration: builder.mutation({
      query: ({ companyId, data }: { companyId: string; data: any }) => ({
        url: `/company/${companyId}/registration`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Registration'],
    }),
    updateRegistration: builder.mutation({
      query: ({ companyId, registrationId, data }: { companyId: string; registrationId: string; data: any }) => ({
        url: `/company/${companyId}/registration/${registrationId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Registration'],
    }),
    deleteRegistration: builder.mutation({
      query: ({ companyId, registrationId }: { companyId: string; registrationId: string }) => ({
        url: `/company/${companyId}/registration/${registrationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Registration'],
    }),
  }),
});

export const {
  useListRegistrationsQuery,
  useCreateRegistrationMutation,
  useUpdateRegistrationMutation,
  useDeleteRegistrationMutation,
} = registrationApi;