import { Outlet } from "react-router-dom";
import DashboardSidebar from "../Components/DashboardSidebar";
import { Avatar, Button } from "antd";
import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useGetMyProfileQuery } from "../Redux/Features/User/userApi";
import { useAppSelector } from "../Redux/hook";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  // Get user from auth state (always available after login)
  const authUser = useAppSelector((state) => state.auth.user);
  
  // Fetch full profile (with profilePhoto) - will refetch when user changes
  const { data = {}, isLoading } = useGetMyProfileQuery(undefined, {
    skip: !authUser, // Skip if no authenticated user
    refetchOnMountOrArgChange: true, // Refetch when component mounts
  });
  
  const profileData = data.data || {};
  
  // Use profile data if available, otherwise fall back to auth user
  const user = {
    name: profileData.name || authUser?.name || "",
    email: profileData.email || authUser?.email || "",
    role: profileData.role || authUser?.role || "",
    profilePhoto: profileData.profilePhoto || "https://cdn-icons-png.flaticon.com/512/3607/3607444.png",
  };


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
            <div className="">
              <strong className="text-xs">Login as </strong>
              <p className="text-sm">{isLoading ? "Loading..." : user?.email}</p>
            </div>
            <Avatar 
              size="large" 
              src={user.profilePhoto}
              alt={user.name}
            />
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
