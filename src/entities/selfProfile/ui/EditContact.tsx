import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import { Input } from "antd";
import { ComponentPropsWithoutRef } from "react";

export type ContactFields =
  | "contacts.facebook"
  | "contacts.instagram"
  | "contacts.twitter"
  | "contacts.vk"
  | "contacts.youtube"
  | "contacts.github"
  | "contacts.mainLink"
  | "contacts.website";

type IProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<ComponentPropsWithoutRef<"input">, "name">;

export const EditContact = <T extends FieldValues>({
  name,
  control,
  ...rest
}: IProps<T>) => {
  return (
    <div className="relative mb-4">
      <label htmlFor={name}>{name}:</label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Input {...rest} size="large" {...field} />
            <span className="absolute left-0 top-full text-danger-500 text-sm font-medium">
              {error && <p>{error.message}</p>}
            </span>
          </>
        )}
      />
    </div>
  );
};
