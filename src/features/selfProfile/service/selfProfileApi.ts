import { baseApi } from "../../../shared/api";

export const selfProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAuthData: builder.query({
      query: () => ({
        url: "profile",
      }),
      async onQueryStarted(_args, { queryFulfilled }) {
        const { data } = await queryFulfilled;
        console.log("selfProfile: ", data);
      },
    }),
  }),
});

export const { useGetAuthDataQuery } = selfProfileApi;
