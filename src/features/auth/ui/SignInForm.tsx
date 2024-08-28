import { Button, Checkbox, Input } from "antd";
import frontImg from "../../../shared/assets/img/frontImg.jpg";
import { LockTwoTone, MailTwoTone } from "@ant-design/icons";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LoginData } from "../model/types/authType.ts";

type Props = {
  onSubmit: (data: LoginData) => void;
};

export const SignInForm = ({ onSubmit }: Props) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  const onSubmitHandler: SubmitHandler<LoginData> = (data) => {
    onSubmit(data);
  };

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
        <div className="h-full w-full">
          <div className="flex items-center justify-between">
            <div className="w-full md:w-[calc(100%/2-25px)]">
              <div
                className="relative text-2xl font-medium text-dark-300
                before:content-[''] before:absolute before:left-0 before:-bottom-1 before:h-[3px] before:w-[25px] before:bg-primary-500"
              >
                Login
              </div>
              <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="mt-8">
                  <div className="flex items-center h-12 w-full my-3">
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <Input
                          size={"large"}
                          prefix={<MailTwoTone />}
                          type="text"
                          placeholder="Enter your email"
                          {...field}
                        />
                      )}
                      rules={{
                        pattern:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        required: true,
                      }}
                    />
                  </div>
                  <div className="flex items-center h-12 w-full my-3">
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <Input
                          size={"large"}
                          prefix={<LockTwoTone />}
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      )}
                    />
                  </div>
                  <div className="text-primary-500 font-medium">
                    <a
                      href="https://social-network.samuraijs.com/login"
                      target="_blank"
                      className="hover:underline hover:underline-offset-2"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="mt-5">
                    <Button
                      type="primary"
                      size="large"
                      className="w-full text-light-100"
                      htmlType="submit"
                    >
                      Sign in
                    </Button>
                  </div>
                  <div className="text-center text-light-900 font-medium mt-5 ">
                    <span className="">Remember me: </span>
                    <Checkbox />
                  </div>
                  <div className="text-center text-light-900 font-medium mt-5">
                    Don't have an account?{" "}
                    <a
                      href="https://social-network.samuraijs.com/signUp"
                      target="_blank"
                      className="text-primary-500 hover:underline hover:underline-offset-2"
                    >
                      SigUp now
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
