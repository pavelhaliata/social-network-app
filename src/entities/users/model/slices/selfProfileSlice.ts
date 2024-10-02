import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "../../types/userProfileType.ts";

const initialState: { selfProfile: UserProfile } = {
  selfProfile: {
    userId: 0,
    fullName: "",
    aboutMe: "",
    photos: {
      small: "",
      large: "",
    },
    lookingForAJob: false,
    lookingForAJobDescription: "",
    contacts: {
      facebook: "",
      instagram: "",
      twitter: "",
      vk: "",
      youtube: "",
      github: "",
      mainLink: "",
      website: "",
    },
  },
};

export const selfProfileSlice = createSlice({
  name: "selfProfile",
  initialState,
  reducers: {
    selfProfile: (state, action: PayloadAction<UserProfile>) => {
      state.selfProfile = { ...action.payload };
    },
  },
});

export const { selfProfile } = selfProfileSlice.actions;
export const selfProfileReducer = selfProfileSlice.reducer;
