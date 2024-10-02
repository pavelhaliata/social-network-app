import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../../../app/store";
import { Message } from "../../types/messengerType.ts";
import { messengerAPI, MessengerStatus } from "../../api/messengerApi.ts";

const initialState: Message[] = [];

const messengerSlice = createSlice({
  name: "messenger",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message[]>) => {
      return [...state, ...action.payload];
    },
    setStatus: (state, action: PayloadAction<MessengerStatus>) => {},
  },
});

export const { addMessage, setStatus } = messengerSlice.actions;
export const messengerReducer = messengerSlice.reducer;

// Подключение WebSocket
export const startWebSocketConnection = (dispatch: AppDispatch) => {
  messengerAPI.start();
  messengerAPI.subscribe("messages-received", (messages: Message[]) => {
    dispatch(addMessage(messages));
  });
  messengerAPI.subscribe("status-changed", (status: MessengerStatus) => {
    dispatch(setStatus(status));
    console.log(status);
  });
};

// Отключение WebSocket
export const stopWebSocketConnection = (dispatch: AppDispatch) => {
  messengerAPI.stop();
  messengerAPI.unsubscribe("messages-received", (messages: any) => {
    console.log(messages);
  });
  messengerAPI.unsubscribe("status-changed", (status: any) => {
    console.log(status);
  });
};

export const sendMessage = (message: string) => {
  messengerAPI.sendMessage(message);
};
