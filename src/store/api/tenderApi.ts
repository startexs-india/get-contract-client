import { baseApi } from './baseApi';

export const tenderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listTenders: builder.query({
      query: (params?: any) => ({
        url: '/tender/list',
        method: 'GET',
        params,
      }),
      providesTags: ['Tender'],
    }),
    getTender: builder.query({
      query: (id: string) => `/tender/${id}`,
      providesTags: (result, error, id) => [{ type: 'Tender', id }],
    }),
    applyTender: builder.mutation({
      query: ({ id, data }: { id: string; data: any }) => ({
        url: `/tender/${id}/apply`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Tender', 'Bid'],
    }),
  }),
});

export const {
  useListTendersQuery,
  useGetTenderQuery,
  useApplyTenderMutation,
} = tenderApi;