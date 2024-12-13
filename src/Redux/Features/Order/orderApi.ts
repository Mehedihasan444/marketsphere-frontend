import { baseApi } from '../../Api/baseApi';


export const orderApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => '/orders',
        }),
        getOrderHistory: builder.query({
            query: () => '/orders',
        }),
        getOrderById: builder.query({
            query: (id) => `/orders/${id}`,
        }),
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: '/orders',
                method: 'POST',
                body: newOrder,
            }),
        }),
        updateOrder: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `/orders/${id}`,
                method: 'PATCH',
                body: patch,
            }),
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/orders/${id}`,
                method: 'DELETE',
            }),
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