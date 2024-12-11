import { Avatar, Dropdown, Input, MenuProps, Space } from "antd";

import Cart from "../../../Pages/MainPages/Cart/Cart";
import Wishlist from "../../Wishlist";
import { Link } from "react-router-dom";
import {
  DownOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import { logout } from "../../../Redux/Features/Auth/authSlice";
const { Search } = Input;
const TopHeader = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "My Account",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: <a href="/dashboard/customer/profile">Profile</a>,
      extra: "⌘P",
    },
    {
      key: "3",
      label: "Billing",
      extra: "⌘B",
    },
    {
      key: "4",
      label: (
        <a href={`/dashboard/${user?.role.toLowerCase()}/home`}>Dashboard</a>
      ),
      icon: <SettingOutlined />,
      extra: "⌘S",
    },
    {
      key: "5",
      label: <button onClick={() => dispatch(logout())}>Logout</button>,
      icon: <LogoutOutlined />,
      extra: "⌘S",
    },
  ];

  return (
    <div className="bg-white lg:mx-16 px-4 py-5">
      <div className="grid  grid-cols-5 gap-4 justify-between items-center ">
        <Link to="/">
          <div className="col-span-1 flex items-center">
            <img
              src="/src/assets/logo.webp"
              alt="logo"
              className="w-10 rounded-full h-auto"
            />
            <h1 className="text-3xl font-bold">MarketSphere</h1>
          </div>
        </Link>
        <div className="col-span-3 flex justify-center items-center">
          <Search
            placeholder="input search text"
            enterButton="Search"
            size="large"
            loading
            className="w-2/3"
          />
        </div>
        <div className="col-span-1 flex gap-4 justify-end items-center">
          <Link to="/login">
            <div className="hover:text-blue-500 text-3xl flex justify-between items-center gap-1">
              <UserOutlined className="" />
              <div className="">
                <h4 className="text-xs">Login</h4>
                <h4 className="text-sm font-semibold">Account</h4>
              </div>
            </div>
          </Link>
          <div className="flex justify-between items-center gap-2">
            <Wishlist />
          </div>
          <div className="flex justify-between items-center gap-2">
            <Cart />
            {!user && (
              <div className="">
                <h4 className="text-xs">Your Cart</h4>
                <h4 className="text-sm font-semibold">$0.00</h4>
              </div>
            )}
          </div>
          {user && (
            <div className="flex justify-between items-center gap-2">
              <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <Avatar size="large" icon={<UserOutlined />} />
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
