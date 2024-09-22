import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UserProfile } from "../../../users/model/types/userProfileType.ts";

export const useEditProfileForm = (userProfile?: UserProfile) => {
  const {
    control,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
    reset,
    setError,
    setValue,
  } = useForm<UserProfile>({
    defaultValues: {
      fullName: "",
      aboutMe: "",
      lookingForAJobDescription: "",
      contacts: {
        facebook: "",
        instagram: "",
        twitter: "",
        vk: "",
        youtube: "",
        github: "",
        mainLink: "",
        website: "",
      },
    },
    mode: "onBlur",
    // resolver: '',
  });

  useEffect(() => {
    if (userProfile) {
      reset({
        fullName: userProfile.fullName,
        aboutMe: userProfile.aboutMe,
        lookingForAJobDescription: userProfile.lookingForAJobDescription,
        contacts: {
          github: userProfile.contacts.github,
          facebook: userProfile.contacts.facebook,
          instagram: userProfile.contacts.instagram,
          twitter: userProfile.contacts.twitter,
          vk: userProfile.contacts.vk,
          youtube: userProfile.contacts.youtube,
          website: userProfile.contacts.website,
          mainLink: userProfile.contacts.mainLink,
        },
      });
    }
  }, [userProfile, reset]);

  return {
    control,
    errors,
    getValues,
    handleSubmit,
    isValid,
    reset,
    setError,
    setValue,
  };
};
