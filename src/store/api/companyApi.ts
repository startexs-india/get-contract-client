import { baseApi } from './baseApi';

export const companyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCompany: builder.mutation({
      query: (data: any) => ({
        url: '/company',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Company'],
    }),
    getCompany: builder.query({
      query: (companyId: string) => `/company/${companyId}`,
      providesTags: (result, error, id) => [{ type: 'Company', id }],
    }),
    updateCompany: builder.mutation({
      query: ({ companyId, data }: { companyId: string; data: any }) => ({
        url: `/company/${companyId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Company'],
    }),
    listCompanies: builder.query({
      query: (params?: { page?: number; limit?: number }) => ({
        url: '/company/list',
        method: 'GET',
        params,
      }),
      providesTags: ['Company'],
    }),
    deleteCompany: builder.mutation({
      query: (companyId: string) => ({
        url: `/company/${companyId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Company'],
    }),
  }),
});

export const {
  useCreateCompanyMutation,
  useGetCompanyQuery,
  useUpdateCompanyMutation,
  useListCompaniesQuery,
  useDeleteCompanyMutation,
} = companyApi;