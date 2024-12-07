import { Outlet } from "react-router-dom";
import DashboardSidebar from "../Components/DashboardSidebar";
import { Avatar, Button, Input } from "antd";
import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { Search } = Input;
const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex ">
      {/* sidebar */}
      <DashboardSidebar collapsed={collapsed} />
      {/* searchbar */}
      <div className="w-full">
        <div className="flex justify-between items-center w-full h-16 pr-4">
          <div className="shadow-lg">
            {/* Toggle Button */}
            <Button
              type="primary"
              onClick={toggleCollapsed}
              className="rounded-none  "
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
          </div>
          <div className="flex justify-center items-center">
            <Search
              placeholder="input search text"
              enterButton="Search"
              size="large"
              loading
              // className="w-2/3"
            />
          </div>
          <div className="flex justify-between items-center gap-2">
            <Avatar size="large" icon={<UserOutlined />} />
          </div>
        </div>
        {/* main content */}
        <div className="bg-neutral-100 min-h-[calc(100vh-64px)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
