import { baseApi } from './baseApi';

export const directorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listDirectors: builder.query({
      query: ({ companyId, params }: { companyId: string; params: any }) => ({
        url: `/company/${companyId}/director`,
        method: 'GET',
        params,
      }),
      providesTags: ['Director'],
    }),
    createDirector: builder.mutation({
      query: ({ companyId, data }: { companyId: string; data: any }) => ({
        url: `/company/${companyId}/director`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Director'],
    }),
    updateDirector: builder.mutation({
      query: ({ companyId, directorId, data }: { companyId: string; directorId: string; data: any }) => ({
        url: `/company/${companyId}/director/${directorId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Director'],
    }),
    deleteDirector: builder.mutation({
      query: ({ companyId, directorId }: { companyId: string; directorId: string }) => ({
        url: `/company/${companyId}/director/${directorId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Director'],
    }),
  }),
});

export const {
  useListDirectorsQuery,
  useCreateDirectorMutation,
  useUpdateDirectorMutation,
  useDeleteDirectorMutation,
} = directorApi;