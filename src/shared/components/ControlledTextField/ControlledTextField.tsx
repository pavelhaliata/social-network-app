import { useController, UseControllerProps } from "react-hook-form";
import { Input } from "antd";

type FormValues = {
  email: string;
  password: string;
};

export const ControlledTextField = (props: UseControllerProps<FormValues>) => {
  const { field } = useController(props);

  return (
    <div>
      <Input {...field} placeholder={props.name} />
    </div>
  );
};
