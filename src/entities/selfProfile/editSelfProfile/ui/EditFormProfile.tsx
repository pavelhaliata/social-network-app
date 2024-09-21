import { Button, Form, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { UserProfile } from "../../../users/model/types/userProfileType.ts";

type Props = {
  userProfile?: UserProfile;
  onSubmitProfile: (data: any) => void;
};

export const EditFormProfile = ({ userProfile, onSubmitProfile }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      aboutMe: "",
      lookingForAJobDescription: "",
      contacts: {
        facebook: "",
        instagram: "",
        twitter: "",
        vk: "",
        youtube: "",
        github: "",
        mainLink: "",
        website: "",
      },
    },
  });

  useEffect(() => {
    if (userProfile) {
      reset({
        fullName: userProfile.fullName,
        aboutMe: userProfile.aboutMe,
        lookingForAJobDescription: userProfile.lookingForAJobDescription,
        contacts: {
          github: userProfile.contacts.github,
          facebook: userProfile.contacts.facebook,
          instagram: userProfile.contacts.instagram,
          twitter: userProfile.contacts.twitter,
          vk: userProfile.contacts.vk,
          youtube: userProfile.contacts.youtube,
          website: userProfile.contacts.website,
          mainLink: userProfile.contacts.mainLink,
        },
      });
    }
  }, [userProfile, reset]);
  return (
    <div>
      <Form onSubmitCapture={handleSubmit(onSubmitProfile)}>
        <span className="block text-end text-xl">Profile</span>
        <label htmlFor="fullName">My name:</label>
        <Controller
          name="fullName"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Required field",
            },
          }}
          render={({ field }) => (
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your Full Name"
              {...field}
              className=""
            />
          )}
        />
        <span className="text-danger-500 text-sm font-medium mb-4">
          {errors.fullName && <p>{errors.fullName.message}</p>}
        </span>
        <label>About me:</label>
        <Controller
          name="aboutMe"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="Enter your Full Name"
              {...field}
              className="mb-4"
            />
          )}
        />
        <label>My skills:</label>
        <Controller
          name="lookingForAJobDescription"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="Enter your Full Name"
              {...field}
              className="mb-4"
            />
          )}
        />
        <span className="block text-end text-xl">Social Contacts</span>
        <label>GitHub link profile:</label>
        <Controller
          name="contacts.github"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="Enter your github link profile"
              {...field}
              className="mb-4"
            />
          )}
        />
        <label>Facebook link profile:</label>
        <Controller
          name="contacts.facebook"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="Enter your facebook link profile"
              {...field}
              className="mb-4"
            />
          )}
        />
        <label>Instagram link profile:</label>
        <Controller
          name="contacts.instagram"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="Enter your instagram link profile"
              {...field}
              className="mb-4"
            />
          )}
        />
        <label>Twitter link profile:</label>
        <Controller
          name="contacts.twitter"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="Enter your twitter linl profile"
              {...field}
              className="mb-4"
            />
          )}
        />
        <label>VK link profile:</label>
        <Controller
          name="contacts.vk"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="Enter your VK link profile"
              {...field}
              className="mb-4"
            />
          )}
        />
        <label>Youtube link profile:</label>
        <Controller
          name="contacts.youtube"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="Enter your Youtube link profile"
              {...field}
              className="mb-4"
            />
          )}
        />
        <label>WEB Site link:</label>
        <Controller
          name="contacts.website"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="Enter your website link"
              {...field}
              className="mb-4"
            />
          )}
        />
        <label>Main link:</label>
        <Controller
          name="contacts.mainLink"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="Enter your Main link"
              {...field}
              className="mb-4"
            />
          )}
        />
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
