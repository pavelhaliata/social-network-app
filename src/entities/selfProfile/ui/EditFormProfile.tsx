import { Button, Form, Input } from "antd";
import { Controller } from "react-hook-form";
import {
  UserProfile,
  UserSocialContacts,
} from "../../userProfile/types/userProfileType.ts";
import { useEditProfileForm } from "../lib/hooks/useEditProfileForm.ts";
import { EditContact } from "./EditContact.tsx";
import { SocialMedia } from "../types/selfProfileType.ts";

type Props = {
  userProfile?: UserProfile;
  onSubmitProfile: (
    data: Omit<UserProfile, "userId" | "photos" | "lookingForAJob">,
  ) => void;
};

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
                placeholder="Enter your Full Name"
                status={errors.fullName && "error"}
                {...field}
                onChange={(e) => {
                  field.onChange(e); // Обновляем значение
                  clearErrors("fullName"); // Очищаем ошибку при вводе текста
                }}
                // className={errors.fullName && "border border-danger-500 "}
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
                placeholder="Enter about yourself"
                status={errors.aboutMe && "error"}
                {...field}
                onChange={(e) => {
                  field.onChange(e); // Обновляем значение
                  clearErrors("aboutMe"); // Очищаем ошибку при вводе текста
                }}
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
                placeholder="Enter Job Description"
                {...field}
                status={errors.lookingForAJobDescription && "error"}
                onChange={(e) => {
                  field.onChange(e); // Обновляем значение
                  clearErrors("lookingForAJobDescription"); // Очищаем ошибку при вводе текста
                }}
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
          <EditContact
            key={index}
            name={`contacts.${item as SocialMedia}`}
            control={control}
          />
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
