import { Controller, useForm } from "react-hook-form";
import { Form, Input } from "antd";

export const EditSelfProfile = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    setError,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      lookingForAJobDescription: "",
    },
  });

  return (
    <div className="flex">
      <div className="w-1/2 ml-auto">
        <Form>
          <span>Edit full name:</span>
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
