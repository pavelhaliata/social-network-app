import { AppDispatch } from "../../../../app/store";
import { messengerAPI } from "../../api/messengerApi.ts";
import { Message, MessengerStatus } from "../../types/messengerType.ts";
import {
  addMessage,
  clearMessages,
  setStatus,
} from "../../model/slices/messengerSlice.ts";

export const useConnectSocket = () => {
  let isWebSocketConnected = false;

  const startWebSocketConnection = (dispatch: AppDispatch) => {
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

  const stopWebSocketConnection = (dispatch: AppDispatch) => {
    messengerAPI.stop();
    messengerAPI.unsubscribe("messages-received", (messages: Message[]) => {
      dispatch(addMessage(messages));
    });
    messengerAPI.unsubscribe("status-changed", (status: MessengerStatus) => {
      dispatch(setStatus(status));
      isWebSocketConnected = false;
      dispatch(clearMessages());
    });
  };

  const sendMessage = (message: string) => {
    messengerAPI.sendMessage(message);
  };

  return { startWebSocketConnection, stopWebSocketConnection, sendMessage };
};
