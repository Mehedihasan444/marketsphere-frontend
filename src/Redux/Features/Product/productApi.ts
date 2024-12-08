import { baseApi } from '../../Api/baseApi';

type Product = {
    name: string;
    description: string;
    price: number;
    discount: number;
    id: string;
    images: string[];
    quantity: number;
    rating: number;
    categoryId: string;
    flashSaleId: string;
    shopId: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export const productApi =  baseApi.injectEndpoints({

    endpoints: (builder) => ({
        getProducts: builder.query<Product[], {brand:string; category: string; page: number; limit: number }>({
            query: ({ category,brand, page, limit }: { category: string;brand:string; page: number; limit: number }) => {
                let queryString = "/products?";
                if (brand) queryString += `brand=${brand}&`;
                if (category) queryString += `category=${category}&`;
                if (page) queryString += `page=${page}&`;
                if (limit) queryString += `limit=${limit}&`;
                return { url: queryString, method: "GET" };
              },
            
            providesTags: ['product'],
        }),
        getProductById: builder.query<Product, number>({
            query: (id) => `/products/${id}`,
            providesTags: ['product'],
        }),
        addProduct: builder.mutation({
            query: (product) => ({
                url: '/products',
                method: 'POST',
                body: product,
            }),
            invalidatesTags: ['product'],
        }),
        updateProduct: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `/products/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: ['product'],
        }),
        deleteProduct: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['product'],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi;