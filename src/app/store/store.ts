import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { getUsersApi } from "../../features/users/service/usersApi.ts";
import { baseApi } from "../../shared/api";
import { appReducer } from "../model/appSlice.ts";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "./types.ts";
import { authReducer } from "../../features/auth/model/slices/authSlice.ts";
import { selfProfileReducer } from "../../entities/users/model/slices/selfProfileSlice.ts";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    profile: selfProfileReducer,
    [baseApi.reducerPath]: getUsersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
