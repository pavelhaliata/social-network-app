import { Avatar, Button, Input, List } from "antd";
import { SendOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const messages = [
  {
    id: 1,
    user: "John Doe",
    avatar: "https://via.placeholder.com/150",
    content: "Hello! How are you?",
    timestamp: "12:45 PM",
  },
  {
    id: 2,
    user: "Jane Smith",
    avatar: "https://via.placeholder.com/150",
    content: "I'm doing great, thanks! And you?",
    timestamp: "12:46 PM",
  },
  {
    id: 3,
    user: "John Doe",
    avatar: "https://via.placeholder.com/150",
    content: "I'm good as well, just working on the new project.",
    timestamp: "12:47 PM",
  },
];

const Messenger = () => {
  return (
    <div className="flex flex-col h-[75vh] max-w-full mx-auto border rounded-lg shadow-lg bg-white">
      <div className="flex-1 p-4 overflow-auto bg-gray-100">
        <List
          dataSource={messages}
          renderItem={(message) => (
            <List.Item key={message.id}>
              <List.Item.Meta
                avatar={<Avatar src={message.avatar} />}
                title={
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{message.user}</span>
                    <span className="text-xs text-gray-500">
                      {message.timestamp}
                    </span>
                  </div>
                }
                description={<p className="text-gray-700">{message.content}</p>}
              />
            </List.Item>
          )}
        />
      </div>

      <div className="flex items-center p-4 border-t">
        <TextArea
          className="flex-grow mr-4"
          placeholder="Type a message..."
          rows={2}
        />
        <Button
          type="primary"
          shape="circle"
          icon={<SendOutlined />}
          className="bg-blue-500 hover:bg-blue-600"
        />
      </div>
    </div>
  );
};

export default Messenger;
