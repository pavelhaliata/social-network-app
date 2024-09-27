import * as yup from "yup";

export const signInValidationSchema = yup.object().shape({
  email: yup.string().email().required("email is required"),
  password: yup.string().required("password is required"),
  rememberMe: yup.boolean(),
  captcha: yup.string().nullable(),
});
