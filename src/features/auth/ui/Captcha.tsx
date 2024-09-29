import { ControlledTextField } from "../../../shared/components/ControlledTextField/ControlledTextField.tsx";
import { FieldValues, UseControllerProps } from "react-hook-form";

type Props<T extends FieldValues> = UseControllerProps<T> & {
  captchaUrl: string | undefined;
};

export const Captcha = <T extends FieldValues>({
  name,
  control,
  captchaUrl,
}: Props<T>) => {
  if (!captchaUrl) return null;

  return (
    <div className="text-center">
      <img src={captchaUrl} alt="captcha" className="w-[140px] inline-block" />
      <ControlledTextField
        name={name}
        control={control}
        placeholder="Enter text from the image"
      />
    </div>
  );
};
