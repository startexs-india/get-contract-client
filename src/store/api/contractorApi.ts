import { baseApi } from './baseApi';

export const contractorApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateContractor: builder.mutation({
            query: ({ id, data }: { id: string; data: any }) => ({
                url: `/contractor/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Contractor'],
        }),
        getContractor: builder.query({
            query: (id: string) => `/contractor/${id}`,
            providesTags: (result, error, id) => [{ type: 'Contractor', id }],
        }),
    }),
});

export const {
    useUpdateContractorMutation,
    useGetContractorQuery,
} = contractorApi;