import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../../../app/store";
import { Message } from "../../types/messengerType.ts";
import { messengerAPI, MessengerStatus } from "../../api/messengerApi.ts";

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

let isWebSocketConnected = false;

export const startWebSocketConnection = (dispatch: AppDispatch) => {
  if (!isWebSocketConnected) {
    messengerAPI.start();
    messengerAPI.subscribe("messages-received", (messages: Message[]) => {
      dispatch(addMessage(messages));
    });
    messengerAPI.subscribe("status-changed", (status: MessengerStatus) => {
      dispatch(setStatus(status));
    });
    isWebSocketConnected = true;
  }
};

// Отключение WebSocket
export const stopWebSocketConnection = (dispatch: AppDispatch) => {
  messengerAPI.stop();
  isWebSocketConnected = false;
  dispatch(clearMessages()); // Чистим сообщения при отключении
};

export const sendMessage = (message: string) => {
  messengerAPI.sendMessage(message);
};
