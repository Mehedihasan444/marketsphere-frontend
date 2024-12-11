import { baseApi } from "../../Api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminReviews: builder.query({
      query: ({ status, page, limit }: { status: string; page: number; limit: number }) => {
        let queryString = "/reviews?";
        if (status) queryString += `status=${status}&`;
        if (page) queryString += `page=${page}&`;
        if (limit) queryString += `limit=${limit}&`;
        return { url: queryString, method: "GET" };
      },
      providesTags: ["review"],
    }),
    updateReviewStatus: builder.mutation({
      query: ({ id, status }: { id: string; status: string }) => ({
        url: `/reviews/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["review"],
    }),
    getVendorReviews: builder.query({
      query: ({ vendorId, page, limit }: { vendorId: string; page: number; limit: number }) => {
      let queryString = `/vendors/${vendorId}/reviews?`;
      if (page) queryString += `page=${page}&`;
      if (limit) queryString += `limit=${limit}&`;
      return { url: queryString, method: "GET" };
      },
      providesTags: ["review"],
    }),
    getProductReviews: builder.query({
      query: ({ productId, page, limit }: { productId: string; page: number; limit: number }) => {
      let queryString = `/reviews/product/${productId}?`;
      if (page) queryString += `page=${page}&`;
      if (limit) queryString += `limit=${limit}&`;
      return { url: queryString, method: "GET" };
      },
      providesTags: ["review"],
    })
  }),
});

export const { useGetAdminReviewsQuery,useGetProductReviewsQuery, useUpdateReviewStatusMutation,useGetVendorReviewsQuery } = reviewApi;
