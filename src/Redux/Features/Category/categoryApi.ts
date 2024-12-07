import { baseApi } from "../../Api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: ({
        name,
        status,
        limit,
        page,
      }: {
        name?: string;
        status?: string;
        limit?: number;
        page?: number;
      }) => {
        let queryString = "/categories?";
        if (name) queryString += `name=${name}&`;
        if (status && status !== " ") queryString += `status=${status}&`;
        if (limit) queryString += `limit=${limit}&`;
        if (page) queryString += `page=${page}&`;
        return {
          url: queryString,
          method: "GET",
        };
      },
      providesTags: ["category"],
    }),
    addCategory: builder.mutation({
        query: (newCategory) => ({
          url: `/categories`,
          method: "POST",
          body: newCategory,
        }),
        invalidatesTags: ["category"],
      }),
    getCategory: builder.query({
      query: (CategoryId: string) => ({
        url: `/categories/${CategoryId}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    updateCategory: builder.mutation({
      query: ({ CategoryId, ...data }) => ({
        url: `/categories/${CategoryId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
    deleteCategory: builder.mutation({
      query: (CategoryId: string) => ({
        url: `/categories/${CategoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
    useAddCategoryMutation,
} = categoryApi;
