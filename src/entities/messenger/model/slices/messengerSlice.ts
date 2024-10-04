import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../../types/messengerType.ts";
import { MessengerStatus } from "../../api/messengerApi.ts";

const initialState: { messages: Message[]; status: MessengerStatus } = {
  messages: [],
  status: "pending",
};

const messengerSlice = createSlice({
  name: "messenger",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message[]>) => {
      state.messages = [...state.messages, ...action.payload];
    },
    setStatus: (state, action: PayloadAction<MessengerStatus>) => {
      state.status = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessage, setStatus, clearMessages } = messengerSlice.actions;
export const messengerReducer = messengerSlice.reducer;
