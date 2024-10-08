import { Avatar, Card } from "antd";
import { Link } from "react-router-dom";
import { UserInfo } from "../../../features/users/types/usersApiTypes.ts";
import { UserOutlined } from "@ant-design/icons";

type Props = {
  user: UserInfo;
  isLoading: boolean;
};

const { Meta } = Card;

export const UserCard = ({ user, isLoading }: Props) => {
  return (
    <Link to={`${user.id}`}>
      <Card
        loading={isLoading}
        hoverable
        className="max-w-[240px] w-full h-[340px] overflow-hidden"
        cover={
          user.photos.large ? (
            <img
              alt="User Logo"
              src={user.photos.large}
              className="border block"
            />
          ) : (
            <Avatar shape="square" size={240} icon={<UserOutlined />} />
          )
        }
      >
        <Meta
          title={user.name}
          description={user.status}
          className="whitespace-pre-line"
        />
      </Card>
    </Link>
  );
};
