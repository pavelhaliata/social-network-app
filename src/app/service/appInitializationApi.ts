import { baseApi } from "../../shared/api";
import { ResponseSchema } from "../../shared/api/types";
import { initializeApp, isLogin } from "../model/appSlice.ts";

export const appInitializationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initializeApp: builder.query<ResponseSchema<AuthUserData>, void>({
      query: () => ({
        url: "auth/me",
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.resultCode === 0) {
            console.log(data);
            dispatch(isLogin(true));
          }
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
