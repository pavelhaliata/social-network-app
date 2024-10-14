import { useMemo } from "react";
import { useAppSelector } from "../../../../app/store";
import { useGetSelfProfileQuery } from "../../api/selfProfileApi.tsx";
import { useGetUserStatusQuery } from "../../../userProfile/api/userProfileApi.ts";

export const useUserProfileData = () => {
  const userId = useAppSelector<number>((store) => store.auth.authUserData.id);
  const {
    data: userProfile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useGetSelfProfileQuery(userId);

  const {
    data: userStatus,
    isLoading: isStatusLoading,
    error: statusError,
  } = useGetUserStatusQuery(userId);

  return useMemo(() => {
    const profileData = userProfile ? userProfile : undefined;
    const statusData = userStatus ? userStatus : undefined;

    return {
      userId,
      userProfile: profileData,
      userStatus: statusData,
      isLoading: isProfileLoading || isStatusLoading,
      error: profileError || statusError,
    };
  }, [
    userId,
    userProfile,
    userStatus,
    isProfileLoading,
    isStatusLoading,
    profileError,
    statusError,
  ]);
};
