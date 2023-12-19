import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {FetchUsersRequestType, FetchUsersResponseType} from "./users.api.types.ts";

export const usersApi = createApi({
    reducerPath: 'usersApi',
    tagTypes:['users'],
    baseQuery: fetchBaseQuery({ baseUrl: 'https://social-network.samuraijs.com/api/1.0/', credentials: "include" }),
    endpoints: (builder) => ({
        getUsers: builder.query<FetchUsersResponseType, FetchUsersRequestType>({
            query: ({currentPage = 1, pageSize = 10, term = '', friends = false}) => `users?page=${currentPage}&count=${pageSize}&term=${term}` + (friends === null ? '' : `&friend=${friends}`),
        }),
    }),
})

export const { useGetUsersQuery } = usersApi

