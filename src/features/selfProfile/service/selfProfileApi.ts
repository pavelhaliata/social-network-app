import { baseApi } from "../../../shared/api";

export const selfProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAuthData: builder.query({
      query: () => ({
        url: "auth/me",
      }),
    }),
  }),
});
