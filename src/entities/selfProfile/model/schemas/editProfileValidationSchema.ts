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
  contacts: yup.object().shape({
    facebook: yup
      .string()
      .url("Please enter a valid URL")
      .required("Facebook is required"),
    instagram: yup
      .string()
      .url("Please enter a valid URL")
      .required("Instagram is required"),
    twitter: yup
      .string()
      .url("Please enter a valid URL")
      .required("Twitter is required"),
    vk: yup.string().url("Please enter a valid URL").required("VK is required"),
    youtube: yup
      .string()
      .url("Please enter a valid URL")
      .required("YouTube is required"),
    github: yup
      .string()
      .url("Please enter a valid URL")
      .required("GitHub is required"),
    mainLink: yup
      .string()
      .url("Please enter a valid URL")
      .required("Main Link is required"),
    website: yup
      .string()
      .url("Please enter a valid URL")
      .required("Website is required"),
  }),
});
