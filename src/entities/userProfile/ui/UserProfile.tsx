import { useParams } from "react-router-dom";
import {
  useFollowUserMutation,
  useGetFollowUserQuery,
  useGetUserProfileQuery,
  useGetUserStatusQuery,
  useUnFollowUserMutation,
} from "../service/userProfileApi.ts";
import { Avatar, Button, Flex, Image, Popover, Typography } from "antd";
import { HeartFilled, HeartOutlined, UserOutlined } from "@ant-design/icons";
import { SocialContacts } from "./SocialContacts.tsx";

const Text = Typography;

export const UserProfile = () => {
  const { id } = useParams();
  const userId = Number(id);
  // const navigate = useNavigate();
  const { data: user } = useGetUserProfileQuery(userId);
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
    <Flex gap={50}>
      <div className="overflow-hidden">
        {user?.photos.large ? (
          <Image
            src={user?.photos.large}
            alt="user logo"
            width={200}
            height={200}
            className="max-w-52 w-full object-cover rounded-lg"
          />
        ) : (
          <Avatar shape="square" size={164} icon={<UserOutlined />} />
        )}
        <div>
          {isFollow ? (
            <>
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
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
      <Flex gap={10} className="flex-col">
        <div>
          <Text className="font-bold">Status:</Text>
          <Text>{userStatus}</Text>
        </div>
        <div>
          <Text className="font-bold">Full Name:</Text>
          <Text>{user?.fullName}</Text>
        </div>
        <div>
          <Text className="font-bold">About Me:</Text>
          <Text>{user?.aboutMe}</Text>
        </div>
        <div>
          <Text className="font-bold">Job Description:</Text>
          <Text>{user?.lookingForAJobDescription}</Text>
        </div>
        <div>
          <Text className="font-bold">Social:</Text>
          <Flex className="gap-x-2">
            <SocialContacts contacts={user?.contacts} />
          </Flex>
        </div>
      </Flex>
    </Flex>
  );
};
