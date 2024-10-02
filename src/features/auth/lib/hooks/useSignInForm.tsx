import { useForm } from "react-hook-form";
import { LoginData } from "../../types/authType.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { authValidationSchema } from "../../types/schemas/authValidationSchema.ts";

export const useSignInForm = () => {
  const {
    control,
    formState: { errors, isValid, isDirty },
    getValues,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    setValue,
  } = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
      captcha: null,
    },
    mode: "onTouched",
    resolver: yupResolver(authValidationSchema),
  });

  return {
    control,
    errors,
    getValues,
    handleSubmit,
    isValid,
    isDirty,
    reset,
    setError,
    clearErrors,
    setValue,
  };
};
