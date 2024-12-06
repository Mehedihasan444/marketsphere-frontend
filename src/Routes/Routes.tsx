import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/MainPages/Home/Home";
import Dashboard from "../Layout/Dashboard";
import SuspenseWrapper from "../Utils/SuspenseWrapper";
import Login from "../Pages/AuthenticationPages/Login/Login";
import Register from "../Pages/AuthenticationPages/Register/Register";

// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <div>404 - Page Not Found</div>,
    element: <SuspenseWrapper />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/dashboard",
    errorElement: <div>404 - Page Not Found</div>,
    element: <Dashboard />,
    children: [],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <div>404-Page Not Found</div>,
  },
  {
    path: "/signup",
    element: <Register />,
    errorElement: <div>404-Page Not Found</div>,
  },
]);

export default router;
