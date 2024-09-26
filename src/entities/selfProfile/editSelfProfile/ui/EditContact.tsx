import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import { Input } from "antd";

export type ContactFields =
  | "contacts.facebook"
  | "contacts.instagram"
  | "contacts.twitter"
  | "contacts.vk"
  | "contacts.youtube"
  | "contacts.github"
  | "contacts.mainLink"
  | "contacts.website";

type IProps<T extends FieldValues> = UseControllerProps<T> & {
  name: ContactFields;
};

export const EditContact = <T extends FieldValues>({
  name,
  control,
  ...rest
}: IProps<T>) => {
  return (
    <div className="relative mb-4">
      <label htmlFor={name}>{name}:</label>
      <Controller
        control={control}
        name={`contacts.${name}`}
        render={({ field, fieldState: { error } }) => (
          <>
            <Input id={name} {...rest} {...field} />
            <span className="absolute left-0 top-full text-danger-500 text-sm font-medium">
              {error && <p>{error.message}</p>}
            </span>
          </>
        )}
      />
    </div>
  );
};
