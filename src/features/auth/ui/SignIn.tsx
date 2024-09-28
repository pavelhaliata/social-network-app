import { SignInForm } from "./SignInForm.tsx";
import { useLoginMutation } from "../model/api/authApi.ts";
import { LoginData } from "../model/types/authType.ts";
import { useAppSelector } from "../../../app/store";
import { Navigate } from "react-router-dom";
import { ResponseStatus } from "../../../shared/types/api.ts";

export const SignIn = () => {
  const isLoggedIn = useAppSelector<boolean>(
    (state) => state.auth.isAuthenticated,
  );
  const [signIn, {isLoading}] = useLoginMutation();

  const onSubmitHandler = (
    data: LoginData
  ) => {
     signIn(data).unwrap().then(res => {
      if (res.resultCode !== ResponseStatus.Success) {
       
      }
    })
   
  };

  if (isLoggedIn) {
    return <Navigate to={"/"} replace />;
  }

  return <SignInForm onSubmit={onSubmitHandler} isLoading={isLoading}/>;
};
