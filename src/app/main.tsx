import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProfile } from "../entities/users";
import { UsersPage } from "../pages/usersPage";
import { SelfProfilePage } from "../pages/selfProfilePage";
import { SightInPage } from "../pages/auth";
import { store } from "./store";
import { ProtectedRoute } from "./hoc/ProtectedRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>oops! some error</div>,
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
    path: "/auth-login",
    element: <SightInPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
