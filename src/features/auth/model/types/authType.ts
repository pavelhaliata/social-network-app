export type LoginData = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: null | string;
};