import { baseApi } from "../../Api/baseApi";

export const becomeSellerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendBecomeVendorRequest: builder.mutation({
      query: (item) => ({
        url: "/become-a-vendor",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["BecomeVendorRequest"],
    }),
    cancelRequest: builder.mutation({
      query: (id) => ({
        url: `/become-a-vendor/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BecomeVendorRequest"],
    }),
    getAllBecomeVendorRequests: builder.query({
      query: () => ({
        url: "/become-a-vendor",
        method: "GET",
      }),
      providesTags: ["BecomeVendorRequest"],
    }),
    updateBecomeVendorRequest: builder.mutation({
      query: ({ id, status }) => {
        return {
        url: `/become-a-vendor/${id}/status`,
        method: "PATCH",
        body:  {status: status} ,
      }},
      invalidatesTags: ["BecomeVendorRequest"],
    }),
    getSingleBecomeVendorRequest: builder.query({
      query: (id) => ({
        url: `/become-a-vendor/${id}`,
        method: "GET",
      }),
      providesTags: ["BecomeVendorRequest"],
    }),
  }),
});

export const {
  useSendBecomeVendorRequestMutation,
  useCancelRequestMutation,
  useGetAllBecomeVendorRequestsQuery,
  useUpdateBecomeVendorRequestMutation,
  useGetSingleBecomeVendorRequestQuery,
} = becomeSellerApi;
