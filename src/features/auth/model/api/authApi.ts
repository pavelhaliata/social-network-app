import { baseApi } from "../../../../shared/api";
import { ResponseSchema } from "../../../../shared/api/types";
import { AuthUserData, LoginData } from "../types/authType.ts";
import { isAuthenticated, setAuthUserData } from "../slices/authSlice.ts";
import { initializeApp } from "../../../../app/model/appSlice.ts";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    authMe: builder.query<ResponseSchema<AuthUserData>, void>({
      query: () => ({
        url: "auth/me",
      }),
      providesTags: ["authMe"],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data: res } = await queryFulfilled;
          if (res.resultCode === 0) {
            dispatch(isAuthenticated({ isAuthenticated: true }));
            dispatch(setAuthUserData(res.data));
          } else {
            dispatch(isAuthenticated({ isAuthenticated: false }));
          }
        } catch (err) {
          const messageError = err as { error: { data: { message: string } } };
          console.error(messageError.error.data.message);
        } finally {
          dispatch(initializeApp());
        }
      },
    }),
    login: builder.mutation<
      ResponseSchema<{ token: number; userId: number }>,
      LoginData
    >({
      query: (data) => ({
        method: "POST",
        url: "auth/login",
        body: data,
      }),
      invalidatesTags: ["authMe"],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data: res } = await queryFulfilled;
          if (res.resultCode === 0) {
            dispatch(isAuthenticated({ isAuthenticated: true }));
          } else {
            console.log(res.messages);
          }
        } catch (err) {
          const messageError = err as { error: { data: { message: string } } };
          console.error(messageError.error.data.message);
        }
      },
    }),
    logout: builder.mutation<ResponseSchema, void>({
      query: () => ({
        method: "DELETE",
        url: "/auth/login",
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data: res } = await queryFulfilled;
          if (res.resultCode === 0) {
            dispatch(isAuthenticated({ isAuthenticated: false }));
          } else {
            console.log(res.messages);
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

export const { useAuthMeQuery, useLoginMutation, useLogoutMutation } = authApi;
