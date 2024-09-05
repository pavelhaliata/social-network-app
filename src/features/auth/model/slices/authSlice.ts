import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUserData } from "../types/authType.ts";

const initialState: { authUserData: AuthUserData; isAuthenticated: boolean } = {
  authUserData: {
    id: null,
    login: "",
    email: "",
  },
  isAuthenticated: false,
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
  },
});

export const { isAuthenticated, setAuthUserData } = authSlice.actions;
export const authReducer = authSlice.reducer;
