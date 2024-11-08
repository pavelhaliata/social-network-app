import { Typography } from "antd";
import { UserProfile } from "../../../entities/userProfile/types/userProfileType.ts";

const { Text } = Typography;
type Props = {
  userProfile?: UserProfile;
};

const profileDetails = {
  fullName: { title: "Full Name: " },
  aboutMe: { title: "About Me: " },
  lookingForAJobDescription: { title: "Job Description: " },
};
export const ProfileDescription = ({ userProfile }: Props) => {
  const availableDetails = Object.keys(profileDetails).filter(
    (key) => userProfile && userProfile[key as keyof UserProfile],
  );
  return (
    <div className="space-y-2">
      {availableDetails.map((key) => {
        const description = userProfile?.[key as keyof UserProfile] as string;
        const { title } = profileDetails[key as keyof typeof profileDetails];
        return (
          <div>
            <Text className="font-bold">{title}</Text>
            <Text>{description}</Text>
          </div>
        );
      })}
    </div>
  );
};
