import { Button, Form, Input } from "antd";
import { Controller } from "react-hook-form";
import {
  UserProfile,
  UserSocialContacts,
} from "../../../users/model/types/userProfileType.ts";
import { useEditProfileForm } from "../../lib/hooks/useEditProfileForm.ts";
import { EditContact } from "./EditContact.tsx";

type Props = {
  userProfile?: UserProfile;
  onSubmitProfile: (data: any) => void; // TODO: type any!!!
};
// type SocialMedia =
//   | "facebook"
//   | "website"
//   | "vk"
//   | "twitter"
//   | "instagram"
//   | "youtube"
//   | "github"
//   | "mainLink";

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
                {...field}
                onChange={(e) => {
                  field.onChange(e); // Обновляем значение
                  clearErrors("fullName"); // Очищаем ошибку при вводе текста
                }}
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
                placeholder="Enter about yourself"
                {...field}
                onChange={(e) => {
                  field.onChange(e); // Обновляем значение
                  clearErrors("aboutMe"); // Очищаем ошибку при вводе текста
                }}
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
                placeholder="Enter Job Description"
                {...field}
                onChange={(e) => {
                  field.onChange(e); // Обновляем значение
                  clearErrors("lookingForAJobDescription"); // Очищаем ошибку при вводе текста
                }}
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
        {Object.keys(socialMedia).map((item: any, index) => (
          <EditContact
            key={index}
            name={`contacts.${item}`}
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
