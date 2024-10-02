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
    facebook: yup.string().nullable(),
    instagram: yup.string().nullable(),
    twitter: yup.string().nullable(),
    vk: yup.string().nullable(),
    youtube: yup.string().nullable(),
    github: yup.string().nullable(),
    mainLink: yup.string().nullable(),
    website: yup.string().nullable(),
  }),
});
