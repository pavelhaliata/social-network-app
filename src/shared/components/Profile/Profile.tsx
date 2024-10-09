import { Avatar, Flex, Image, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UserProfile } from "../../../entities/userProfile/types/userProfileType.ts";
import { SocialContacts } from "../SocialContacts/SocialContacts.tsx";

const { Text } = Typography;

type Props = {
  userProfile?: UserProfile;
  userStatus?: string;
};

export const Profile = ({ userProfile, userStatus }: Props) => {
  return (
    <Flex gap={50}>
      <div className="overflow-hidden">
        {userProfile?.photos.large ? (
          <Image
            src={userProfile?.photos.large}
            alt="user logo"
            className="max-w-[200px] w-full object-cover rounded-lg"
          />
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
          <Text>{userProfile?.fullName}</Text>
        </div>
        <div>
          <Text className="font-bold">About Me: </Text>
          <Text>{userProfile?.aboutMe}</Text>
        </div>
        <div>
          <Text className="font-bold">Job Description: </Text>
          <Text>{userProfile?.lookingForAJobDescription}</Text>
        </div>
        <div>
          <Text className="font-bold">Social: </Text>
          <Flex className="gap-x-2">
            <SocialContacts contacts={userProfile?.contacts} />
          </Flex>
        </div>
      </Flex>
    </Flex>
  );
};
