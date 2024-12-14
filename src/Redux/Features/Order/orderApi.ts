import { OrderStatus } from '../../../Interface';
import { baseApi } from '../../Api/baseApi';


export const orderApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        getOrders: builder.query({
            query: ({ paymentStatus, status, page, limit }) => {
                let queryString = '/orders?';
                if (paymentStatus) {
                    queryString += `paymentStatus=${paymentStatus}&`;

                }
                if (status) {
                    queryString += `status=${status}&`;
                }
                if (page) {
                    queryString += `page=${page}&`;
                }
                if (limit) {
                    queryString += `limit=${limit}&`;
                }
                return { url: queryString, method: 'GET' }
            },
            providesTags: ['order'],
        }),
        getOrderHistory: builder.query({
            query: ({ paymentStatus, status, page, limit }) => {
                let queryString = '/orders?';
                if (paymentStatus) {
                    queryString += `paymentStatus=${paymentStatus}&`;

                }
                if (status) {
                    queryString += `status=${status}&`;
                }
                if (page) {
                    queryString += `page=${page}&`;
                }
                if (limit) {
                    queryString += `limit=${limit}&`;
                }
                return { url: queryString, method: 'GET' }
            },
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
            invalidatesTags: ['order',"user","cart"],
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
        cancelOrder: builder.mutation({
            query: (id) => ({
                url: `/orders/${id}`,
                method: 'PUT',
                body: { status: OrderStatus.CANCELLED }
            }),
            invalidatesTags: ['order'],
        }),
        makePayment: builder.mutation({
            query: (paymentData) => ({
                url: '/payment',
                method: 'POST',
                body: paymentData,
            }),
            invalidatesTags: ['order',"transaction"],
        })
    }),
});

export const {
    useGetOrdersQuery,
    useGetOrderByIdQuery,
    useCreateOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
    useGetOrderHistoryQuery,
    useMakePaymentMutation,
    useCancelOrderMutation
} = orderApi;