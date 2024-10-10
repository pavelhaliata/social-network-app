import { baseApi } from "../../../shared/api";
import { UserProfile } from "../types/userProfileType.ts";
import { ResponseSchema } from "../../../shared/types/api.ts";

export const getUserProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfile, number>({
      query: (userId) => `/profile/${userId}`,
    }),
    getUserStatus: builder.query<string, number>({
      query: (userId: number) => `/profile/status/${userId}`,
      providesTags: ["userStatus"],
    }),
    getFollowUser: builder.query<boolean, number>({
      query: (userId) => `/follow/${userId}`,
      providesTags: ["follow"],
    }),
    followUser: builder.mutation<ResponseSchema, number>({
      query: (userId) => ({
        method: "POST",
        url: `/follow/${userId}`,
      }),
      invalidatesTags: ["follow", "users"],
    }),
    unFollowUser: builder.mutation<ResponseSchema, number>({
      query: (userId) => ({
        method: "DELETE",
        url: `/follow/${userId}`,
      }),
      invalidatesTags: ["follow", "users"],
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
