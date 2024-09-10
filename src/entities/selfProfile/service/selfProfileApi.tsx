import { baseApi } from "../../../shared/api";
import { UserProfile } from "../../users/model/types/userProfileType.ts";
import { selfProfile } from "../../users/model/slices/selfProfileSlice.ts";

export const selfProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSelfProfile: builder.query<UserProfile, number>({
      query: (userId) => ({
        url: `/profile/${userId}`,
      }),
      providesTags: ["selfProfile"],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data: res } = await queryFulfilled;
          dispatch(selfProfile(res));
        } catch (e) {
          const messageError = e as { error: { data: { message: string } } };
          console.error(messageError.error.data.message);
        }
      },
    }),
  }),
});
export const { useGetSelfProfileQuery } = selfProfileApi;