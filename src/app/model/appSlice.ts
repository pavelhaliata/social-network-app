import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    initialized: false,
  },
  reducers: {
    initializeApp: (state) => {
      state.initialized = true;
    },
  },
});

export const { initializeApp } = appSlice.actions;
export const appReducer = appSlice.reducer;
