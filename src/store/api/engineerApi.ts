import { baseApi } from './baseApi';

export const engineerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listEngineers: builder.query({
      query: ({ companyId, params }: { companyId: string; params: any }) => ({
        url: `/company/${companyId}/engineer`,
        method: 'GET',
        params,
      }),
      providesTags: ['Engineer'],
    }),
    createEngineer: builder.mutation({
      query: ({ companyId, data }: { companyId: string; data: any }) => ({
        url: `/company/${companyId}/engineer`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Engineer'],
    }),
    updateEngineer: builder.mutation({
      query: ({ companyId, engineerId, data }: { companyId: string; engineerId: string; data: any }) => ({
        url: `/company/${companyId}/engineer/${engineerId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Engineer'],
    }),
    deleteEngineer: builder.mutation({
      query: ({ companyId, engineerId }: { companyId: string; engineerId: string }) => ({
        url: `/company/${companyId}/engineer/${engineerId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Engineer'],
    }),
  }),
});

export const {
  useListEngineersQuery,
  useCreateEngineerMutation,
  useUpdateEngineerMutation,
  useDeleteEngineerMutation,
} = engineerApi;