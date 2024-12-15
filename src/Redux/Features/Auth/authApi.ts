import { baseApi } from "../../Api/baseApi";



const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: '/auth/register',
                method: 'POST',
                body: credentials,
            }),
        }),
        forgetPassword: builder.mutation({
            query: (email) => ({
                url: '/auth/forget-password',
                method: 'POST',
                body: { email },
            }),
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: '/auth/reset-password',
                method: 'POST',
                body: data,
            }),
        })

    }),
    overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation,useForgetPasswordMutation,
    useResetPasswordMutation
 } = authApi;
export { authApi };