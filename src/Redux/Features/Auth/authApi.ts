import { baseApi } from "../../Api/baseApi";

interface User {
    id: string;
    name: string;
    email: string;
}


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        // ! need to fix
        getUser: builder.query<User, void>({
            query: () => 'auth/user',
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: '/auth/register',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useLoginMutation, useGetUserQuery, useRegisterMutation } = authApi;
export { authApi };