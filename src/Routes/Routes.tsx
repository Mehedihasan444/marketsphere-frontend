import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/MainPages/Home/Home";
import Dashboard from "../Layout/Dashboard";
import SuspenseWrapper from "../Utils/SuspenseWrapper";

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
]);

export default router;
