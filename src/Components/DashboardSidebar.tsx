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
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
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
  { key: "15", icon: <LogoutOutlined />, label: "Logout" },
];

const DashboardSidebar: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
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
