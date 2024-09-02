import { Avatar, Badge, Button, Flex, Image, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { SocialContacts } from "../../../entities/users/ui/SocialContacts.tsx";
import {
  useGetUserProfileQuery,
  useGetUserStatusQuery,
} from "../../../entities/users/service/userProfileApi.ts";
import { useAppSelector } from "../../../app/store";
import { Link } from "react-router-dom";

const { Text, Title } = Typography;

export const SelfProfile = () => {
  // const { data: selfProfile } = useGetAuthDataQuery();
  const userId = useAppSelector<number>((store) => store.auth.authUserData.id);
  const { data: user } = useGetUserProfileQuery(userId);
  const { data: userStatus } = useGetUserStatusQuery(userId);

  return (
    <Flex gap={50}>
      <div className="overflow-hidden">
        {user?.photos.large ? (
          <Badge.Ribbon placement={"start"} text="Open to work">
            <Image
              src={user?.photos.large}
              alt="user logo"
              width={200}
              height={200}
              className="max-w-52 w-full object-cover rounded-lg"
            />
          </Badge.Ribbon>
        ) : (
          <Avatar shape="square" size={164} icon={<UserOutlined />} />
        )}
      </div>
      <Flex gap={10} className="flex-col">
        <div>
          <Text className="font-bold">Status: </Text>
          <Text>{userStatus}</Text>
        </div>
        <div>
          <Text className="font-bold">Full Name: </Text>
          <Text>{user?.fullName}</Text>
        </div>
        <div>
          <Text className="font-bold">About Me: </Text>
          <Text>{user?.aboutMe}</Text>
        </div>
        <div>
          <Text className="font-bold">Job Description: </Text>
          <Text>{user?.lookingForAJobDescription}</Text>
        </div>
        <div>
          <Text className="font-bold">Social: </Text>
          <Flex className="gap-x-2">
            <SocialContacts contacts={user?.contacts} />
          </Flex>
        </div>
      </Flex>
      <Link to={"/edit-profile"}> edit profile</Link>
    </Flex>
  );
};
