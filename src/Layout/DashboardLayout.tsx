import { Outlet } from "react-router-dom";
import DashboardSidebar from "../Components/DashboardSidebar";
import { Avatar, Button } from "antd";
import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
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

          <div className="flex justify-between items-center gap-2">
            <Avatar size="large" icon={<UserOutlined />} />
          </div>
        </div>
        <hr />
        {/* main content */}
        <div className="h-[calc(100vh-64px)] overflow-y-auto">
          <div className="bg-neutral-100 h-full  p-5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;