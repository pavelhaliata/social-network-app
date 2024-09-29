import * as yup from "yup";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const authValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("email is required")
    .matches(emailRegex, "email must be in a valid format"),
  password: yup.string().required("password is required"),
  rememberMe: yup.boolean(),
  captcha: yup.string(),
});
