import { baseApi } from "../../../shared/api";
import { UserProfile } from "../../users/model/types/userProfileType.ts";
import { selfProfile } from "../../users/model/slices/selfProfileSlice.ts";

export const selfProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSelfProfile: builder.query<UserProfile, number>({
      query: (userId) => ({
        url: `/profile/${userId}`,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          dispatch(selfProfile(res.data));
        } catch (e) {}
      },
    }),
  }),
});
export const { useGetSelfProfileQuery } = selfProfileApi;
