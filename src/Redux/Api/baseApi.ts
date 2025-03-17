import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

// A wrapper around fetchBaseQuery to handle JWT expiration
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { logout } from "../Features/Auth/authSlice";

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", token);
      }
      return headers;
    },
  });

  const result = await baseQuery(args, api, extraOptions);
  // Updated JWT expiration handling
  if (result.error) {
    // Handle network errors first
    if ('status' in result.error) {
      // Check for 401 status
      if (result.error.status === 401) {
        const errorData = result.error.data as { message?: string };
        if (errorData?.message === 'JWT expired') {
          api.dispatch(logout());
          window.location.href = '/login';
        }
      }
      // Add other status code handling if needed
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  // baseQuery: baseQueryWithReauth,
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "product",
    "wishlist",
    "order",
    "cart",
    "review",
    "user",
    "category",
    "shop",
    "transaction",
    "vendor",
    "follow",
    "BecomeVendorRequest",
    "coupon",
    "recentViewProduct",
    "flashSale"
  ],

  endpoints: () => ({}),
});
