import { baseApi } from '../../Api/baseApi';



export const couponApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        getCoupons: builder.query({
            query: () => '/coupons',
            providesTags: ['coupon'],
        }),
        getSingleShopCoupons: builder.query({
            query: (shopId) => `/coupons/${shopId}`,
            providesTags: ['coupon'],
        }),
        getCouponById: builder.query({
            query: (id) => `/coupons/${id}`,
        }),
        addCoupon: builder.mutation({
            query: (coupon) => ({
                url: '/coupons',
                method: 'POST',
                body: coupon,
            }),
            invalidatesTags: ['coupon'],
        }),
        updateCoupon: builder.mutation({
            query: ({ id, ...patch }) => {
                return {
                    url: `/coupons/${id}`,
                    method: 'PATCH',
                    body: patch,
                }
            },
            invalidatesTags: ['coupon'],
        }),
        deleteCoupon: builder.mutation({
            query: (id) => ({
                url: `/coupons/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['coupon'],
        }),
        applyCoupon: builder.mutation({
            query: (coupon) => ({
                url: '/coupons/apply',
                method: 'POST',
                body: coupon,
            }),
            invalidatesTags: ['coupon'],
        })
    }),
});

export const {
    useGetCouponsQuery,
    useGetCouponByIdQuery,
    useAddCouponMutation,
    useUpdateCouponMutation,
    useDeleteCouponMutation,
    useGetSingleShopCouponsQuery,
    useApplyCouponMutation
} = couponApi;