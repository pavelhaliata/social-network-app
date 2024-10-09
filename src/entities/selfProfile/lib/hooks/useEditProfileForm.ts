import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UserProfile } from "../../../userProfile/types/userProfileType.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { editProfileValidationSchema } from "../../types/schemas/editProfileValidationSchema.ts";
import { EditUserProfile } from "../../types/selfProfileType.ts";

export const useEditProfileForm = (userProfile: UserProfile | undefined) => {
  const {
    control,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    setValue,
  } = useForm<EditUserProfile>({
    defaultValues: {
      fullName: "",
      aboutMe: "",
      lookingForAJobDescription: "",
      contacts: {
        facebook: null,
        instagram: null,
        twitter: null,
        vk: null,
        youtube: null,
        github: null,
        mainLink: null,
        website: null,
      },
    },
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(editProfileValidationSchema),
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
    clearErrors,
    setValue,
  };
};
