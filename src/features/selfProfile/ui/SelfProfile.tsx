import { Profile } from "../../../shared/components";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { useUserProfileData } from "../../../entities/selfProfile/lib/hooks/useUserProfileData.ts";

export const SelfProfile = () => {
  const { userProfile, userStatus } = useUserProfileData();

  return (
    <div className="flex ">
      <Profile userProfile={userProfile} userStatus={userStatus} />
      <Button type="primary" className="ml-auto">
        <Link to="/edit-profile">Edit profile</Link>
      </Button>
    </div>
  );
};
