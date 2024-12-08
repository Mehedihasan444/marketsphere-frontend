import { baseApi } from '../../Api/baseApi';

interface Coupon {
    id: string;
    code: string;
    discount: number;
    expirationDate: string;
}

export const couponApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        getCoupons: builder.query<Coupon[], void>({
            query: () => 'coupons',
        }),
        getCouponById: builder.query<Coupon, string>({
            query: (id) => `coupons/${id}`,
        }),
        addCoupon: builder.mutation<Coupon, Partial<Coupon>>({
            query: (coupon) => ({
                url: 'coupons',
                method: 'POST',
                body: coupon,
            }),
        }),
        updateCoupon: builder.mutation<Coupon, Partial<Coupon>>({
            query: ({ id, ...patch }) => ({
                url: `coupons/${id}`,
                method: 'PATCH',
                body: patch,
            }),
        }),
        deleteCoupon: builder.mutation<{ success: boolean; id: string }, string>({
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