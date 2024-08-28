import { SignInForm } from "./SignInForm.tsx";
import { useLoginMutation } from "../model/api/authApi.ts";
import { LoginData } from "../model/types/authType.ts";
import { useAppSelector } from "../../../app/store";
import { Navigate } from "react-router-dom";

type Props = {};

export const SignIn = ({}: Props) => {
  const [signIn, {}] = useLoginMutation();

  const onSubmitHandler = async (data: LoginData) => {
    await signIn(data).then((res) => {
      console.log("Sign In Data: ", res);
    });
  };
  const isLoggedIn = useAppSelector<boolean>(
    (state) => state.auth.isAuthenticated,
  );

  if (isLoggedIn) {
    return <Navigate to={"/"} replace />;
  }

  return <SignInForm onSubmit={onSubmitHandler} />;
};
