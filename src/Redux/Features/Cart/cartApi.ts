import { baseApi } from "../../Api/baseApi";


const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCartItems: builder.query({
      query: () => ({
        url:"/cart",
        method: "GET",
      }),
      providesTags: ["cart"],
    }),
    addToCart: builder.mutation({
      query: ({userEmail,productId}) => ({
        url: "/cart",
        method: "POST",
        body: {email:userEmail,productId},
      }),
      invalidatesTags: ["cart"],
    }),
    removeFromCart: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
    clearCart: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export const {
  useGetCartItemsQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
} = cartApi;
