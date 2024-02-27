import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query/react";
import { getUsersApi } from "../../features/users/service/usersApi.ts";
import { baseApi } from "../../shared/api";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: getUsersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);
