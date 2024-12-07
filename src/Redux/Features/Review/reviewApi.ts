import { baseApi } from "../../Api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
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
  }),
});

export const { useGetAllReviewsQuery, useUpdateReviewStatusMutation } = reviewApi;
