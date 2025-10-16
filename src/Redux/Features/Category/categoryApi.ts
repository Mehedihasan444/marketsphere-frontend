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
    getCategoryBySlug: builder.query({
      query: (slug: string) => ({
        url: `/categories/slug/${slug}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    getProductsByCategorySlug: builder.query({
      query: ({ 
        slug, 
        page = 1, 
        limit = 12, 
        searchTerm,
        minPrice,
        maxPrice,
        brand,
        rating,
        sortBy 
      }: {
        slug: string;
        page?: number;
        limit?: number;
        searchTerm?: string;
        minPrice?: number;
        maxPrice?: number;
        brand?: string | string[];
        rating?: number;
        sortBy?: string;
      }) => {
        let queryString = `/categories/slug/${slug}/products?page=${page}&limit=${limit}`;
        if (searchTerm) queryString += `&searchTerm=${searchTerm}`;
        if (minPrice) queryString += `&minPrice=${minPrice}`;
        if (maxPrice) queryString += `&maxPrice=${maxPrice}`;
        if (rating) queryString += `&rating=${rating}`;
        if (sortBy) queryString += `&sortBy=${sortBy}`;
        
        // Handle multiple brands
        if (brand) {
          if (Array.isArray(brand)) {
            brand.forEach(b => queryString += `&brand=${b}`);
          } else {
            queryString += `&brand=${brand}`;
          }
        }
        
        return {
          url: queryString,
          method: "GET",
        };
      },
      providesTags: ["category", "product"],
    }),
    getCategoryStats: builder.query({
      query: () => ({
        url: `/categories/stats/overview`,
        method: "GET",
      }),
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
  useGetCategoryBySlugQuery,
  useGetProductsByCategorySlugQuery,
  useGetCategoryStatsQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useAddCategoryMutation,
} = categoryApi;
