import { UsersRequest, UsersResponse } from "./types.ts";
import { baseApi } from "../../../shared/api";

export const getUsersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, UsersRequest>({
      query: ({
        currentPage = 1,
        pageSize = 10,
        search = "",
        followed = null,
      }) =>
        `users?page=${currentPage}&count=${pageSize}&term=${search}` +
        (followed === null ? "" : `&friend=${followed}`),
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery } = getUsersApi;
