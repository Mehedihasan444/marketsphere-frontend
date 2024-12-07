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
  EditOutlined,
  StarOutlined,
  WarningOutlined,
  EyeOutlined,
  DollarOutlined,
  AppstoreAddOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useAppDispatch, useAppSelector } from "../Redux/hook";
import { logout } from "../Redux/Features/Auth/authSlice";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];
const DashboardSidebar: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
const navigate = useNavigate();
  const Customers: MenuItem[] = [
    { key: "1", icon: <HomeOutlined />, label: "Home" }, // Browse Products
    { key: "2", icon: <SearchOutlined />, label: "Advanced Search" }, // Advanced Search/Filters
    { key: "3", icon: <ShoppingCartOutlined />, label: "Cart" }, // Cart (with multi-vendor logic)
    { key: "4", icon: <BarsOutlined />, label: "Compare Products" }, // Compare Products
    {
      key: "5",
      icon: <FileTextOutlined />,
      label: "Orders",
      children: [
        { key: "6", label: "Order History", icon: <HistoryOutlined /> },
        { key: "7", label: "Leave Reviews", icon: <FileTextOutlined /> },
      ],
    },
    { key: "8", icon: <HeartOutlined />, label: "Wishlist" }, // Wishlist
    {
      key: "9",
      icon: <ShopOutlined />,
      label: "Followed Shops",
    }, // Followed Vendor Shops
    { key: "10", icon: <ProfileOutlined />, label: "Recent Products" }, // Last 10 Products Viewed
    { key: "11", icon: <UserOutlined />, label: "Profile" }, // Customer Profile
    {
      key: "12",
      icon: <QuestionCircleOutlined />,
      label: "Support",
      children: [
        { key: "13", label: "Contact Us" },
        { key: "14", label: "FAQs" },
      ],
    },
    {
      key: "15",
      icon: <LogoutOutlined />,
      label: <button onClick={() => dispatch(logout())}>Logout</button>,
    },
  ];
  const Vendors: MenuItem[] = [
    {
      key: "1",
      icon: <ShopOutlined />,
      label: "Manage Shop",
    },
    {
      key: "2",
      icon: <AppstoreOutlined />,
      label: "Add Products",
    },
    {
      key: "3",
      icon: <EditOutlined />,
      label: "Edit Products",
    },
    {
      key: "4",
      icon: <HistoryOutlined />,
      label: "Order History",
    },
    {
      key: "5",
      icon: <StarOutlined />,
      label: "Customer Reviews",
    },
    {
      key: "6",
      icon: <LogoutOutlined />,
      label: <button onClick={() => dispatch(logout())}>Logout</button>,
    },
  ];
  const Admins: MenuItem[] = [
    {
      key: "1",
      icon: <TeamOutlined />,
      label: <button onClick={()=>navigate("/dashboard/admin/user-management")}>Manage Users </button>,
    },
    {
      key: "2",
      icon: <ShopOutlined />,
      label: <button onClick={()=>navigate("/dashboard/admin/vendor-management")}>Manage Vendors</button>,
    },
    {
      key: "3",
      icon: <AppstoreAddOutlined />,
      label: (
        <button onClick={()=>navigate("/dashboard/admin/category-management")}>Manage Categories</button>
      ),
    },
    {
      key: "4",
      icon: <DollarOutlined />,
      label: <button onClick={()=>navigate("/dashboard/admin/monitor-transactions")}>Monitor Transactions</button>
    },
    {
      key: "5",
      icon: <EyeOutlined />,
      label: <button onClick={()=>navigate("/dashboard/admin/review-activities")}>Review Activities</button>
    },
    {
      key: "6",
      icon: <WarningOutlined />,
      label: <button onClick={()=>navigate("/dashboard/admin/blacklist-shop")}>Blacklist Shops</button>
   
    },
    {
      key: "7",
      icon: <LogoutOutlined />,
      label: <button onClick={() => dispatch(logout())}>Logout</button>,
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
      className="h-screen "
    
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
    </div>
  );
};

export default DashboardSidebar;
