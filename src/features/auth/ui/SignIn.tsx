import { SignInForm } from "./SignInForm.tsx";
import { useLoginMutation } from "../model/api/authApi.ts";
import { LoginData } from "../model/types/authType.ts";
import { useAppSelector } from "../../../app/store";
import { Navigate } from "react-router-dom";
import { UseFormSetError } from "react-hook-form";
import { ResponseStatus } from "../../../shared/types/api.ts";

export const SignIn = () => {
  const isLoggedIn = useAppSelector<boolean>(
    (state) => state.auth.isAuthenticated,
  );
  const [signIn, {isLoading}] = useLoginMutation();

  const onSubmitHandler = (
    data: LoginData,
    setError: UseFormSetError<LoginData>,
  ) => {
     signIn(data).unwrap().then(res => {
      if (res.resultCode !== ResponseStatus.Success) {
        setError("root.serverError", {
          message: res.messages[0],
        });
      }
    })
   
  };

  if (isLoggedIn) {
    return <Navigate to={"/"} replace />;
  }

  return <SignInForm onSubmit={onSubmitHandler} isLoading={isLoading}/>;
};
