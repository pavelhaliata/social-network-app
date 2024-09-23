import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://social-network.samuraijs.com/api/1.0',
    credentials: "include",
    headers: { "API-KEY": import.meta.env.VITE_API_KEY },
  }),
  endpoints: () => ({}),
  tagTypes: ["authMe", "users", "follow", "selfProfile"],
});
