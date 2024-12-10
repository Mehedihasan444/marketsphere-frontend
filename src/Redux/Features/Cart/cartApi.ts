import { baseApi } from "../../Api/baseApi";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}



export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCartItems: builder.query({
      query: () => ({
        url:"/cart",
        method: "GET",
      }),
    }),
    addToCart: builder.mutation({
      query: ({userEmail,productId}) => ({
        url: "/cart",
        method: "POST",
        body: {email:userEmail,productId},
      }),
    }),
    removeFromCart: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
    }),
    clearCart: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCartItemsQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
} = cartApi;
