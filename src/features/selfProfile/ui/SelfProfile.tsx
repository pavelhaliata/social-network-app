import { Profile } from "../../../shared/components";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { useUserProfileData } from "../../../entities/selfProfile/lib/hooks/useUserProfileData.ts";

export const SelfProfile = () => {
  const { userProfile, userStatus } = useUserProfileData();

  return (
    <div className="flex items-start">
      <Profile userProfile={userProfile} userStatus={userStatus} />
      <Link
        to="/edit-profile"
        className="ml-auto border rounded-lg inline py-2 px-6 bg-primary-500 text-white hover:bg-primary-300 hover:text-white"
      >
        Edit profile
      </Link>
    </div>
  );
};
