import { Flex, Typography } from "antd";
import { UserProfile } from "../../../entities/userProfile/types/userProfileType.ts";
import { SocialContacts } from "../SocialContacts/SocialContacts.tsx";
import { ProfilePhoto } from "../ProfilePhoto/ProfilePhoto.tsx";
import { ProfileDescription } from "../ProfileDescription/ProfileDescription.tsx";

const { Text } = Typography;

type Props = {
  userProfile?: UserProfile;
  userStatus?: string;
};

export const Profile = ({ userProfile, userStatus }: Props) => {
  return (
    <Flex gap={50} className="max-md:flex-col max-sm:items-center">
      <ProfilePhoto userPhoto={userProfile?.photos.large} />
      <Flex gap={8} className="flex-col flex-1">
        <div>
          <Text className="font-bold">Status: </Text>
          <Text>{userStatus}</Text>
        </div>
        <div>
          <ProfileDescription userProfile={userProfile} />
        </div>
        <div>
          <SocialContacts contacts={userProfile?.contacts} />
        </div>
      </Flex>
    </Flex>
  );
};
