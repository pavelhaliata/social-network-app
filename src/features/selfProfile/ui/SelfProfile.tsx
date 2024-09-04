import { useGetUserStatusQuery } from "../../../entities/users/model/api/userProfileApi.ts";
import { useAppSelector } from "../../../app/store";
import { Profile } from "../../../shared/components";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { useGetSelfProfileQuery } from "../../../entities/selfProfile/service/selfProfileApi.tsx";

export const SelfProfile = () => {
  const userId = useAppSelector<number>((store) => store.auth.authUserData.id);
  const { data: userProfile } = useGetSelfProfileQuery(userId);
  const { data: userStatus } = useGetUserStatusQuery(userId);

  return (
    <div className="flex ">
      <Profile userProfile={userProfile} userStatus={userStatus} />
      <Button type="primary" className="ml-auto">
        <Link to="/edit-profile" className="">
          Edit profile
        </Link>
      </Button>
    </div>
  );
};
