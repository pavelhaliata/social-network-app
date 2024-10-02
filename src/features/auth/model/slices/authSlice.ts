import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUserData } from "../../types/authType.ts";

const initialState: {
  authUserData: AuthUserData;
  isAuthenticated: boolean;
  captchaUrl: string | null;
} = {
  authUserData: {
    id: 0,
    login: "",
    email: "",
  },
  isAuthenticated: false,
  captchaUrl: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isAuthenticated: (
      state,
      action: PayloadAction<{ isAuthenticated: boolean }>,
    ) => {
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    setAuthUserData: (state, action: PayloadAction<AuthUserData>) => {
      state.authUserData = { ...action.payload };
    },
    setCaptchaUrl: (state, action: PayloadAction<string | null>) => {
      state.captchaUrl = action.payload;
    },
  },
});

export const { isAuthenticated, setAuthUserData, setCaptchaUrl } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
