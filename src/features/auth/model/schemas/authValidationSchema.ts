import * as yup from "yup";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const authValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .matches(emailRegex, "Email must be in a valid format"),
  password: yup.string().required("Password is required"),
  rememberMe: yup.boolean(),
  captcha: yup.string().nullable(),
});
