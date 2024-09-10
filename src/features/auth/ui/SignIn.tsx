import { SignInForm } from "./SignInForm.tsx";
import { useLoginMutation } from "../model/api/authApi.ts";
import { LoginData } from "../model/types/authType.ts";
import { useAppSelector } from "../../../app/store";
import { Navigate } from "react-router-dom";
import { UseFormSetError } from "react-hook-form";

export const SignIn = () => {
  const isLoggedIn = useAppSelector<boolean>(
    (state) => state.auth.isAuthenticated,
  );
  const [signIn] = useLoginMutation();

  const onSubmitHandler = async (
    data: LoginData,
    setError: UseFormSetError<LoginData>,
  ) => {
    try {
      const response = await signIn(data).unwrap();
      if (response.resultCode !== 0) {
        setError("root.serverError", {
          message: response.messages[0],
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoggedIn) {
    return <Navigate to={"/"} replace />;
  }

  return <SignInForm onSubmit={onSubmitHandler} />;
};
