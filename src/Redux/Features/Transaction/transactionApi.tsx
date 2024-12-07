import { baseApi } from "../../Api/baseApi";

const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransactions: builder.query({
      query: ({
        status,
        type,
        search,
        page,
        limit,
        startDate,
        endDate,
      }: {
        status: string;
        type: string;
        search: string;
        page: number;
        limit: number;
        startDate: string;
        endDate: string;
      }) => {
        let queryString = "/transactions?";
        if (status) queryString += `status=${status}&`;
        if (type) queryString += `type=${type}&`;
        if (search) queryString += `search=${search}&`;
        if (startDate) queryString += `startDate=${startDate}&`;
        if (endDate) queryString += `endDate=${endDate}&`;
        if (page) queryString += `page=${page}&`;
        if (limit) queryString += `limit=${limit}&`;
        return { url: queryString, method: "GET" };
      },
      providesTags: ["transaction"],
    }),
  }),
});

export const { useGetAllTransactionsQuery } = transactionApi;
