import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { getUsersApi } from "../../features/users/service/usersApi.ts";
import { baseApi } from "../../shared/api";
import { appReducer } from "../model/appSlice.ts";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "./types.ts";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: getUsersApi.reducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
