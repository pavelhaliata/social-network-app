import { Button, Input } from "antd";

type Props = {};

export const SignIn = ({}: Props) => {
  return (
    <div className="max-w-96 m-auto p-16 border">
      <form>
        <Input />
        <Input />
        <Button type="primary">Sign In</Button>
      </form>
    </div>
  );
};
