import { baseApi } from "../../Api/baseApi";

const followApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   
    follow: builder.mutation({
      query: (id:string) => ({
      url: `/follow-shop/${id}/follow`,
      method: "PATCH",
      }),
      invalidatesTags: ["follow"],
    }),
    unfollow: builder.mutation({
      query: (id: string) => ({
        url: `/follow-shop/${id}/unfollow`,
        method: "PATCH",
      }),
      invalidatesTags: ["follow"],
    }),
    followedShops: builder.query({
      query: () => "/follow-shop/followed-shops",
      providesTags: ["follow"],
    })
  }),
});

export const { useFollowedShopsQuery,useFollowMutation,useUnfollowMutation } = followApi;
