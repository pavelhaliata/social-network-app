import { baseApi } from "../../../shared/api";

export const editSelfProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    editProfile: builder.query({
      query: () => ({
        method: "PUT",
        url: "profile",
      }),
      async onQueryStarted(_args, { queryFulfilled }) {
        const { data } = await queryFulfilled;
        console.log("selfProfile: ", data);
      },
    }),
  }),
});

export const { useEditProfileQuery } = editSelfProfileApi;
