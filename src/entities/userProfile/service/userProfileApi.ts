import { baseApi } from "../../../shared/api";
import { UserProfileType } from "./types/userProfileType.ts";

export const getUserProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfileType, number>({
      query: (userId: number) => `/profile/${userId}`,
    }),
    getUserStatus: builder.query({
      query: (userId: number) => `/profile/status/${userId}`,
    }),
  }),
});

export const { useGetUserProfileQuery, useGetUserStatusQuery } =
  getUserProfileApi;
