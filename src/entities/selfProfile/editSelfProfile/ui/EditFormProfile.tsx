import { Button, Form, Input } from "antd";
import {
  Controller,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { UserProfile } from "../../../users/model/types/userProfileType.ts";
import { useEditProfileForm } from "../../lib/hooks/useEditProfileForm.ts";

type Props = {
  userProfile?: UserProfile;
  onSubmitProfile: (data: any) => void;
};

export const EditFormProfile = ({ userProfile, onSubmitProfile }: Props) => {
  const contacts: any = userProfile ? userProfile.contacts : {};

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

        <span className="block text-end text-xl">Social Contacts</span>
        {/*<label>GitHub link profile:</label>*/}
        {/*<Controller*/}
        {/*  name="contacts.github"*/}
        {/*  control={control}*/}
        {/*  render={({ field }) => (*/}
        {/*    <Input*/}
        {/*      type="text"*/}
        {/*      placeholder="Enter your github link profile"*/}
        {/*      {...field}*/}
        {/*      className="mb-4"*/}
        {/*    />*/}
        {/*  )}*/}
        {/*/>*/}
        {/*<label>Facebook link profile:</label>*/}
        {/*<Controller*/}
        {/*  name="contacts.facebook"*/}
        {/*  control={control}*/}
        {/*  render={({ field }) => (*/}
        {/*    <Input*/}
        {/*      type="text"*/}
        {/*      placeholder="Enter your facebook link profile"*/}
        {/*      {...field}*/}
        {/*      className="mb-4"*/}
        {/*    />*/}
        {/*  )}*/}
        {/*/>*/}
        {/*<label>Instagram link profile:</label>*/}
        {/*<Controller*/}
        {/*  name="contacts.instagram"*/}
        {/*  control={control}*/}
        {/*  render={({ field }) => (*/}
        {/*    <Input*/}
        {/*      type="text"*/}
        {/*      placeholder="Enter your instagram link profile"*/}
        {/*      {...field}*/}
        {/*      className="mb-4"*/}
        {/*    />*/}
        {/*  )}*/}
        {/*/>*/}
        {/*<label>Twitter link profile:</label>*/}
        {/*<Controller*/}
        {/*  name="contacts.twitter"*/}
        {/*  control={control}*/}
        {/*  render={({ field }) => (*/}
        {/*    <Input*/}
        {/*      type="text"*/}
        {/*      placeholder="Enter your twitter linl profile"*/}
        {/*      {...field}*/}
        {/*      className="mb-4"*/}
        {/*    />*/}
        {/*  )}*/}
        {/*/>*/}
        {/*<label>VK link profile:</label>*/}
        {/*<Controller*/}
        {/*  name="contacts.vk"*/}
        {/*  control={control}*/}
        {/*  render={({ field }) => (*/}
        {/*    <Input*/}
        {/*      type="text"*/}
        {/*      placeholder="Enter your VK link profile"*/}
        {/*      {...field}*/}
        {/*      className="mb-4"*/}
        {/*    />*/}
        {/*  )}*/}
        {/*/>*/}
        {/*<label>Youtube link profile:</label>*/}
        {/*<Controller*/}
        {/*  name="contacts.youtube"*/}
        {/*  control={control}*/}
        {/*  render={({ field }) => (*/}
        {/*    <Input*/}
        {/*      type="text"*/}
        {/*      placeholder="Enter your Youtube link profile"*/}
        {/*      {...field}*/}
        {/*      className="mb-4"*/}
        {/*    />*/}
        {/*  )}*/}
        {/*/>*/}
        {/*<label>WEB Site link:</label>*/}
        {/*<Controller*/}
        {/*  name="contacts.website"*/}
        {/*  control={control}*/}
        {/*  render={({ field }) => (*/}
        {/*    <Input*/}
        {/*      type="text"*/}
        {/*      placeholder="Enter your website link"*/}
        {/*      {...field}*/}
        {/*      className="mb-4"*/}
        {/*    />*/}
        {/*  )}*/}
        {/*/>*/}
        {/*<label>Main link:</label>*/}
        {/*<Controller*/}
        {/*  name="contacts.mainLink"*/}
        {/*  control={control}*/}
        {/*  render={({ field }) => (*/}
        {/*    <Input*/}
        {/*      type="text"*/}
        {/*      placeholder="Enter your Main link"*/}
        {/*      {...field}*/}
        {/*      className="mb-4"*/}
        {/*    />*/}
        {/*  )}*/}
        {/*/>*/}
        {Object.keys(contacts).map((item, index) => (
          <p key={index}>{item}</p>
        ))}
        {/*<EditContact name={"contacts.facebook"} />*/}
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

const EditContact = <T extends FieldValues>({ name, ...rest }: IProps<T>) => {
  const {
    field: { onChange, value, ...field },
  } = useController({
    name,
  });
  return (
    <div>
      <label>fff:</label>
      <Input id={name} onChange={onChange} {...rest} {...field} />
    </div>
  );
};
