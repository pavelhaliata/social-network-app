export type Message = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

export type EventsNames = "messages-received" | "status-changed";

export type MessagesReceivedSubscriber = (messages: Message[]) => void;

export type StatusChangedSubscriber = (status: MessengerStatus) => void;

export type MessengerStatus = "pending" | "ready" | "error";

export type EventSubscribers = {
  "messages-received": (messages: Message[]) => void;
  "status-changed": (status: MessengerStatus) => void;
};
