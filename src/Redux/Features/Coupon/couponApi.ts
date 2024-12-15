import { baseApi } from '../../Api/baseApi';



export const couponApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        getCoupons: builder.query({
            query: () => 'coupons',
        }),
        getCouponById: builder.query({
            query: (id) => `coupons/${id}`,
        }),
        addCoupon: builder.mutation({
            query: (coupon) => ({
                url: 'coupons',
                method: 'POST',
                body: coupon,
            }),
        }),
        updateCoupon: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `coupons/${id}`,
                method: 'PATCH',
                body: patch,
            }),
        }),
        deleteCoupon: builder.mutation({
            query: (id) => ({
                url: `coupons/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetCouponsQuery,
    useGetCouponByIdQuery,
    useAddCouponMutation,
    useUpdateCouponMutation,
    useDeleteCouponMutation,
} = couponApi;