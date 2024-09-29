import { SignInForm } from "./SignInForm.tsx";
import { useLoginMutation } from "../model/api/authApi.ts";
import { LoginData } from "../model/types/authType.ts";
import { useAppSelector } from "../../../app/store";
import { Navigate } from "react-router-dom";
import frontImg from "../../../shared/assets/img/frontImg.jpg";

export const SignIn = () => {
  const isLoggedIn = useAppSelector<boolean>(
    (state) => state.auth.isAuthenticated,
  );

  const captchaUrl = useAppSelector<string | undefined>(
    (state) => state.auth.captchaUrl,
  );

  const [signIn, { isLoading }] = useLoginMutation();

  const onSubmitHandler = (data: LoginData) => {
    signIn(data).unwrap();
  };

  if (isLoggedIn) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-500 p-8">
      <div className="relative max-w-[850px] w-full bg-light-100 py-10 px-8 rounded-lg overflow-hidden">
        <div
          className="hidden absolute top-0 left-2/4 h-full w-1/2 z-30
          after:content-[''] after:absolute after:h-full after:w-full after:opacity-50 after:z-10 after:bg-primary-500
          before:content-[''] before:absolute before:h-full before:w-full before:opacity-50 before:z-10 before:bg-primary-500
          md:block"
        >
          <img
            src={frontImg}
            alt="frontImg"
            className="absolute h-full w-full object-cover z-10"
          />
          <div className="absolute z-30 h-full w-full flex flex-col items-center justify-center">
            <span className="text-3xl font-semibold text-center">
              Every new friend is a <br /> new adventure
            </span>
            <span className="text-lg font-medium">Let's get connected</span>
          </div>
        </div>
        <div className="w-full h-full md:w-[calc(100%/2-25px)]">
          <SignInForm
            onSubmit={onSubmitHandler}
            isLoading={isLoading}
            captchaUrl={captchaUrl}
          />
        </div>
      </div>
    </div>
  );
};
