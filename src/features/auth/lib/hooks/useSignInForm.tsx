import { useForm } from "react-hook-form";
import { LoginData } from "../../model/types/authType.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInValidationSchema } from "../../model/schemas/signInValidationSchema.ts";

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
    mode: "onChange",
    resolver: yupResolver(signInValidationSchema),
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
