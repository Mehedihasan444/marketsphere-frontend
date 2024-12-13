import { baseApi } from '../../Api/baseApi';


export const orderApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => '/orders',
            providesTags: ['order'],
        }),
        getOrderHistory: builder.query({
            query: () => '/orders',
            providesTags: ['order'],
        }),
        getOrderById: builder.query({
            query: (id) => `/orders/${id}`,
            providesTags: ['order'],
        }),
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: '/orders',
                method: 'POST',
                body: newOrder,
            }),
            invalidatesTags: ['order'],
        }),
        updateOrder: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `/orders/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: ['order'],
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/orders/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['order'],
        }),
    }),
});

export const {
    useGetOrdersQuery,
    useGetOrderByIdQuery,
    useCreateOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
    useGetOrderHistoryQuery
} = orderApi;