import { baseApi } from '../../Api/baseApi';

interface FlashSaleItem {
    id: string;
    name: string;
    price: number;
    discount: number;
    imageUrl: string;
}

export const flashSaleApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        getFlashSaleItems: builder.query<FlashSaleItem[], void>({
            query: () => '/flash-sales',
        }),
        getFlashSaleItemById: builder.query<FlashSaleItem, string>({
            query: (id) => `/flash-sales/${id}`,
        }),
    }),
});

export const { useGetFlashSaleItemsQuery, useGetFlashSaleItemByIdQuery } = flashSaleApi;