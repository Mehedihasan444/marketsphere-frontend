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
import UserManagement from "../Pages/DashboardPages/AdminPages/UserManagement/UserManagement";
import VendorManagement from "../Pages/DashboardPages/AdminPages/VendorManagement/VendorManagement";
import CategoryManagement from "../Pages/DashboardPages/AdminPages/CategoryManagement/CategoryManagement";
import MonitorTransactions from "../Pages/DashboardPages/AdminPages/MonitorTransactions/MonitorTransactions";
import ReviewActivities from "../Pages/DashboardPages/AdminPages/ReviewActivities/ReviewActivities";
import BlacklistShop from "../Pages/DashboardPages/AdminPages/BlacklistShop/BlacklistShop";
import VendorHome from "../Pages/DashboardPages/VendorPages/VendorHome/VendorHome";
import ManageShop from "../Pages/DashboardPages/VendorPages/ManageShop/ManageShop";



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
        element: <VendorHome/>
      },
      {
        path: "/dashboard/vendor/manage-shop",
        element: <ManageShop/>
      },
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
      {
        path: "/dashboard/admin/vendor-management",
        element: <VendorManagement/>
      },
      {
        path: "/dashboard/admin/category-management",
        element: <CategoryManagement/>
      },
      {
        path: "/dashboard/admin/monitor-transactions",
        element: <MonitorTransactions/>
      },
      {
        path: "/dashboard/admin/review-activities",
        element: <ReviewActivities/>
      },
      {
        path: "/dashboard/admin/blacklist-shop",
        element: <BlacklistShop/>
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
