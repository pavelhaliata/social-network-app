import { Button, Popover } from "antd";
import { UserAddOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { HTMLAttributes } from "react";

type Props = {
  isFollow?: boolean;
  isFollowingUser: boolean;
  isUnFollowingUser: boolean;
  unFollowUserCallback: () => void;
  followUserCallback: () => void;
} & HTMLAttributes<HTMLDivElement>;
export const Subscription = ({
  isFollow,
  isFollowingUser,
  isUnFollowingUser,
  followUserCallback,
  unFollowUserCallback,
  ...divProps
}: Props) => {
  return (
    <div {...divProps}>
      {isFollow ? (
        <Popover placement="bottom" content="Unfollow">
          <Button
            onClick={unFollowUserCallback}
            type="text"
            loading={isUnFollowingUser}
            disabled={isUnFollowingUser}
            icon={<UserDeleteOutlined />}
          >
            Remove from friends
          </Button>
        </Popover>
      ) : (
        <Popover placement="bottom" content="Follow">
          <Button
            onClick={followUserCallback}
            type="text"
            loading={isFollowingUser}
            disabled={isFollowingUser}
            icon={<UserAddOutlined />}
          >
            Add to friends
          </Button>
        </Popover>
      )}
    </div>
  );
};
