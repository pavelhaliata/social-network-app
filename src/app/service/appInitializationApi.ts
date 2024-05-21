import { baseApi } from "../../shared/api";
import { ResponseSchema } from "../../shared/api/types";
import { initializeApp } from "../model/appSlice.ts";

export const appInitializationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initializeApp: builder.query<ResponseSchema<AuthUserData>, void>({
      query: () => ({
        url: "auth/me",
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          return data;
        } catch (e) {
          console.error(e);
        } finally {
          dispatch(initializeApp());
        }
      },
    }),
  }),
  overrideExisting: true, // TODO: почитать про это
});

export const { useInitializeAppQuery } = appInitializationApi;

// types

export type AuthUserData = {
  id: number | null;
  email: string | null;
  login: string | null;
};
