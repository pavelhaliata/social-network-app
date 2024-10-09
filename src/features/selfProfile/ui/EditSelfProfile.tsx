import { useUserProfileData } from "../../../entities/selfProfile/lib/hooks/useUserProfileData.ts";
import {
  useEditPhotoProfileMutation,
  useEditProfileMutation,
} from "../../../entities/selfProfile/api/editSelfProfileApi.ts";

import { UserProfile } from "../../../entities/userProfile/types/userProfileType.ts";
import { ResponseStatus } from "../../../shared/types/api.ts";
import {
  EditFormProfile,
  EditPhotoProfile,
} from "../../../entities/selfProfile";

export const EditSelfProfile = () => {
  const { userProfile } = useUserProfileData();
  const [editUserProfile] = useEditProfileMutation();
  const [editPhotoProfile, { isLoading: isLoadingPhoto }] =
    useEditPhotoProfileMutation();

  const onSubmitProfile = (
    data: Omit<UserProfile, "userId" | "photos" | "lookingForAJob">,
  ) => {
    if (!userProfile) return;
    const dataProfile: UserProfile = {
      userId: userProfile.userId,
      lookingForAJob: userProfile.lookingForAJob,
      photos: userProfile.photos,
      ...data,
    };
    editUserProfile({ ...dataProfile }).unwrap();
  };

  const onSubmitPhotoProfile = (
    file: File | Blob | string,
    closeModalCallback: () => void,
  ) => {
    const formData = new FormData();
    formData.append("image", file);
    editPhotoProfile(formData)
      .unwrap()
      .then((res) => {
        if (res.resultCode === ResponseStatus.Success) {
          closeModalCallback();
        }
      });
  };

  return (
    <div className="flex gap-x-4 items-start">
      <div>
        <EditPhotoProfile
          userProfile={userProfile}
          isLoadingPhoto={isLoadingPhoto}
          onSubmitPhotoProfile={onSubmitPhotoProfile}
        />
      </div>
      <div className="w-3/4 ml-auto">
        <EditFormProfile
          userProfile={userProfile}
          onSubmitProfile={onSubmitProfile}
        />
      </div>
    </div>
  );
};
