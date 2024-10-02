import { Avatar, Button, Input, List } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
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

const Messenger = () => {
  const messages = useAppSelector<Message[]>(
    (state: AppRootState) => state.messenger,
  );
  const dispatch: AppDispatch = useAppDispatch();
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    startWebSocketConnection(dispatch);
    return () => {
      stopWebSocketConnection(dispatch);
    };
  }, []);

  return (
    <div className="flex flex-col h-[75vh] max-w-full mx-auto border rounded-lg shadow-lg bg-white">
      <div className="flex-1 p-4 overflow-auto bg-gray-100">
        <List
          dataSource={messages}
          renderItem={(message) => (
            <List.Item key={message.userId}>
              <List.Item.Meta
                avatar={<Avatar src={message.photo} />}
                title={
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{message.userName}</span>
                    <span className="text-xs text-gray-500">time</span>
                  </div>
                }
                description={<p className="text-gray-700">{message.message}</p>}
              />
            </List.Item>
          )}
        />
      </div>

      <div className="flex items-center p-4 border-t">
        <TextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow mr-4"
          placeholder="Type a message..."
          rows={2}
        />
        <Button
          type="primary"
          shape="circle"
          icon={<SendOutlined />}
          className="bg-blue-500 hover:bg-blue-600"
          onClick={() => {
            sendMessage(message);
            setMessage("");
          }}
        />
      </div>
    </div>
  );
};

export default Messenger;
