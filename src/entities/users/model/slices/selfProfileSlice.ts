import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "../types/userProfileType.ts";

export const selfProfileSlice = createSlice({
  name: "selfProfile",
  initialState: {
    selfProfileData: {},
  },
  reducers: {
    selfProfile: (state, action: PayloadAction<UserProfile>) => {
      state.selfProfileData = { ...action.payload };
    },
  },
});

export const { selfProfile } = selfProfileSlice.actions;
export const selfProfileReducer = selfProfileSlice.reducer;
