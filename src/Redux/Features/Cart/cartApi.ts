import { baseApi } from "../../Api/baseApi";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface AddToCartResponse {
  success: boolean;
  cartItem: CartItem;
}

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCartItems: builder.query<CartItem[], void>({
      query: () => "cart",
    }),
    addToCart: builder.mutation<AddToCartResponse, Partial<CartItem>>({
      query: (item) => ({
        url: "/cart",
        method: "POST",
        body: item,
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
