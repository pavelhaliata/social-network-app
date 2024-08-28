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
  const isAuthenticated = useAppSelector<boolean>(
    (state) => state.auth.isAuthenticated,
  );

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};
