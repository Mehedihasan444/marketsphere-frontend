import { baseApi } from "../../Api/baseApi";

const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllShops: builder.query({
      query: ({ status, page, limit }: { status: string; page: number; limit: number }) => {
        let queryString = "/shops?";
        if (status) queryString += `status=${status}&`;
        if (page) queryString += `page=${page}&`;
        if (limit) queryString += `limit=${limit}&`;
        return { url: queryString, method: "GET" };
      },
      providesTags: ["shop"],
    }),
    getShop: builder.query({
      query: (id: string) => ({
        url: `/shops/${id}`,
        method: "GET",
      }),
      providesTags: ["shop"],
    }),
    updateShopStatus: builder.mutation({
      query: ({ id, status }: { id: string; status: string }) => ({
        url: `/shops/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["shop"],
    }),
    addShop: builder.mutation({
      query: (payload) => ({
      url: "/shops",
      method: "POST",
      body: payload,
      }),
      invalidatesTags: ["shop"],
    }),
    deleteShop: builder.mutation({
      query: (id: string) => ({
        url: `/shops/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["shop"],
    }),
  }),
});

export const { useGetAllShopsQuery, useUpdateShopStatusMutation,useAddShopMutation,useDeleteShopMutation } = shopApi;
