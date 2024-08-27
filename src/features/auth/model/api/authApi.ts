import { baseApi } from "../../../../shared/api";
import { ResponseSchema } from "../../../../shared/api/types";
import { LoginData } from "../types/authType.ts";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ResponseSchema<{ userId: number }>, LoginData>({
      query: (data) => ({
        method: "POST",
        url: "auth/login",
        body: data,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.resultCode === 1) {
            console.log(data);
          }
        } catch (e) {
          console.error(e);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const { useLoginMutation } = authApi;
