import { useAppSelector } from "./store";
import { useAuthMeQuery } from "../features/auth/model/api/authApi.ts";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { AppLayout } from "../widgets";
import { Loader, PageError } from "../shared/components";
import { ProtectedRoute } from "./hoc/ProtectedRoute.tsx";
import { SelfProfilePage } from "../pages/selfProfile";
import { UsersPage } from "../pages/users";
import { SightInPage } from "../pages/auth";
import { UserProfilePage } from "../pages/userProfile";
import { EditSelfProfilePage } from "../pages/editSelfProfile";

export const App = () => {
  const isInitialized = useAppSelector((state) => state.app.initialized);
  useAuthMeQuery();

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
          path: "self-profile",
          element: (
            <ProtectedRoute>
              <SelfProfilePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "edit-profile",
          element: (
            <ProtectedRoute>
              <EditSelfProfilePage />
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
              <UserProfilePage />
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
