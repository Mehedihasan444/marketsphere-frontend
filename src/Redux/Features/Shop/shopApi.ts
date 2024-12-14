import { baseApi } from "../../Api/baseApi";

const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllShops: builder.query({
      query: ({
        searchTerm,
        status,
        page,
        limit,
      }: {
        searchTerm?: string;
        status?: string;
        page: number;
        limit: number;
      }) => {

        let queryString = "/shops?";
        if (searchTerm) queryString += `searchTerm=${searchTerm}&`;
        if (status && status!=" ") queryString += `status=${status}&`;
        if (page) queryString += `page=${page}&`;
        if (limit) queryString += `limit=${limit}&`;
        return { url: queryString, method: "GET" };
      },
      providesTags: ["shop"],
    }),
    getShop: builder.query({
      query: (id: string) => {
        return {
          url: `/shops/${id}`,
          method: "GET",
        };
      },
      providesTags: ["shop"],
    }),
    updateShopStatus: builder.mutation({
      query: ({ id, shopStatus }: { id: string; shopStatus: string }) => ({
        url: `/shops/${id}/status`,
        method: "PATCH",
        body:  {shopStatus} ,
      }),
      invalidatesTags: ["shop"],
    }),
    addShop: builder.mutation({
      query: (payload) => ({
        url: "/shops",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["vendor"],
    }),
    updateShop: builder.mutation({
      query: ({id,formData}) => ({
        url:  `/shops/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["vendor","shop"],
    }),
    deleteShop: builder.mutation({
      query: (id: string) => ({
        url: `/shops/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["vendor","shop"],
    }),
  }),
});

export const {
  useGetAllShopsQuery,
  useUpdateShopStatusMutation,
  useAddShopMutation,
  useDeleteShopMutation,
  useUpdateShopMutation,
  useGetShopQuery,
} = shopApi;
