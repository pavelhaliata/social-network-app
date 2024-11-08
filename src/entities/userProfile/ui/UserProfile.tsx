import { useParams } from "react-router-dom";
import {
  useFollowUserMutation,
  useGetFollowUserQuery,
  useGetUserProfileQuery,
  useGetUserStatusQuery,
  useUnFollowUserMutation,
} from "../api/userProfileApi.ts";
import { Profile } from "../../../shared/components";
import { Subscription } from "./Subscription.tsx";

export const UserProfile = () => {
  const { id } = useParams();
  const userId = Number(id);
  const { data: userProfile } = useGetUserProfileQuery(userId);
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
    <div>
      <Profile userProfile={userProfile} userStatus={userStatus} />
      <Subscription
        isFollow={isFollow}
        isFollowingUser={isFollowUser}
        isUnFollowingUser={isUnFollowUser}
        followUserCallback={followUserHandler}
        unFollowUserCallback={unFollowUserHandler}
        className="mt-4"
      />
    </div>
  );
};
