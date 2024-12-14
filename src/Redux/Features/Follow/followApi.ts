import { baseApi } from "../../Api/baseApi";

const followApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   
    follow: builder.mutation({
      query: (followInfo) => ({
      url: `/follow-shop/${followInfo?.shopId}/follow`,
      method: "POST",
      body: followInfo,
      }),
      invalidatesTags: ["follow","shop","user"],
    }),
    unfollow: builder.mutation({
      query: (followInfo) => ({
        url: `/follow-shop/${followInfo.shopId}/unfollow`,
        method: "POST",
        body: followInfo,
      }),
      invalidatesTags: ["follow","shop","user"],
    }),
    followedShops: builder.query({
      query: () => "/follow-shop/followed-shops",
      providesTags: ["follow"],
    })
  }),
});

export const { useFollowedShopsQuery,useFollowMutation,useUnfollowMutation } = followApi;
