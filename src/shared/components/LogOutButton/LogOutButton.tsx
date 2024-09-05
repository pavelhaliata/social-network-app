import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

type Props = {
  userLogin: string;
  userPhoto: string;
  logOutCallback: () => void;
};

export const LogOutButton = ({
  userLogin,
  userPhoto,
  logOutCallback,
}: Props) => {
  return (
    <div>
      <h3 className="text-light-900 inline mr-2 cursor-default">{userLogin}</h3>
      <Button
        type="link"
        onClick={logOutCallback}
        className="border border-danger-700"
      >
        <Avatar
          size="large"
          src={userPhoto}
          icon={<UserOutlined />}
          className="cursor-pointer bg-primary-500"
        />
      </Button>
    </div>
  );
};
