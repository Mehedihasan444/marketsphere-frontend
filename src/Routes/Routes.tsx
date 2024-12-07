import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/MainPages/Home/Home";
import SuspenseWrapper from "../Utils/SuspenseWrapper";
import Login from "../Pages/AuthenticationPages/Login/Login";
import Register from "../Pages/AuthenticationPages/Register/Register";
import ProductDetails from "../Pages/MainPages/ProductDetails/ProductDetails";
import Products from "../Pages/MainPages/Products/Products";
import NotFound from "../Components/NotFound";
import Shop from "../Pages/MainPages/Shop/Shop";
import Dashboard from "../Pages/DashboardPages/Dashboard";
import CustomerHome from "../Pages/DashboardPages/CustomerPages/CustomerHome/CustomerHome";
import UserManagement from "../Pages/DashboardPages/AdminPages/UserManagement";



// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <SuspenseWrapper />,
    errorElement: <NotFound/>,
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
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: "/dashboard/customer",
    errorElement: <NotFound/>,
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/customer/home",
        element: <CustomerHome/>
      }
    ],
  },
  {
    path: "/dashboard/vendor",
    errorElement: <NotFound/>,
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/vendor/home",
        element: <CustomerHome/>
      }
    ],
  },
  {
    path: "/dashboard/admin",
    errorElement: <NotFound/>,
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/admin/home",
        element: <CustomerHome/>
      },
      {
        path: "/dashboard/admin/user-management",
        element: <UserManagement/>
      },
    ],
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
