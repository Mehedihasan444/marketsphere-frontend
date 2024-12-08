import { baseApi } from '../../Api/baseApi';

interface Order {
    id: string;
    product: string;
    quantity: number;
    price: number;
}

export const orderApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        getOrders: builder.query<Order[], void>({
            query: () => '/orders',
        }),
        getOrderHistory: builder.query<Order[], void>({
            query: () => '/orders',
        }),
        getOrderById: builder.query<Order, string>({
            query: (id) => `/orders/${id}`,
        }),
        createOrder: builder.mutation<Order, Partial<Order>>({
            query: (newOrder) => ({
                url: '/orders',
                method: 'POST',
                body: newOrder,
            }),
        }),
        updateOrder: builder.mutation<Order, Partial<Order>>({
            query: ({ id, ...patch }) => ({
                url: `/orders/${id}`,
                method: 'PATCH',
                body: patch,
            }),
        }),
        deleteOrder: builder.mutation<{ success: boolean; id: string }, string>({
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