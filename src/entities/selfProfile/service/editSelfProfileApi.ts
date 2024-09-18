import { baseApi } from "../../../shared/api";
import { UserProfile } from "../../users/model/types/userProfileType.ts";
import { ResponseSchema, ResponseStatus } from "../../../shared/types/api.ts";

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
          if (res.resultCode !== ResponseStatus.Success) {
            console.error(res.messages);
          }
        } catch (err) {
          const messageError = err as { error: { data: { message: string } } };
          console.error(messageError.error.data.message);
        }
      },
    }),
    editPhotoProfile: builder.mutation<
      ResponseSchema<{ photos: { small: string; large: string } }>,
      FormData
    >({
      query: (data) => ({
        url: "profile/photo",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["selfProfile"],
    }),
  }),
  overrideExisting: true,
});

export const { useEditProfileMutation, useEditPhotoProfileMutation } =
  editSelfProfileApi;
