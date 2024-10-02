import { Message } from "../types/messengerType.ts";

let ws: WebSocket | null = null;

const subscribers = {
  "messages-received": [] as MessagesReceivedSubscriberType[],
  "status-changed": [] as StatusChangedSubscriberType[],
};

// Функция для переподключения
const reConnect = () => {
  cleanUp();
  notifySubscriberAboutStatus("pending");
  setTimeout(() => {
    console.warn("Socket is closed. Reconnect will be attempted in 3 seconds.");
    createChannel();
  }, 3000);
};

// Обработчик получения сообщений
const messagesHandler = (event: MessageEvent) => {
  const newMessage: Message[] = JSON.parse(event.data);
  subscribers["messages-received"].forEach((sub) => sub(newMessage));
};

// Обработчик успешного подключения
const openHandler = () => {
  notifySubscriberAboutStatus("ready");
};

// Обработчик ошибок WebSocket
const errorHandler = () => {
  notifySubscriberAboutStatus("error");
  console.error("An error occurred.");
};

// Очистка подписок и обработчиков событий WebSocket
const cleanUp = () => {
  ws?.removeEventListener("message", messagesHandler);
  ws?.removeEventListener("close", reConnect);
  ws?.removeEventListener("open", openHandler);
  ws?.removeEventListener("error", errorHandler);
};

// Уведомление подписчиков о статусе WebSocket
const notifySubscriberAboutStatus = (status: MessengerStatus) => {
  subscribers["status-changed"].forEach((sub) => sub(status));
};

// Функция для создания WebSocket-соединения
function createChannel() {
  cleanUp();
  ws?.close(); // Закрытие старого соединения, если оно было
  ws = new WebSocket(
    "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx",
  );
  notifySubscriberAboutStatus("pending");
  ws.addEventListener("message", messagesHandler);
  ws.addEventListener("close", reConnect);
  ws.addEventListener("open", openHandler);
  ws.addEventListener("error", errorHandler);
}

// API для работы с WebSocket
export const messengerAPI = {
  start() {
    createChannel();
  },
  stop() {
    subscribers["messages-received"] = [];
    subscribers["status-changed"] = [];
    cleanUp();
    ws?.close();
  },
  sendMessage(message: string) {
    ws?.send(message);
  },
  // Подписка на события (сообщения или изменение статуса)
  subscribe(
    eventName: EventsNamesType,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType,
  ) {
    // @ts-ignore
    subscribers[eventName].push(callback);
    return () => {
      // Отписка от событий
      // @ts-ignore
      subscribers[eventName] = subscribers[eventName].filter(
        (s) => s !== callback,
      );
    };
  },
  // Прямая отписка от события
  unsubscribe(
    eventName: EventsNamesType,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType,
  ) {
    // @ts-ignore
    subscribers[eventName] = subscribers[eventName].filter(
      (s) => s !== callback,
    );
  },
};

// Типы
type EventsNamesType = "messages-received" | "status-changed";

type MessagesReceivedSubscriberType = (messages: Message[]) => void;
type StatusChangedSubscriberType = (status: MessengerStatus) => void;

export type MessengerStatus = "pending" | "ready" | "error";
