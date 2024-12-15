import { baseApi } from "../../Api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminReviews: builder.query({
      query: ({  page, limit }: { page?: number; limit?: number }) => {
        let queryString = "/reviews?";
        if (page) queryString += `page=${page}&`;
        if (limit) queryString += `limit=${limit}&`;
        return { url: queryString, method: "GET" };
      },
      providesTags: ["review"],
    }),
    getCustomerReviews: builder.query({
      query: ({  page, limit }: {  page?: number; limit?: number }) => {
        let queryString = "/reviews?";
  
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
      query: ({ page, limit }: { page?: number; limit?: number }) => {
      let queryString = `/reviews?`;
      if (page) queryString += `page=${page}&`;
      if (limit) queryString += `limit=${limit}&`;
      return { url: queryString, method: "GET" };
      },
      providesTags: ["review"],
    }),
    getProductReviews: builder.query({
      query: ({ productId, page, limit }: { productId: string; page?: number; limit?: number }) => {
      let queryString = `/reviews/product/${productId}?`;
      if (page) queryString += `page=${page}&`;
      if (limit) queryString += `limit=${limit}&`;
      return { url: queryString, method: "GET" };
      },
      providesTags: ["review"],
    }),
    addReviews: builder.mutation({
      query: ( review ) => ({
        url: `/reviews`,
        method: "POST",
        body:  review ,
      }),
      invalidatesTags: ["review","order"],
    }),
    deleteReview: builder.mutation({
      query: (id: string) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["review","product","order"],
    })
  }),
});

export const { useGetAdminReviewsQuery,useGetProductReviewsQuery, useGetCustomerReviewsQuery,useGetVendorReviewsQuery,
  useUpdateReviewStatusMutation,
  useAddReviewsMutation,
  useDeleteReviewMutation
 } = reviewApi;
