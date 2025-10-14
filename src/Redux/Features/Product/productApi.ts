import { baseApi } from "../../Api/baseApi";



export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({
        category,
        searchTerm,
        brand,
        page,
        limit,
        sortBy,
        sortOrder
      }: {
        category?: string;
        searchTerm?: string;
        brand?: string;
        page?: number;
        limit?: number;
        sortBy?: string;
        sortOrder?: string;
      }) => {
        let queryString = "/products?";
        if (searchTerm) queryString += `searchTerm=${searchTerm}&`;
        if (brand) queryString += `brand=${brand}&`;
        if (category) queryString += `category=${category}&`;
        if (page) queryString += `page=${page}&`;
        if (sortBy) queryString += `sortBy=${sortBy}&`;
        if (sortOrder) queryString += `sortOrder=${sortOrder}&`;
        if (limit) queryString += `limit=${limit}&`;
        return { url: queryString, method: "GET" };
      },

      providesTags: ["product"],
    }),
    getVendorProducts:builder.query({
      query: ({
        category,
        searchTerm,
        brand,
        page,
        limit,
      }: {
        category?: string;
        searchTerm?: string;
        brand?: string;
        page?: number;
        limit?: number;
      }) => {
        let queryString = "/products/vendor?";
        if (searchTerm) queryString += `searchTerm=${searchTerm}&`;
        if (brand) queryString += `brand=${brand}&`;
        if (category) queryString += `category=${category}&`;
        if (page) queryString += `page=${page}&`;
        if (limit) queryString += `limit=${limit}&`;
        return { url: queryString, method: "GET" };
      },

      providesTags: ["product"],
    }),
    getPriorityBasedProducts: builder.query({
      query: (page) => {
        let queryString = "/products/priority?";
        if (page) {
          queryString += `page=${page}&`;
        }
        return {
          url: queryString,
          method:"GET"
        }
      },
      providesTags: ["product"],
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ["product"],
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetVendorProductsQuery,
  useGetPriorityBasedProductsQuery,
} = productApi;
