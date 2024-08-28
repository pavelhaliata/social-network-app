import { AppLayout } from "../widgets";
import { useAppSelector } from "./store";
import { useAuthMeQuery } from "../features/auth/model/api/authApi.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "./hoc/ProtectedRoute.tsx";
import { SelfProfilePage } from "../pages/selfProfilePage";
import { UsersPage } from "../pages/usersPage";
import { UserProfile } from "../entities/users";
import { SightInPage } from "../pages/auth";
import { Loader } from "../shared/components";

function App() {
  const isInitialized = useAppSelector((state) => state.app.initialized);
  const { data } = useAuthMeQuery();
  console.log("isAuthenticated: ", data);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      ),
      errorElement: (
        <div className="h-screen flex items-center justify-center">
          <span className="text-dark-300 text-3xl font-bold">
            404 ooops! page not found...
          </span>
        </div>
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
          path: "users/*",
          element: (
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "users/:id",
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
}

export default App;
