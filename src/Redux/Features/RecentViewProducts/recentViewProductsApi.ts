



import { baseApi } from "../../Api/baseApi";

const recentViewProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   
    addRecentViewProduct: builder.mutation({
      query: (recentViewProductInfo) => ({
      url: `/recent-view-products`,
      method: "POST",
      body: recentViewProductInfo,
      }),
      invalidatesTags: ["recentViewProduct"],
    }),
 
    getRecentViewProducts: builder.query({
      query: () => "/recent-view-products",
      providesTags: ["recentViewProduct"],
    })
  }),
});

export const { useAddRecentViewProductMutation,useGetRecentViewProductsQuery} = recentViewProductApi;
