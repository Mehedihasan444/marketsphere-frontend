import { baseApi } from "../../Api/baseApi";

export const dashboardHomeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomerDashboardData: builder.query({
      query: () => "dashboard/customer",
    }),
    getVendorDashboardData: builder.query({
      query: () => "dashboard/vendor",
    }),
    getAdminDashboardData: builder.query({
      query: () => "dashboard/admin",
    }),
  }),
});

export const {
  useGetCustomerDashboardDataQuery,
  useGetVendorDashboardDataQuery,
  useGetAdminDashboardDataQuery,
} = dashboardHomeApi;
