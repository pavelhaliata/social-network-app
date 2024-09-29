import { baseApi } from "../../../../shared/api";
import { AuthUserData, LoginData } from "../types/authType.ts";
import {
  ResponseSchema,
  ResponseStatus,
} from "../../../../shared/types/api.ts";
import {
  isAuthenticated,
  setAuthUserData,
  setCaptchaUrl,
} from "../slices/authSlice.ts";
import { initializeApp } from "../../../../app/model/appSlice.ts";
import { toast } from "react-toastify";

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
          if (res.resultCode === ResponseStatus.Success) {
            dispatch(isAuthenticated({ isAuthenticated: true }));
            dispatch(setAuthUserData(res.data));
          } else {
            dispatch(isAuthenticated({ isAuthenticated: false }));
            toast.error(res.messages[0]);
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
          if (res.resultCode === ResponseStatus.Success) {
            dispatch(isAuthenticated({ isAuthenticated: true }));
            toast.success("You are authorized");
          } else {
            if (res.resultCode === ResponseStatus.TooManyAttempts) {
              toast.error(res.messages[0]);
              dispatch(authApi.endpoints.captchaUrl.initiate());
            }
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
          if (res.resultCode === ResponseStatus.Success) {
            dispatch(isAuthenticated({ isAuthenticated: false }));
            toast.success("Logout in successfully");
          } else {
            toast.error(res.messages[0]);
          }
        } catch (err) {
          const messageError = err as { error: { data: { message: string } } };
          console.error(messageError.error.data.message);
        }
      },
    }),
    captchaUrl: builder.query<{ url: string }, void>({
      query: () => ({
        url: "security/get-captcha-url",
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data: res } = await queryFulfilled;
          console.log("captchaUrl", res);
          dispatch(setCaptchaUrl(res.url));
        } catch (err) {
          const messageError = err as { error: { data: { message: string } } };
          console.error(messageError.error.data.message);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useAuthMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useCaptchaUrlQuery,
} = authApi;
