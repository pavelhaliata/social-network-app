import { Button, Popover, Typography } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

const Text = Typography;

type Props = {
  isFollow?: boolean;
  isFollowingUser: boolean;
  isUnFollowingUser: boolean;
  unFollowUserCallback: () => void;
  followUserCallback: () => void;
};

export const Subscription = ({
  isFollow,
  isFollowingUser,
  isUnFollowingUser,
  followUserCallback,
  unFollowUserCallback,
}: Props) => {
  return (
    <div>
      {isFollow ? (
        <Popover placement="bottom" content="Unfollow">
          <Button
            onClick={unFollowUserCallback}
            type="text"
            shape="circle"
            loading={isUnFollowingUser}
            disabled={isUnFollowingUser}
            icon={<HeartFilled className="text-2xl" />}
          />
          <Text className="font-bold inline-block cursor-pointer">
            My Friend
          </Text>
        </Popover>
      ) : (
        <Popover placement="bottom" content="Follow">
          <Button
            onClick={followUserCallback}
            type="text"
            shape="circle"
            loading={isFollowingUser}
            disabled={isFollowingUser}
            icon={<HeartOutlined className="text-2xl" />}
          />
          <Text className="font-bold inline-block cursor-pointer">
            Add to friends
          </Text>
        </Popover>
      )}
    </div>
  );
};
