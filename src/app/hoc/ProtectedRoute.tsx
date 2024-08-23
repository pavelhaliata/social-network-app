import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAppSelector } from "../store";

type ProtectedRouteType = {
  redirectPath?: string;
  children: ReactNode;
};

export const ProtectedRoute = ({
  redirectPath = "/auth-login",
  children,
}: ProtectedRouteType): ReactNode => {
  const isLoggedIn = useAppSelector<boolean>((state) => state.app.isLogin);

  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};
