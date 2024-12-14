import { baseApi } from "../../Api/baseApi";

const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransactions: builder.query({
      query: ({
        status,
        type,
        searchTerm,
        page,
        limit,
        startDate,
        endDate,
      }: {
        status?: string;
        type?: string;
        searchTerm?: string;
        page?: number;
        limit?: number;
        startDate?: string;
        endDate?: string;
      }) => {
        let queryString = "/transactions?";
        if (status) queryString += `status=${status}&`;
        if (type) queryString += `type=${type}&`;
        if (searchTerm) queryString += `searchTerm=${searchTerm}&`;
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
