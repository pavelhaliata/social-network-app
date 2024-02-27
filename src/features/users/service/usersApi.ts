import { FetchUsersRequestType, FetchUsersResponseType } from "./types.ts";
import { baseApi } from "../../../shared/api";

export const getUsersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<FetchUsersResponseType, FetchUsersRequestType>({
      query: ({ currentPage = 1, pageSize = 10, term = "", friends = false }) =>
        `users?page=${currentPage}&count=${pageSize}&term=${term}` +
        (friends === null ? "" : `&friend=${friends}`),
    }),
  }),
});

export const { useGetUsersQuery } = getUsersApi;
