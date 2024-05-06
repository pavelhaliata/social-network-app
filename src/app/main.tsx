import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "./store/store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Users } from "../features/users/ui/Users.tsx";
import { UserProfile } from "../entities/userProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div style={{ color: "red" }}>some error</div>,
    children: [
      {
        path: "users/*",
        element: <Users />,
      },
      {
        path: "users/:id",
        element: <UserProfile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
