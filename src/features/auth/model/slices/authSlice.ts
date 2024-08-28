import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUserData } from "../types/authType.ts";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUserData: {
      id: 0,
      email: "",
      login: "",
    },
    isAuthenticated: false,
  },
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
  },
});

export const { isAuthenticated, setAuthUserData } = authSlice.actions;
export const authReducer = authSlice.reducer;
