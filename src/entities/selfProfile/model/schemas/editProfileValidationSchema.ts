import * as yup from "yup";

export const editProfileValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .max(500, "Maximum number of characters 500"),
  aboutMe: yup
    .string()
    .required("About Me is required")
    .max(500, "Maximum number of characters 500"),
  lookingForAJobDescription: yup
    .string()
    .required("Job descriptions is required")
    .max(500, "Maximum number of characters 500"),

  // Вложенный объект contacts
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
