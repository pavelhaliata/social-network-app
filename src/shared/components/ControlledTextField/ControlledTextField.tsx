import { Controller, UseControllerProps } from "react-hook-form";
import { Input } from "antd";
import { ReactNode } from "react";

type FormValues = {
  email: string;
  password: string;
};

export const ControlledTextField = (
  props: UseControllerProps<FormValues> & {
    type?: "text" | "password";
    errors?: string;
    icon?: ReactNode;
    placeholder?: string;
  },
) => {
  return (
    <div>
      <Controller
        name={props.name}
        control={props.control}
        render={({ field, formState: {} }) => (
          <>
            <Input
              type={props.type}
              size="large"
              {...field}
              placeholder={props.placeholder}
              prefix={props.icon}
            />
          </>
        )}
      />
      <div className="text-danger-500 text-sm font-medium">
        {props.errors && <p>{props.errors}</p>}
      </div>
    </div>
  );
};
