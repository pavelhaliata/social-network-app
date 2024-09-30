import { Button, Form, Input } from "antd";
import { useState } from "react";

export const Chat = () => {
  const [textChat, setTextChat] = useState("");

  return (
    <div>
      <div className="border h-[300px] mb-10">{textChat}</div>
      <Form
        onSubmitCapture={(data) => {
          if (data) {
            setTextChat(data.target[0].value);
          }
        }}
      >
        <Input type="text" />
        <Button type="primary" htmlType="submit">
          Send
        </Button>
      </Form>
    </div>
  );
};
