import { baseApi } from "../../Api/baseApi";

interface User {
    id: string;
    name: string;
    email: string;
}

interface LoginResponse {
    token: string;
    user: User;
}

interface LoginRequest {
    email: string;
    password: string;
}

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        getUser: builder.query<User, void>({
            query: () => 'auth/user',
        }),
    }),
    overrideExisting: false,
});

export const { useLoginMutation, useGetUserQuery } = authApi;
export { authApi };