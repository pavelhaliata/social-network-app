import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UserProfile } from "../../../users/model/types/userProfileType.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { editProfileValidationSchema } from "../../model/schemas/editProfileValidationSchema.ts";

export const useEditProfileForm = (userProfile?: UserProfile) => {
  const {
    control,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    setValue,
  } = useForm({
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
    mode: "onBlur", // Валидация при потере фокуса
    reValidateMode: "onChange", // Повторная валидация при изменении значения
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
