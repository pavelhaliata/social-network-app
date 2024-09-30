export type LoginData = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: string | null;
};
export type AuthUserData = {
  id: number;
  email: string;
  login: string;
};
