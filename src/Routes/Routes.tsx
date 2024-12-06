import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/MainPages/Home/Home";
import Dashboard from "../Layout/Dashboard";
import SuspenseWrapper from "../Utils/SuspenseWrapper";
import Login from "../Pages/AuthenticationPages/Login/Login";
import Register from "../Pages/AuthenticationPages/Register/Register";
import ProductDetails from "../Pages/MainPages/ProductDetails/ProductDetails";
import Products from "../Pages/MainPages/Products/Products";
// import App from "../App";

// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    // element: <App />,
    element: <SuspenseWrapper />,
    errorElement: <div>404 - Page Not Found</div>,
    children: [
      {
       path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
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
],);

export default router;