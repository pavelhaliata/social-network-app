import { ProfilePhoto, SocialContacts } from "../../../shared/components";
import { Link } from "react-router-dom";
import { useUserProfileData } from "../../../entities/selfProfile/lib/hooks/useUserProfileData.ts";
import { Typography } from "antd";
import { EditStatus } from "../../../entities/selfProfile/ui/EditStatus.tsx";
import { useChangeStatusMutation } from "../../../entities/selfProfile/api/editSelfProfileApi.ts";

const { Text } = Typography;

export const SelfProfile = () => {
  const { userProfile, userStatus } = useUserProfileData();
  const [changeStatus] = useChangeStatusMutation();

  const changeUserStatus = (status: string) => {
    changeStatus(status).unwrap();
  };

  return (
    <div className="flex items-start gap-x-14 gap-y-6 max-md:flex-col max-sm:items-center">
      <ProfilePhoto userPhoto={userProfile?.photos.large} />
      <div className="flex-1">
        <div className="mb-2">
          <Text className="font-bold">Status: </Text>
          <EditStatus status={userStatus} setStatus={changeUserStatus} />
        </div>
        <div className="mb-2">
          <Text className="font-bold">Full Name: </Text>
          <Text>{userProfile?.fullName}</Text>
        </div>
        <div className="mb-2">
          <Text className="font-bold">About Me: </Text>
          <Text>{userProfile?.aboutMe}</Text>
        </div>
        <div className="mb-2">
          <Text className="font-bold">Job Description: </Text>
          <Text>{userProfile?.lookingForAJobDescription}</Text>
        </div>
        <div className="mb-2">
          <Text className="font-bold">Social: </Text>
          <SocialContacts contacts={userProfile?.contacts} />
        </div>
      </div>
      <Link
        to="/edit-profile"
        className="ml-auto border rounded-lg py-2 px-6 text-center text-nowrap bg-primary-500
        text-white hover:bg-primary-300 hover:text-white max-sm:w-full"
      >
        Edit profile
      </Link>
    </div>
  );
};
