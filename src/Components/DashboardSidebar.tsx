import React from "react";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  HeartOutlined,
  FileTextOutlined,
  UserOutlined,
  ShopOutlined,
  HistoryOutlined,
  BarsOutlined,
  QuestionCircleOutlined,
  ProfileOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  StarOutlined,
  WarningOutlined,
  EyeOutlined,
  DollarOutlined,
  AppstoreAddOutlined,
  TeamOutlined,
  BoxPlotFilled,
  ShopFilled,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import { useAppDispatch, useAppSelector } from "../Redux/hook";
import { logout } from "../Redux/Features/Auth/authSlice";
import { useNavigate } from "react-router-dom";
import { MdRequestPage } from "react-icons/md";

type MenuItem = Required<MenuProps>["items"][number];
const DashboardSidebar: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  const Customers: MenuItem[] = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: (
        <button onClick={() => navigate("/dashboard/customer/home")}>
          Dashboard
        </button>
      ),
    },

    {
      key: "2",
      icon: <FileTextOutlined />,
      label: "Orders",
      children: [
        { key: "3", label: "Order History", icon: <HistoryOutlined /> },
        { key: "4", label: "Leave Reviews", icon: <FileTextOutlined /> },
      ],
    },
    {
      key: "5",
      icon: <ShopOutlined />,
      label: (
        <button onClick={() => navigate("/dashboard/customer/followed-shops")}>
          Followed Shops
        </button>
      ),
    }, // Followed Vendor Shops
    { key: "6", icon: <ProfileOutlined />, label: "Recent Products" }, // Last 10 Products Viewed
    {
      key: "7",
      icon: <UserOutlined />,
      label: (
        <button onClick={() => navigate("/dashboard/customer/profile")}>
          Profile
        </button>
      ),
    }, // Customer Profile

    {
      key: "8",
      icon: <LogoutOutlined />,
      label: (
        <button onClick={() => navigate("/dashboard/customer/be-a-vendor")}>
          Be A Vendor
        </button>
      ),
    },
    {
      key: "9",
      icon: <QuestionCircleOutlined />,
      label: "Support",
      children: [
        { key: "10", label: "Contact Us" },
        { key: "11", label: "FAQs" },
      ],
    },
    {
      key: "12",
      icon: <LogoutOutlined />,
      label: <button onClick={() => handleLogout()}>Logout</button>,
    },
  ];
  const Vendors: MenuItem[] = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: (
        <button onClick={() => navigate("/dashboard/vendor/home")}>
          Dashboard
        </button>
      ),
    },
    {
      key: "2",
      icon: <ShopOutlined />,
      label: (
        <button onClick={() => navigate("/dashboard/vendor/manage-shop")}>
          Manage Shop
        </button>
      ),
    },
    {
      key: "3",
      icon: <AppstoreOutlined />,
      label: (
        <button onClick={() => navigate("/dashboard/vendor/manage-product")}>
          Manage Product{" "}
        </button>
      ),
    },
    {
      key: "4",
      icon: <BoxPlotFilled />,
      label: (
        <button onClick={() => navigate("/dashboard/vendor/manage-order")}>
          Manage Order
        </button>
      ),
    },
    {
      key: "5",
      icon: <HistoryOutlined />,
      label: (
        <button onClick={() => navigate("/dashboard/vendor/order-history")}>
          {" "}
          Order History{" "}
        </button>
      ),
    },
    {
      key: "6",
      icon: <StarOutlined />,
      label: (
        <button onClick={() => navigate("/dashboard/vendor/customer-review")}>
          {" "}
          Customer Reviews
        </button>
      ),
    },
    {
      key: "7",
      icon: <LogoutOutlined />,
      label: <button onClick={() => handleLogout()}>Logout</button>,
    },
  ];
  const Admins: MenuItem[] = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: (
        <button onClick={() => navigate("/dashboard/admin/home")}>
          Dashboard
        </button>
      ),
    },
    {
      key: "2",
      icon: <TeamOutlined />,
      label: (
        <button onClick={() => navigate("/dashboard/admin/user-management")}>
          Manage Users{" "}
        </button>
      ),
    },
    {
      key: "3",
      icon: <ShopOutlined />,
      label: (
        <button onClick={() => navigate("/dashboard/admin/vendor-management")}>
          Manage Vendors
        </button>
      ),
    },
    {
      key: "4",
      icon: <AppstoreAddOutlined />,
      label: (
        <button
          onClick={() => navigate("/dashboard/admin/category-management")}
        >
          Manage Categories
        </button>
      ),
    },
    {
      key: "5",
      icon: <DollarOutlined />,
      label: (
        <button
          onClick={() => navigate("/dashboard/admin/monitor-transactions")}
        >
          Monitor Transactions
        </button>
      ),
    },
    {
      key: "6",
      icon: <EyeOutlined />,
      label: (
        <button onClick={() => navigate("/dashboard/admin/review-activities")}>
          Review Activities
        </button>
      ),
    },
    {
      key: "7",
      icon: <ShopFilled />,
      label: (
        <button onClick={() => navigate("/dashboard/admin/all-shops")}>
          Shops
        </button>
      ),
    },
    {
      key: "8",
      icon: <WarningOutlined />,
      label: (
        <button onClick={() => navigate("/dashboard/admin/blacklist-shop")}>
          Blacklist Shops
        </button>
      ),
    },
    {
      key: "9",
      icon: <MdRequestPage />,
      label: (
        <button
          onClick={() => navigate("/dashboard/admin/become-vendor-requests")}
        >
          Become Vendor Requests
        </button>
      ),
    },
    {
      key: "10",
      icon: <LogoutOutlined />,
      label: <button onClick={() => handleLogout()}>Logout</button>,
    },
  ];

  const items =
    user?.role === "CUSTOMER"
      ? Customers
      : user?.role === "VENDOR"
      ? Vendors
      : user?.role === "ADMIN"
      ? Admins
      : [];

  return (
    <div
      style={{
        width: collapsed ? "auto " : 256,
        transition: "width 0.3s ease",
      }}
      className="h-screen relative"
    >
      {/* Sidebar Menu */}
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        className="h-full pt-10"
      />

      <Button
      icon={<HomeOutlined />}
        size="large"
        type="default"
        className="w-full text-lg  rounded-none mt-auto absolute bottom-0 left-0 right-0 flex-grow"
        onClick={() => navigate("/")}
      >
        {collapsed ? " " : "Home"}
      </Button>
    </div>
  );
};

export default DashboardSidebar;
