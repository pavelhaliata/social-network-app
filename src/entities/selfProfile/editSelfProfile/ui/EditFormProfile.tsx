import { Button, Form, Input } from "antd";
import {
  Control,
  Controller,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import {
  UserProfile,
  UserSocialContacts,
} from "../../../users/model/types/userProfileType.ts";
import { useEditProfileForm } from "../../lib/hooks/useEditProfileForm.ts";

type Props = {
  userProfile?: UserProfile;
  onSubmitProfile: (data: any) => void;
};
type SocialMedia =
  | "fullName"
  | "aboutMe"
  | "lookingForAJobDescription"
  | "contacts"
  | "contacts.facebook"
  | "contacts.website"
  | "contacts.vk"
  | "contacts.twitter"
  | "contacts.instagram"
  | "contacts.youtube"
  | "contacts.github"
  | "contacts.mainLink";

export const EditFormProfile = ({ userProfile, onSubmitProfile }: Props) => {
  const socialMedia: UserSocialContacts | {} = userProfile
    ? userProfile.contacts
    : {};

  const { control, errors, clearErrors, handleSubmit } =
    useEditProfileForm(userProfile);

  return (
    <div>
      <Form onSubmitCapture={handleSubmit(onSubmitProfile)}>
        <span className="block text-end text-xl">Profile</span>
        <div className="relative mb-4">
          <label htmlFor="fullName">My name:</label>
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <Input
                id="fullName"
                type="text"
                {...field}
                onChange={(e) => {
                  field.onChange(e); // Обновляем значение
                  clearErrors("fullName"); // Очищаем ошибку при вводе текста
                }}
                placeholder="Enter your Full Name"
                className={errors.fullName && "border border-danger-500 "}
              />
            )}
          />
          <span className="absolute left-0 top-full text-danger-500 text-sm font-medium mb-4">
            {errors.fullName && <p>{errors.fullName.message}</p>}
          </span>
        </div>
        <div className="relative mb-4">
          <label>About me:</label>
          <Controller
            name="aboutMe"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                autoSize={{ minRows: 3, maxRows: 6 }}
                {...field}
                onChange={(e) => {
                  field.onChange(e); // Обновляем значение
                  clearErrors("aboutMe"); // Очищаем ошибку при вводе текста
                }}
                placeholder="Enter about yourself"
                className={errors.aboutMe && "border border-danger-500 "}
              />
            )}
          />
          <span className="absolute left-0 top-full text-danger-500 text-sm font-medium">
            {errors.aboutMe && <p>{errors.aboutMe.message}</p>}
          </span>
        </div>
        <div className="relative mb-4">
          <label htmlFor="lookingForAJobDescription">Job descriptions:</label>
          <Controller
            name="lookingForAJobDescription"
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                {...field}
                onChange={(e) => {
                  field.onChange(e); // Обновляем значение
                  clearErrors("lookingForAJobDescription"); // Очищаем ошибку при вводе текста
                }}
                placeholder="Enter Job Description"
                className={
                  errors.lookingForAJobDescription &&
                  "border border-danger-500 "
                }
              />
            )}
          />
          <span className="absolute left-0 top-full text-danger-500 text-sm font-medium">
            {errors.lookingForAJobDescription && (
              <p>{errors.lookingForAJobDescription.message}</p>
            )}
          </span>
        </div>
        <span className="block text-end text-xl">Social Media Contacts</span>
        {Object.keys(socialMedia).map((item, index) => (
          <EditContact key={index} name={item} control={control} />
        ))}
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          className="w-1/5 float-right mt-4"
        >
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

type IProps<T extends FieldValues> = UseControllerProps<T>;

type IIProps = {
  name: string;
  control: any;
};

const EditContact = ({ name, control }: IIProps) => {
  return (
    <div className="relative mb-4">
      <label htmlFor={name}>{name}:</label>
      <Controller
        control={control}
        name={`contacts.${name}`}
        render={({ field, fieldState: { error } }) => (
          <>
            <Input
              id={name}
              {...field}
              placeholder={`Enter your ${name} link`}
            />
            <span className="absolute left-0 top-full text-danger-500 text-sm font-medium">
              {error && <p>{error.message}</p>}
            </span>
          </>
        )}
      />
    </div>
  );
};

// <T extends FieldValues>({
//                             name,
//                             control,
//                             ...rest
//                         }: IProps<T>)
