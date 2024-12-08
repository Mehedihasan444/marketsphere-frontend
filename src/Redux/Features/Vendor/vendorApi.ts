import { baseApi } from "../../Api/baseApi";

const vendorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVendorDashboardData: builder.query({
      query: () => ({
        url: "/vendors",
        method: "GET",
      }),
      providesTags: ["vendor"],
    }),
    getAllVendors: builder.query({
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
            let queryString = "/vendors?";
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
      providesTags: ["vendor"],
    }),
    getVendor: builder.query({
      query: (email:string) => ({
        url: `/vendors/${email}`,
        method: "GET",
      }),
      providesTags: ["vendor"],
    }),
  }),
});

export const { useGetVendorDashboardDataQuery,useGetAllVendorsQuery,useGetVendorQuery } = vendorApi;
