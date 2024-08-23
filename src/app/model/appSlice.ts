import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    initialized: false,
    isLogin: false,
  },
  reducers: {
    initializeApp: (state) => {
      state.initialized = true;
    },
    isLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
  },
});

export const { initializeApp, isLogin } = appSlice.actions;
export const appReducer = appSlice.reducer;
