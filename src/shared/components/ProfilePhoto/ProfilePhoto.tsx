import { Avatar, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";

type Props = {
  userPhoto?: string;
};
export const ProfilePhoto = ({ userPhoto }: Props) => {
  return (
    <div>
      {userPhoto ? (
        <Image
          src={userPhoto}
          alt="user logo"
          className="max-w-[200px] w-full object-cover rounded-lg"
        />
      ) : (
        <Avatar shape="square" size={164} icon={<UserOutlined />} />
      )}
    </div>
  );
};
