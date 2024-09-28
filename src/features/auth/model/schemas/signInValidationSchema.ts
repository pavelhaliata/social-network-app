import * as yup from "yup";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const signInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegex, "email must be in a valid format")
    .required("email is required"),
  password: yup.string().required("password is required"),
  rememberMe: yup.boolean(),
  captcha: yup.string().nullable(),
});
