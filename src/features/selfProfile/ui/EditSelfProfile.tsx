import { useUserProfileData } from "../../../entities/selfProfile/lib/hooks/useUserProfileData.ts";
import {
  useEditPhotoProfileMutation,
  useEditProfileMutation,
} from "../../../entities/selfProfile/service/editSelfProfileApi.ts";
import { EditPhotoProfile } from "../../../entities/selfProfile/editSelfProfile/ui/EditPhotoProfile.tsx";
import { EditFormProfile } from "../../../entities/selfProfile/editSelfProfile/ui/EditFormProfile.tsx";
import { UserProfile } from "../../../entities/users/model/types/userProfileType.ts";
import { ResponseStatus } from "../../../shared/types/api.ts";

export const EditSelfProfile = () => {
  const { userProfile } = useUserProfileData();
  const [editUserProfile] = useEditProfileMutation();
  const [editPhotoProfile, { isLoading: isLoadingPhoto }] =
    useEditPhotoProfileMutation();

  const onSubmitProfile = (data: UserProfile) => {
    editUserProfile({ ...data }).unwrap();
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
      <div className="cursor-pointer">
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
