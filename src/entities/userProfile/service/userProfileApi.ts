import { baseApi } from "../../../shared/api";
import { UserProfileType } from "./types/userProfileType.ts";

export const getUserProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfileType, number>({
      query: (id: number) => `/profile/${id}`,
    }),
  }),
});

export const { useGetUserProfileQuery } = getUserProfileApi;
