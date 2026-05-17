import { baseApi } from './baseApi';

export const equipmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listEquipment: builder.query({
      query: ({ companyId, params }: { companyId: string; params: any }) => ({
        url: `/company/${companyId}/equipment`,
        method: 'GET',
        params,
      }),
      providesTags: ['Equipment'],
    }),
    createEquipment: builder.mutation({
      query: ({ companyId, data }: { companyId: string; data: any }) => ({
        url: `/company/${companyId}/equipment`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Equipment'],
    }),
    updateEquipment: builder.mutation({
      query: ({ companyId, equipmentId, data }: { companyId: string; equipmentId: string; data: any }) => ({
        url: `/company/${companyId}/equipment/${equipmentId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Equipment'],
    }),
    deleteEquipment: builder.mutation({
      query: ({ companyId, equipmentId }: { companyId: string; equipmentId: string }) => ({
        url: `/company/${companyId}/equipment/${equipmentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Equipment'],
    }),
  }),
});

export const {
  useListEquipmentQuery,
  useCreateEquipmentMutation,
  useUpdateEquipmentMutation,
  useDeleteEquipmentMutation,
} = equipmentApi;