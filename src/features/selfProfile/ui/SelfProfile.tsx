import {
  useGetUserProfileQuery,
  useGetUserStatusQuery,
} from "../../../entities/users/model/api/userProfileApi.ts";
import { useAppSelector } from "../../../app/store";
import { Profile } from "../../../shared/components";
import { Link } from "react-router-dom";

export const SelfProfile = () => {
  const userId = useAppSelector<number>((store) => store.auth.authUserData.id);
  const { data: userProfile } = useGetUserProfileQuery(userId);
  const { data: userStatus } = useGetUserStatusQuery(userId);

  return (
    <div>
      <Profile userProfile={userProfile} userStatus={userStatus} />;
      <Link to={"/edit-profile"} className="border">
        {" "}
        edit profile
      </Link>
    </div>
  );
};
