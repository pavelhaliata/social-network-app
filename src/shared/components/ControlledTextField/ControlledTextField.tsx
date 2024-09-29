import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import { Input } from "antd";
import { ComponentPropsWithoutRef, ReactNode } from "react";

type Props<T extends FieldValues> = UseControllerProps<T> &
  Omit<ComponentPropsWithoutRef<"input">, "name"> & {
    errors?: string;
    icon?: ReactNode;
  };

export const ControlledTextField = <T extends FieldValues>({
  name,
  control,
  icon,
  errors,
  ...rest
}: Props<T>) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, ...field } }) => (
          <Input {...rest} prefix={icon} size="large" ref={ref} {...field} />
        )}
      />
      <div className="text-danger-500 text-sm font-medium">
        {errors && <p>{errors}</p>}
      </div>
    </div>
  );
};
