export type ResponseSchema<T = {}> = {
  data: T;
  messages: string[];
  resultCode: number;
};
