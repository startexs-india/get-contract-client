import { baseApi } from './baseApi';

export const bidApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listBids: builder.query({
      query: ({ companyId, params }: { companyId: string; params: any }) => ({
        url: `/company/${companyId}/bids`,
        method: 'GET',
        params,
      }),
      providesTags: ['Bid'],
    }),
    createBid: builder.mutation({
      query: ({ companyId, data }: { companyId: string; data: any }) => ({
        url: `/company/${companyId}/bids`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Bid'],
    }),
    updateBid: builder.mutation({
      query: ({ companyId, bidId, data }: { companyId: string; bidId: string; data: any }) => ({
        url: `/company/${companyId}/bids/${bidId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Bid'],
    }),
    deleteBid: builder.mutation({
      query: ({ companyId, bidId }: { companyId: string; bidId: string }) => ({
        url: `/company/${companyId}/bids/${bidId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Bid'],
    }),
  }),
});

export const {
  useListBidsQuery,
  useCreateBidMutation,
  useUpdateBidMutation,
  useDeleteBidMutation,
} = bidApi;