import { Card } from "antd";
import defaultUserLogo from "../../../shared/assets/defaultUserLogo.svg";
import { Link } from "react-router-dom";
import { UserType } from "../../../features/users/service/types.ts";

type Props = {
  user: UserType;
  isLoading: boolean;
};

const { Meta } = Card;

export const UserCard = ({ user, isLoading }: Props) => {
  return (
    <Link to={`${user.id}`}>
      <Card
        loading={isLoading}
        hoverable
        style={{ width: 240, height: 360, overflow: "hidden" }}
        cover={
          user.photos.large ? (
            <img
              width={100}
              height={240}
              alt="User Logo"
              src={user.photos.large}
            />
          ) : (
            <img src={defaultUserLogo} alt="User Logo" />
          )
        }
      >
        <Meta title={user.name} description={user.status} />
      </Card>
    </Link>
  );
};
