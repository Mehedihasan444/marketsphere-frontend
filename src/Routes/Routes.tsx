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
import CustomerReviews from "../Pages/DashboardPages/VendorPages/CustomerReviews/CustomerReviews";
import Shops from "../Pages/DashboardPages/AdminPages/Shops/Shops";
import BecomeSeller from "../Pages/DashboardPages/CustomerPages/BecomeSeller/BecomeSeller";
import CompareProducts from "../Pages/MainPages/CompareProducts/CompareProducts";
import CustomerRequests from "../Pages/DashboardPages/AdminPages/CustomerRequests/CustomerRequests";
import Profile from "../Pages/DashboardPages/CustomerPages/Profile/Profile";
import FollowedShops from "../Pages/DashboardPages/CustomerPages/FollowedShops/FollowedShops";
import AdminHome from "../Pages/DashboardPages/AdminPages/AdminHome/AdminHome";
import ProtectedRoute from "./ProtectedRole";
import Checkout from "../Pages/MainPages/Checkout/Checkout";
import CancelledOrders from "../Pages/DashboardPages/CustomerPages/CancelledOrders/CancelledOrders";
import AdminOrders from "../Pages/DashboardPages/AdminPages/OrdersManagement/AdminOrders";
import AdminOrderHistory from "../Pages/DashboardPages/AdminPages/OrdersManagement/AdminOrderHistory";
import Orders from "../Pages/DashboardPages/CustomerPages/OrderManagement/Orders/Orders";
import CustomerOrderHistory from "../Pages/DashboardPages/CustomerPages/OrderManagement/OrderHistory/CustomerOrderHistory";
import ConfirmedOrders from "../Pages/DashboardPages/VendorPages/OrderManagement/ManageOrder/ConfirmedOrders";
import ShiftedOrders from "../Pages/DashboardPages/VendorPages/OrderManagement/ManageOrder/ShiftedOrders";
import ManageOrder from "../Pages/DashboardPages/VendorPages/OrderManagement/ManageOrder/ManageOrder";
import OrderHistory from "../Pages/DashboardPages/VendorPages/OrderManagement/OrderHistory/OrderHistory";
import LeaveReviews from "../Pages/DashboardPages/CustomerPages/LeaveReviews/LeaveReviews";
import ForgetPassword from "../Pages/AuthenticationPages/ForgetPassword/ForgetPassword";
import ResetPassword from "../Pages/AuthenticationPages/ResetPassword/ResetPassword";
import CouponManagement from "../Pages/DashboardPages/VendorPages/CouponManagement/CouponManagement";
import RecentViewProducts from "../Pages/DashboardPages/CustomerPages/RecentViewProducts/RecentViewProducts";

// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <SuspenseWrapper />,
    errorElement: <NotFound />,
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
        path: "/shops/:id",
        element: <Shop />,
      },
   
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/compare-products/:id",
        element: <CompareProducts />,
      },
      {
        path: "/compare-products",
        element: <CompareProducts />,
      },
      {
        path: "/checkout",
        element: <ProtectedRoute role="CUSTOMER"><Checkout /></ProtectedRoute> ,
      }
    ],
  },
  {
    path: "/dashboard/customer",
    errorElement: <NotFound />,
    element: (
      <ProtectedRoute role="CUSTOMER">
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard/customer/home",
        element: <CustomerHome />,
      },
      {
        path: "/dashboard/customer/orders",
        element: <Orders />,
      },
      {
        path: "/dashboard/customer/order-history",
        element: <CustomerOrderHistory />,
      },
      {
        path: "/dashboard/customer/cancelled-orders",
        element: <CancelledOrders />,
      },
      {
        path: "/dashboard/customer/be-a-vendor",
        element: <BecomeSeller />,
      },

      {
        path: "/dashboard/customer/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/customer/followed-shops",
        element: <FollowedShops />,
      },{
        path: "/dashboard/customer/leave-reviews",
        element: <LeaveReviews />,
      },
      {
        path: "/dashboard/customer/recent-products",
        element: <RecentViewProducts />,
      },
    ],
  },
  {
    path: "/dashboard/vendor",
    errorElement: <NotFound />,
    element: (
      <ProtectedRoute role="VENDOR">
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard/vendor/home",
        element: <VendorHome />,
      },
      {
        path: "/dashboard/vendor/manage-shop",
        element: <ManageShop />,
      },
      {
        path: "/dashboard/vendor/manage-product",
        element: <ProductManagement />,
      },
      {
        path: "/dashboard/vendor/confirmed-order",
        element: <ConfirmedOrders />,
      },
      {
        path: "/dashboard/vendor/shifted-order",
        element: <ShiftedOrders />,
      },
      {
        path: "/dashboard/vendor/orders",
        element: <ManageOrder />,
      },
      {
        path: "/dashboard/vendor/order-history",
        element: <OrderHistory />,
      },
      {
        path: "/dashboard/vendor/customer-review",
        element: <CustomerReviews />,
      },
      {
        path: "/dashboard/vendor/manage-coupon",
        element: <CouponManagement />,
      }
    ],
  },
  {
    path: "/dashboard/admin",
    errorElement: <NotFound />,
    element: (
      <ProtectedRoute role="ADMIN">
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard/admin/home",
        element: <AdminHome />,
      },
      {
        path: "/dashboard/admin/user-management",
        element: <UserManagement />,
      },
      {
        path: "/dashboard/admin/vendor-management",
        element: <VendorManagement />,
      },
      {
        path: "/dashboard/admin/category-management",
        element: <CategoryManagement />,
      },
      {
        path: "/dashboard/admin/monitor-transactions",
        element: <MonitorTransactions />,
      },
      {
        path: "/dashboard/admin/review-activities",
        element: <ReviewActivities />,
      },
      {
        path: "/dashboard/admin/all-shops",
        element: <Shops />,
      },
      {
        path: "/dashboard/admin/become-vendor-requests",
        element: <CustomerRequests />,
      },
      {
        path: "/dashboard/admin/blacklist-shop",
        element: <BlacklistShop />,
      },
      {
        path: "/dashboard/admin/orders",
        element: <AdminOrders />,
      },
      {
        path: "/dashboard/admin/order-history",
        element: <AdminOrderHistory />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/signup",
    element: <Register />,
    errorElement: <NotFound />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
    errorElement: <NotFound />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
    errorElement: <NotFound />,
  },
]);

export default router;
