export type LoginData = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: null | string;
};
export type AuthUserData = {
  id: number;
  email: string;
  login: string;
};
