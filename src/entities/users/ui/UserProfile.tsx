import { useParams } from "react-router-dom";
import {
  useFollowUserMutation,
  useGetFollowUserQuery,
  useGetUserProfileQuery,
  useGetUserStatusQuery,
  useUnFollowUserMutation,
} from "../model/api/userProfileApi.ts";
import { Button, Popover, Typography } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Profile } from "../../../shared/components";

const Text = Typography;

export const UserProfile = () => {
  const { id } = useParams();
  const userId = Number(id);
  const { data: userProfile } = useGetUserProfileQuery(userId);
  const { data: userStatus } = useGetUserStatusQuery(userId);
  const { data: isFollow } = useGetFollowUserQuery(userId);
  const [followUser, { isLoading: isFollowUser }] = useFollowUserMutation();
  const [unFollowUser, { isLoading: isUnFollowUser }] =
    useUnFollowUserMutation();

  const followUserHandler = () => {
    followUser(userId).unwrap();
  };

  const unFollowUserHandler = () => {
    unFollowUser(userId).unwrap();
  };

  return (
    <>
      <Profile userProfile={userProfile} userStatus={userStatus} />
      <div>
        {isFollow ? (
          <Popover placement="bottom" content="Unfollow">
            <Button
              onClick={unFollowUserHandler}
              type="text"
              shape="circle"
              loading={isUnFollowUser}
              icon={<HeartFilled className="text-2xl" />}
            />
            <Text className="font-bold inline-block cursor-pointer">
              My Friend
            </Text>
          </Popover>
        ) : (
          <Popover placement="bottom" content="Follow">
            <Button
              onClick={followUserHandler}
              type="text"
              shape="circle"
              loading={isFollowUser}
              icon={<HeartOutlined className="text-2xl" />}
            />
            <Text className="font-bold inline-block cursor-pointer">
              Add to friends
            </Text>
          </Popover>
        )}
      </div>
    </>
  );
};
