/* eslint-disable @typescript-eslint/no-explicit-any */
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
  // Handle JWT expiration globally
  if (result.error && result.error.status === 500) {
    // Check if the error object has the expected structure
    const errorData = result.error.data as { message?: string } | undefined;
    // !need to be fix
    if (errorData?.message === "jwt expired") {
      // Logout the user and clear the token
      api.dispatch(logout());

      // Optionally redirect to login page
      window.location.href = "/login";
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
