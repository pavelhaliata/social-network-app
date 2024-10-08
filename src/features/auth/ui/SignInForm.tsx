import { Button, Checkbox, Form } from "antd";
import { LockTwoTone, MailTwoTone } from "@ant-design/icons";
import { Controller, SubmitHandler } from "react-hook-form";
import { LoginData } from "../types/authType.ts";
import { useSignInForm } from "../lib/hooks/useSignInForm.tsx";
import { ControlledTextField } from "../../../shared/components/ControlledTextField/ControlledTextField.tsx";
import { Captcha } from "./Captcha.tsx";
import { useAppSelector } from "../../../app/store";
import {
  AUTH_FORGOT_PASS_URL,
  AUTH_SIGNUP_URL,
} from "../constants/authConstants.ts";

type Props = {
  onSubmit: (data: LoginData) => void;
  isLoading: boolean;
};

export const SignInForm = ({ onSubmit, isLoading }: Props) => {
  const captchaUrl = useAppSelector<string | null>(
    (state) => state.auth.captchaUrl,
  );

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
    <div>
      <h1
        className="relative text-2xl font-medium text-dark-300
            before:content-[''] before:absolute before:left-0 before:-bottom-1
            before:h-[3px] before:w-[25px] before:bg-primary-500"
      >
        Login
      </h1>
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
              type="password"
              errors={errors.password?.message}
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <Captcha name="captcha" control={control} captchaUrl={captchaUrl} />
          </div>
          <div className="text-primary-500 font-medium">
            <a
              href={AUTH_FORGOT_PASS_URL}
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
          <div className="text-center text-light-900 font-medium mt-5">
            <label htmlFor="rememberMe" className="cursor-pointer">
              Remember me:{" "}
            </label>
            <Controller
              control={control}
              name="rememberMe"
              render={({ field: { onChange, value, ref } }) => (
                <Checkbox
                  id="rememberMe"
                  onChange={onChange}
                  checked={value}
                  ref={ref}
                />
              )}
            />
          </div>
          <div className="text-center text-light-900 font-medium mt-5">
            <p>
              Don't have an account?{" "}
              <a
                href={AUTH_SIGNUP_URL}
                target="_blank"
                className="text-primary-500 hover:underline hover:underline-offset-2"
              >
                Sign Up
              </a>
            </p>
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
  );
};
