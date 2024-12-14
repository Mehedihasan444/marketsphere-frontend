import React from "react";
import {
  HomeOutlined,
  FileTextOutlined,
  UserOutlined,
  ShopOutlined,
  HistoryOutlined,

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
import { TiCancelOutline } from "react-icons/ti";

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
      onClick: () => navigate("/dashboard/customer/home"),
      label: (
        // <button onClick={() => navigate("/dashboard/customer/home")}>
        "Dashboard"
        // </button>
      ),
    },

    {
      key: "2",
      icon: <FileTextOutlined />,
      // onClick: () => navigate("/dashboard/customer/orders"),
      label: "Orders",
      children: [
        {
          key: "13",
          onClick: () => navigate("/dashboard/customer/orders"),
          label: <button onClick={() => navigate("/dashboard/customer/orders")}>Orders</button>,
          icon: <FileTextOutlined />
        },
        {
          key: "14",
          onClick: () => navigate("/dashboard/customer/order-history"),
          label: <button onClick={() => navigate("/dashboard/customer/order-history")}>Order History</button>, icon: <HistoryOutlined />
        },

        {
          key: "4",
          onClick: () => navigate("/dashboard/customer/leave-reviews"),
          label: "Leave Reviews", icon: <FileTextOutlined />
        },
        {
          key: "3",
          onClick: () => navigate("/dashboard/customer/cancelled-orders"),
          label: <button onClick={() => navigate("/dashboard/customer/cancelled-orders")}>Cancelled Orders </button>, icon: <TiCancelOutline />
        },
      ],
    },
    {
      key: "5",
      icon: <ShopOutlined />,
      onClick: () => navigate("/dashboard/customer/followed-shops"),
      label: (
        <button onClick={() => navigate("/dashboard/customer/followed-shops")}>
          Followed Shops
        </button>
      ),
    }, // Followed Vendor Shops
    {
      key: "6",
      onClick: () => navigate("/dashboard/customer/recent-products"),
      icon: <ProfileOutlined />, label: "Recent Products"
    }, // Last 10 Products Viewed
    {
      key: "7",
      onClick: () => navigate("/dashboard/customer/profile"),
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
      onClick: () => navigate("/dashboard/customer/be-a-vendor"),
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
        {
          key: "10",
          onClick: () => navigate("/dashboard/customer/contact-us"),
          label: "Contact Us"
        },
        {
          key: "11",
          onClick: () => navigate("/dashboard/customer/faqs"),
          label: "FAQs"
        },
      ],
    },
    {
      key: "12",
      icon: <LogoutOutlined />,
      onClick: () => handleLogout(),
      label: <button onClick={() => handleLogout()}>Logout</button>,
    },
  ];
  const Vendors: MenuItem[] = [
    {
      key: "1",
      icon: <HomeOutlined />,
      onClick: () => navigate("/dashboard/vendor/home"),
      label: (
        <button onClick={() => navigate("/dashboard/vendor/home")}>
          Dashboard
        </button>
      ),
    },
    {
      key: "2",
      icon: <ShopOutlined />,
      onClick: () => navigate("/dashboard/vendor/manage-shop"),
      label: (
        <button onClick={() => navigate("/dashboard/vendor/manage-shop")}>
          Manage Shop
        </button>
      ),
    },
    {
      key: "3",
      icon: <AppstoreOutlined />,
      onClick: () => navigate("/dashboard/vendor/manage-product"),
      label: (
        <button onClick={() => navigate("/dashboard/vendor/manage-product")}>
          Manage Product{" "}
        </button>
      ),
    },
    {
      key: "4",
      icon: <BoxPlotFilled />,
      label:
        "Manage Order"

      ,
      children: [
        {
          key: "17",
          onClick: () => navigate("/dashboard/vendor/orders"),
          label: (
            <button onClick={() => navigate("/dashboard/vendor/orders")}>
              Orders
            </button>
          ),
        },
        {
          key: "15",
          onClick: () => navigate("/dashboard/vendor/confirmed-order"),
          label: (
            <button onClick={() => navigate("/dashboard/vendor/confirmed-order")}>
              Confirmed Orders
            </button>
          ),
        },
        {
          key: "16",
          onClick: () => navigate("/dashboard/vendor/shifted-order"),
          label: (
            <button onClick={() => navigate("/dashboard/vendor/shifted-order")}>
              Shifted Orders
            </button>
          ),
        },
      ]
    },
    {
      key: "5",
      icon: <HistoryOutlined />,
      onClick: () => navigate("/dashboard/vendor/order-history"),
      label: (
        <button onClick={() => navigate("/dashboard/vendor/order-history")}>
          Order History
        </button>
      ),
    },
    {
      key: "6",
      icon: <StarOutlined />,
      onClick: () => navigate("/dashboard/vendor/customer-review"),
      label: (
        <button onClick={() => navigate("/dashboard/vendor/customer-review")}>
          Customer Reviews
        </button>
      ),
    },
    {
      key: "7",
      icon: <LogoutOutlined />,
      onClick: () => handleLogout(),
      label: <button onClick={() => handleLogout()}>Logout</button>,
    },
  ];
  const Admins: MenuItem[] = [
    {
      key: "1",
      icon: <HomeOutlined />,
      onClick: () => navigate("/dashboard/admin/home"),
      label: (
        <button onClick={() => navigate("/dashboard/admin/home")}>
          Dashboard
        </button>
      ),
    },
    {
      key: "2",
      icon: <TeamOutlined />,
      onClick: () => navigate("/dashboard/admin/user-management"),
      label: (
        <button onClick={() => navigate("/dashboard/admin/user-management")}>
          Manage Users{" "}
        </button>
      ),
    },
    {
      key: "3",
      icon: <ShopOutlined />,
      onClick: () => navigate("/dashboard/admin/vendor-management"),
      label: (
        <button onClick={() => navigate("/dashboard/admin/vendor-management")}>
          Manage Vendors
        </button>
      ),
    }, {
      key: "11",
      icon: <FileTextOutlined />,
      label: "Orders",
      children: [
        {
          key: "13",
          onClick: () => navigate("/dashboard/admin/orders"),
          label: <button onClick={() => navigate("/dashboard/admin/orders")}>Orders</button>, icon: <FileTextOutlined />
        },
        {
          key: "14",
          onClick: () => navigate("/dashboard/admin/order-history"),
          label: <button onClick={() => navigate("/dashboard/admin/order-history")}>Order History</button>, icon: <HistoryOutlined />
        },
      ],
    },
    {
      key: "4",
      icon: <AppstoreAddOutlined />,
      onClick: () => navigate("/dashboard/admin/category-management"),
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
      onClick: () => navigate("/dashboard/admin/monitor-transactions"),
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
      onClick: () => navigate("/dashboard/admin/review-activities"),
      label: (
        <button onClick={() => navigate("/dashboard/admin/review-activities")}>
          Review Activities
        </button>
      ),
    },
    {
      key: "7",
      icon: <ShopFilled />,
      onClick: () => navigate("/dashboard/admin/all-shops"),
      label: (
        <button onClick={() => navigate("/dashboard/admin/all-shops")}>
          Shops
        </button>
      ),
    },
    {
      key: "8",
      icon: <WarningOutlined />,
      onClick: () => navigate("/dashboard/admin/blacklist-shop"),
      label: (
        <button onClick={() => navigate("/dashboard/admin/blacklist-shop")}>
          Blacklist Shops
        </button>
      ),
    },
    {
      key: "9",
      icon: <MdRequestPage />,
      onClick: () => navigate("/dashboard/admin/become-vendor-requests"),
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
      onClick: () => handleLogout(),
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
