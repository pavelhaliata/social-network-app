import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UserProfile } from "../../../users/model/types/userProfileType.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const useEditProfileForm = (userProfile?: UserProfile) => {
  const schema = yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    aboutMe: yup.string().required("About Me is required"),
    lookingForAJobDescription: yup
      .string()
      .required("Job descriptions is required"),
    contacts: yup.object().shape({
      facebook: yup.string().required("Facebook is required"),
      instagram: yup.string().required("Instagram is required"),
      twitter: yup.string().required("Twitter is required"),
      vk: yup.string().required("VK is required"),
      youtube: yup.string().required("YouTube is required"),
      github: yup.string().required("GitHub is required"),
      mainLink: yup.string().required("Main Link is required"),
      website: yup.string().required("Website is required"),
    }),
  });

  const {
    control,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
    reset,
    setError,
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
    mode: "onBlur",
    resolver: yupResolver(schema),
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
