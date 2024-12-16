import { baseApi } from "../../Api/baseApi";


const wishlistApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getWishlistItems: builder.query({
            query: () => ({
                url: "/wishlist",
                method: "GET",
            }),
            providesTags: ["wishlist"],
        }),
        addToWishlist: builder.mutation({
            query: ({ userEmail, productId, quantity = 1 }) => ({
                url: "/wishlist",
                method: "POST",
                body: { email: userEmail, productId, quantity },
            }),
            invalidatesTags: ["wishlist"],
        }),
        removeFromWishlist: builder.mutation({
            query: (id) => ({
                url: `/wishlist/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["wishlist"],
        }),
        clearWishlist: builder.mutation({
            query: (id) => ({
                url: `/wishlist/${id}/clear-wishlist`,
                method: "DELETE",
            }),
            invalidatesTags: ["wishlist"],
        }),

    }),
});

export const {
    useGetWishlistItemsQuery,
    useAddToWishlistMutation,
    useRemoveFromWishlistMutation,
    useClearWishlistMutation,
} = wishlistApi;
