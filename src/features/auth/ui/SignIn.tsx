import { SignInForm } from "./SignInForm.tsx";
import { useLoginMutation } from "../model/api/authApi.ts";
import { LoginData } from "../model/types/authType.ts";

type Props = {};

export const SignIn = ({}: Props) => {
  const [loginUser, { isLoading }] = useLoginMutation();

  const onSubmitHandler = async (data: LoginData) => {
    await loginUser(data).then((res) => {
      console.log("res: ", res);
    });
  };

  return <SignInForm onSubmit={onSubmitHandler} />;
};
