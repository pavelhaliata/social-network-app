import { Controller, useForm } from "react-hook-form";
import { Form, Input } from "antd";
import { useUserProfileData } from "../../lib/hooks/useUserProfileData.ts";
import { useEffect } from "react";

export const EditSelfProfile = () => {
  const { userProfile, userStatus, isLoading } = useUserProfileData();

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
    },
  });

  useEffect(() => {
    if (userProfile) {
      reset({
        fullName: userProfile.fullName,
        aboutMe: userProfile.aboutMe,
        lookingForAJobDescription: userProfile.lookingForAJobDescription,
      });
    }
  }, [userProfile, reset]);

  return (
    <div className="flex">
      <div className="w-1/2 ml-auto">
        <Form>
          <span>My name:</span>
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="Enter your Full Name"
              />
            )}
          />
          <span>About me:</span>
          <Controller
            name="aboutMe"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="Enter your Full Name"
              />
            )}
          />
          <span>My Skills:</span>
          <Controller
            name="lookingForAJobDescription"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="Enter your Full Name"
              />
            )}
          />
        </Form>
      </div>
    </div>
  );
};
