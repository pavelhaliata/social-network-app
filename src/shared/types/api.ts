export enum ResponseStatus {
  Success = 0,
  BadRequest = 1,
  TooManyAttempts = 10,
}

export type ResponseSchema<T = {}> = {
  data: T;
  messages: string[];
  resultCode: number;
};
