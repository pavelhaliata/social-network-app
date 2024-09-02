import { AppLayout } from "../widgets";
import { useAppSelector } from "./store";
import { useAuthMeQuery } from "../features/auth/model/api/authApi.ts";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ProtectedRoute } from "./hoc/ProtectedRoute.tsx";
import { SelfProfilePage } from "../pages/selfProfilePage";
import { UsersPage } from "../pages/usersPage";
import { UserProfile } from "../entities/users";
import { SightInPage } from "../pages/auth";
import { Loader } from "../shared/components";
import { PageError } from "../shared/components/PageError/PageError.tsx";

export const App = () => {
  const isInitialized = useAppSelector((state) => state.app.initialized);
  const { data } = useAuthMeQuery();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/self-profile" replace />,
      errorElement: <PageError />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "self-profile/*",
          element: (
            <ProtectedRoute>
              <SelfProfilePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/edit-profile",
          element: (
            <ProtectedRoute>
              <div>edit profile</div>
            </ProtectedRoute>
          ),
        },
        {
          path: "users/*",
          element: (
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "users/:id/*",
          element: (
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          ),
        },
        {
          path: "chat",
          element: <div>chat page</div>,
        },
      ],
    },
    {
      path: "auth-login",
      element: <SightInPage />,
    },
  ]);

  if (!isInitialized) {
    return <Loader />;
  }

  return <RouterProvider router={router} />;
};
