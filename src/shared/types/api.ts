export enum ResponseStatus {
  Success = 0,
  BadRequest = 1,
}

export type ResponseSchema<T = {}> = {
  data: T;
  messages: string[];
  resultCode: number;
};
