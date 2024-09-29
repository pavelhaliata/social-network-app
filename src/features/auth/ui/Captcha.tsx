import { ControlledTextField } from "../../../shared/components/ControlledTextField/ControlledTextField.tsx";
import { useSignInForm } from "../lib/hooks/useSignInForm.tsx";

type Props = {
  captchaUrl: string | undefined;
};

export const Captcha = ({ captchaUrl }: Props) => {
  const { control } = useSignInForm();

  if (!captchaUrl) return null;

  return (
    <div className="text-center">
      <img src={captchaUrl} alt="captcha" className="w-[140px] inline-block" />
      <ControlledTextField
        name="captcha"
        control={control}
        placeholder="Enter text from the image"
      />
    </div>
  );
};
