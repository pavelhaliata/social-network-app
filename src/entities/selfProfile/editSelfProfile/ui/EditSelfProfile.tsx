import { Controller, useForm } from "react-hook-form";
import { Avatar, Button, Form, Input, Tooltip } from "antd";
import { useUserProfileData } from "../../lib/hooks/useUserProfileData.ts";
import { ChangeEvent, useEffect } from "react";
import { useEditProfileMutation } from "../../service/editSelfProfileApi.ts";
import { UserOutlined } from "@ant-design/icons";

export const EditSelfProfile = () => {
  const { userProfile, userStatus, isLoading } = useUserProfileData();
  const [editUserProfile] = useEditProfileMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    setError,
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

  const onSubmit = async (data: any) => {
    try {
      await editUserProfile({ userId: userProfile?.userId, ...data }).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  const uploadPhotoProfileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      console.log(event.target.files[0]);
    }
  };

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
    <div className="flex gap-x-4 ">
      <div className="text-center cursor-pointer border">
        <Tooltip title="Click to change profile photo" placement="bottom">
          {userProfile?.photos.large ? (
            <img
              src={userProfile.photos.large}
              alt="user logo"
              width={190}
              height={190}
              className="max-w-[200px] w-full object-cover rounded-lg inline"
            />
          ) : (
            <Avatar shape="square" size={164} icon={<UserOutlined />} />
          )}
        </Tooltip>
        <input
          className=" "
          type="file"
          accept="image*/,.png,.jpeg"
          onChange={uploadPhotoProfileHandler}
        />
      </div>
      <div className="w-3/4 ml-auto">
        <Form onSubmitCapture={handleSubmit(onSubmit)}>
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
    </div>
  );
};
