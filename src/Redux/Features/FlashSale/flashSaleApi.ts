import { baseApi } from '../../Api/baseApi';

export const flashSaleApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        getFlashSaleItems: builder.query({
            query: () => '/flash-sales',
        }),
        getFlashSaleItemById: builder.query({
            query: (id) => `/flash-sales/${id}`,
        }),
    }),
});

export const { useGetFlashSaleItemsQuery, useGetFlashSaleItemByIdQuery } = flashSaleApi;