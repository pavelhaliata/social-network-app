import { Controller, UseControllerProps } from "react-hook-form";
import { Input } from "antd";

type FormValues = {
  email: string;
  password: string;
};

export const ControlledTextField = (props: UseControllerProps<FormValues> & {errors?: string, icon?: React.ReactNode}) => {
  return (
    <div>
      <Controller
      name={props.name}
      control={props.control}
      render={({field, formState:{}})=>(
        <>
          <Input {...field} placeholder={props.name} prefix={props.icon}/>
        </>
      )}
      />
      <div className="text-danger-500 text-sm font-medium">
            {props.errors && <p>{props.errors}</p>}
          </div>
    </div>
  );
};
