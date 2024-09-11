import { baseApi } from "../../../shared/api";
import { UserProfile } from "../../users/model/types/userProfileType.ts";
import { ResponseSchema } from "../../../shared/api/types";

export const editSelfProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    editProfile: builder.mutation<ResponseSchema, UserProfile>({
      query: (data) => ({
        url: "profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["selfProfile"],
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          const { data: res } = await queryFulfilled;
          if (res.resultCode !== 0) {
            console.error(res.messages);
          }
        } catch (err) {
          const messageError = err as { error: { data: { message: string } } };
          console.error(messageError.error.data.message);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const { useEditProfileMutation } = editSelfProfileApi;
