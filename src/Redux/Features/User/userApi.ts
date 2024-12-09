import { baseApi } from "../../Api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({
        role,
        email,
        limit,
        page,
        userStatus
      }: {
        role: string;
        email: string;
        limit: number;
        page: number;
        userStatus: string;
      }) => {
        let queryString = "/users?";
        if (role && role != " ") queryString += `role=${role}&`;
        if (userStatus && userStatus != " ") queryString += `status=${userStatus}&`;
        if (email) queryString += `email=${email}&`;
        if (limit) queryString += `limit=${limit}&`;
        if (page) queryString += `page=${page}&`;
        return {
          url: queryString,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
    getUser: builder.query({
      query: (UserId: string) => ({
        url: `/users/${UserId}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: ({ UserId, ...data }) => ({
        url: `/users/${UserId}/status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (UserId) => ({
        url: `/users/${UserId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
    getMyProfile: builder.query({
      query: () => ({
        url: `/users/me`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    updateMyProfile: builder.mutation({
      query: (data) => ({
        url: `/users/update-my-profile`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    })
  }),
});

export const {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} = userApi;
