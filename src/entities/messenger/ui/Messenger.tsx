import { Avatar, Button, Input, List, Spin } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  AppDispatch,
  AppRootState,
  useAppDispatch,
  useAppSelector,
} from "../../../app/store";
import { Message } from "../types/messengerType.ts";
import {
  sendMessage,
  startWebSocketConnection,
  stopWebSocketConnection,
} from "../model/slices/messengerSlice.ts";

const { TextArea } = Input;

export const Messenger = () => {
  const messages = useAppSelector<Message[]>(
    (state: AppRootState) => state.messenger.messages,
  );
  const status = useAppSelector((state) => state.messenger.status);
  const dispatch: AppDispatch = useAppDispatch();
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const setMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const sendMessageHandler = () => {
    sendMessage(message);
    setMessage("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    dispatch(startWebSocketConnection);
    return () => {
      dispatch(stopWebSocketConnection);
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col h-[75vh] max-w-full mx-auto border rounded-lg shadow-lg bg-white">
      <div className="flex-1 p-4 overflow-auto bg-gray-100">
        {status === "pending" ? (
          <div className="flex flex-col items-center justify-center gap-y-1 h-full text-primary-700">
            <Spin size="large" />
            <span>reconnecting...</span>
            <span>please, wait</span>
          </div>
        ) : (
          <List
            dataSource={messages}
            renderItem={(message) => (
              <List.Item key={message.userId}>
                <List.Item.Meta
                  avatar={<Avatar src={message.photo} />}
                  title={
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{message.userName}</span>
                    </div>
                  }
                  description={
                    <p className="text-gray-700">{message.message}</p>
                  }
                />
              </List.Item>
            )}
          />
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center p-4 border-t">
        <TextArea
          value={message}
          onChange={setMessageHandler}
          className="flex-grow mr-4"
          placeholder="Type a message..."
          rows={2}
        />
        <Button
          type="primary"
          shape="circle"
          icon={<SendOutlined />}
          className="bg-blue-500 hover:bg-blue-600"
          onClick={sendMessageHandler}
        />
      </div>
    </div>
  );
};
