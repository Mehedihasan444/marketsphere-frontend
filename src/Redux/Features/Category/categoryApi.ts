import { baseApi } from "../../Api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: ({
        searchTerm,
        limit,
        page,
      }: {
        searchTerm?: string;
        limit?: number;
        page?: number;
      }) => {
        let queryString = "/categories?";
        if (searchTerm) queryString += `searchTerm=${searchTerm}&`;
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
      query: ({ CategoryId,formData }) => ({
        url: `/categories/${CategoryId}`,
        method: "PATCH",
        body: formData,
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
