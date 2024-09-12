import { Controller, useForm } from "react-hook-form";
import { Avatar, Button, Dropdown, Form, Input, MenuProps, Modal } from "antd";
import { useUserProfileData } from "../../lib/hooks/useUserProfileData.ts";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  useEditPhotoProfileMutation,
  useEditProfileMutation,
} from "../../service/editSelfProfileApi.ts";
import { DeleteTwoTone, EditTwoTone, UserOutlined } from "@ant-design/icons";

export const EditSelfProfile = () => {
  const { userProfile, userStatus, isLoading } = useUserProfileData();
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [file, setFile] = useState<File | Blob | string>("");
  const [editUserProfile] = useEditProfileMutation();
  const [editPhotoProfile, { isLoading: isLoadingPhoto }] =
    useEditPhotoProfileMutation();

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

  const onSubmitPhotoFile = async () => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await editPhotoProfile(formData).unwrap();
      if (response.resultCode === 0) {
        setOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const uploadPhotoProfileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setFile(event.target.files[0]);
      setProfilePhotoUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleImageClick = () => {
    inputFileRef.current?.click();
  };

  const showModal = () => {
    setProfilePhotoUrl("");
    setOpen(true);
  };

  const handleOk = () => {
    handleImageClick();
    // setConfirmLoading(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <>
          <div onClick={showModal}>
            <EditTwoTone /> <span>Change profile photo</span>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <div onClick={() => {}}>
          <DeleteTwoTone /> <span>Delete profile photo</span>
        </div>
      ),
    },
  ];

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
    <div className="flex gap-x-4 items-start">
      <div className="cursor-pointer">
        <Dropdown trigger={["hover"]} menu={{ items }} placement="bottom">
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
        </Dropdown>
        <Modal
          title="Uploading a new photo"
          open={open}
          onOk={handleOk}
          okText="Select file"
          confirmLoading={isLoadingPhoto}
          onCancel={handleCancel}
        >
          {profilePhotoUrl ? (
            <div className="flex flex-col justify-center items-center gap-y-4">
              <img
                src={profilePhotoUrl}
                alt="photo profile"
                className="w-60 h-60 object-cover block"
              />
              <Button type="primary" onClick={onSubmitPhotoFile}>
                Save changes
              </Button>
            </div>
          ) : (
            <p>
              It will be easier for your friends to recognize you if you upload
              your real photo. You can upload the image in JPG, PNG format
            </p>
          )}
        </Modal>
        <input
          ref={inputFileRef}
          className="hidden"
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
