import { Button, Checkbox, Form } from "antd";
import frontImg from "../../../shared/assets/img/frontImg.jpg";
import { LockTwoTone, MailTwoTone } from "@ant-design/icons";
import { Controller, SubmitHandler } from "react-hook-form";
import { LoginData } from "../model/types/authType.ts";
import { useSignInForm } from "../lib/hooks/useSignInForm.tsx";
import { ControlledTextField } from "../../../shared/components/ControlledTextField/ControlledTextField.tsx";

type Props = {
  onSubmit: (data: LoginData) => void;
  isLoading: boolean;
};

export const SignInForm = ({ onSubmit, isLoading }: Props) => {
  const { control, errors, handleSubmit, isDirty, isValid } = useSignInForm();

  const onSubmitHandler: SubmitHandler<LoginData> = (data) => {
    onSubmit(data);
  };
  const signInDemoAccountHandler = () => {
    onSubmitHandler({
      email: import.meta.env.VITE_TEST_ACC_EMAIL,
      password: import.meta.env.VITE_TEST_ACC_PASSWORD,
    });
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
              <Form onSubmitCapture={handleSubmit(onSubmitHandler)}>
                <div className="mt-8">
                  <div className="h-12 w-full my-4">
                    <ControlledTextField
                      icon={<MailTwoTone />}
                      control={control}
                      name="email"
                      errors={errors.email?.message}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="h-12 w-full my-4">
                    <ControlledTextField
                      icon={<LockTwoTone />}
                      control={control}
                      name="password"
                      errors={errors.password?.message}
                      placeholder="Enter your password"
                    />
                  </div>
                  <div className="text-primary-500 font-medium">
                    <a
                      href={import.meta.env.VITE_FORGOT_PASS_LINK}
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
                      loading={isLoading}
                      disabled={isLoading || !isDirty || !isValid}
                    >
                      Sign In
                    </Button>
                  </div>
                  <div className="text-center text-light-900 font-medium mt-5 ">
                    <span>Remember me: </span>
                    <Controller
                      control={control}
                      name="rememberMe"
                      render={({ field: { onChange, value, name, ref } }) => (
                        <Checkbox
                          name={name}
                          onChange={onChange}
                          checked={value}
                          ref={ref}
                        />
                      )}
                    />
                  </div>
                  <div className="text-center text-light-900 font-medium mt-5">
                    <p className="inline">Don't have an account? </p>
                    <a
                      href={import.meta.env.VITE_SIGN_UP_LINK}
                      target="_blank"
                      className="text-primary-500 hover:underline hover:underline-offset-2"
                    >
                      Sign Up
                    </a>
                    <br />
                    <p>
                      or use{" "}
                      <span
                        className="text-primary-500 hover:underline hover:underline-offset-2 cursor-pointer"
                        onClick={signInDemoAccountHandler}
                      >
                        a demo account
                      </span>
                    </p>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
