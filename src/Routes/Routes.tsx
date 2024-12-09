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
import ProductManagement from "../Pages/DashboardPages/VendorPages/ProductManagement/ProductManagement";
import ManageOrder from "../Pages/DashboardPages/VendorPages/ManageOrder/ManageOrder";
import OrderHistory from "../Pages/DashboardPages/VendorPages/OrderHistory/OrderHistory";
import CustomerReviews from "../Pages/DashboardPages/VendorPages/CustomerReviews/CustomerReviews";
import Shops from "../Pages/DashboardPages/AdminPages/Shops/Shops";
import BecomeSeller from "../Pages/DashboardPages/CustomerPages/BecomeSeller/BecomeSeller";
import CompareProducts from "../Pages/DashboardPages/CustomerPages/CompareProducts/CompareProducts";
import CustomerRequests from "../Pages/DashboardPages/AdminPages/CustomerRequests/CustomerRequests";
import Profile from "../Pages/DashboardPages/CustomerPages/Profile/Profile";



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
      },{
        path: "/profile",
        element: <Profile />,
      }
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
      },
      {
        path: "/dashboard/customer/be-a-vendor",
        element: <BecomeSeller/>
      },
      {
        path: "/dashboard/customer/compare",
        element: <CompareProducts/>
      },
      {
        path: "/dashboard/customer/profile",
        element: <Profile />,
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
      {
        path: "/dashboard/vendor/manage-product",
        element: <ProductManagement/>
      },
      {
        path: "/dashboard/vendor/manage-order",
        element: <ManageOrder/>
      },
      {
        path: "/dashboard/vendor/order-history",
        element: <OrderHistory/>
      },
      {
        path: "/dashboard/vendor/customer-review",
        element: <CustomerReviews/>
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
        path: "/dashboard/admin/all-shops",
        element: <Shops/>
      },
      {
        path: "/dashboard/admin/become-vendor-requests",
        element: <CustomerRequests/>
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
    errorElement: <NotFound/>,
  },
  {
    path: "/signup",
    element: <Register />,
    errorElement: <NotFound/>,
  },
],);

export default router;
