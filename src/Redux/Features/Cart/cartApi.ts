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
      query: ({userEmail,productId,quantity=1}) => ({
        url: "/cart",
        method: "POST",
        body: {email:userEmail,productId,quantity},
      }),
      invalidatesTags: ["cart"],
    }),
    removeFromCart: builder.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
    clearCart: builder.mutation({
      query: (id) => ({
        url: `/cart/${id}/clear-cart`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
    updateQuantity:builder.mutation({
      query: ({id,quantity}) => ({
        url: `/cart/${id}`,
        method: "PUT",
        body: {quantity},
      }),
      invalidatesTags: ["cart"],
    })
  }),
});

export const {
  useGetCartItemsQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
  useUpdateQuantityMutation,
} = cartApi;
