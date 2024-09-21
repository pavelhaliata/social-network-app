import { baseApi } from "../../../shared/api";
import { UserProfile } from "../../users/model/types/userProfileType.ts";
import { ResponseSchema, ResponseStatus } from "../../../shared/types/api.ts";
import { toast } from "react-toastify";

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
          if (res.resultCode === ResponseStatus.Success) {
            toast.success("Profile successfully updated!");
          }
          toast.error(res.messages[0]);
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
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          const { data: res } = await queryFulfilled;
          if (res.resultCode === ResponseStatus.Success) {
            toast.success("Photo successfully updated!");
          }
          toast.error(res.messages[0]);
        } catch (err) {
          toast.error("Photo update error!");
          console.error(err);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const { useEditProfileMutation, useEditPhotoProfileMutation } =
  editSelfProfileApi;
