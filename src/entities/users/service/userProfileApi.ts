import { baseApi } from "../../../shared/api";
import { UserProfileTypes } from "./types/userProfileTypes.ts";
import { ResponseSchema } from "../../../shared/api/types";

export const getUserProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfileTypes, number>({
      query: (userId: number) => `/profile/${userId}`,
    }),
    getUserStatus: builder.query<string, number>({
      query: (userId: number) => `/profile/status/${userId}`,
    }),
    getFollowUser: builder.query<boolean, number>({
      query: (userId) => `/follow/${userId}`,
      providesTags: ["Follow"],
    }),
    followUser: builder.mutation<ResponseSchema, number>({
      query: (userId) => ({
        method: "POST",
        url: `/follow/${userId}`,
      }),
      invalidatesTags: ["Follow", "Users"],
    }),
    unFollowUser: builder.mutation<ResponseSchema, number>({
      query: (userId) => ({
        method: "DELETE",
        url: `/follow/${userId}`,
      }),
      invalidatesTags: ["Follow", "Users"],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useGetUserStatusQuery,
  useGetFollowUserQuery,
  useFollowUserMutation,
  useUnFollowUserMutation,
} = getUserProfileApi;