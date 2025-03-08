import { Avatar, Button, Dropdown, Input, MenuProps, Rate, Space, Spin } from "antd";

import Cart from "../../../Pages/MainPages/Cart/Cart";
import Wishlist from "../../Wishlist";
import { Link, useNavigate } from "react-router-dom";
import {
  DownOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import { logout } from "../../../Redux/Features/Auth/authSlice";
import { useGetMyProfileQuery } from "../../../Redux/Features/User/userApi";
import { useState } from "react";
import { useGetProductsQuery } from "../../../Redux/Features/Product/productApi";
import { TProduct } from "../../../Interface";
import { Bell, Percent, Search, User } from "lucide-react";
// const { Search } = Input;


const TopHeader = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data = {} } = useGetMyProfileQuery("")
  const profileData = data.data || {}

  const { data: productsData = {}, isLoading, } = useGetProductsQuery({ searchTerm }, { skip: !searchTerm });
  const { data: products } = productsData?.data || {};

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div>
        <strong>My Account</strong>
        <p>{user?.email}</p>
      </div>,
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: <a href="/dashboard/customer/profile">Profile</a>,
      extra: "⌘P",
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
      onClick: () => dispatch(logout()),
      label: <button onClick={() => dispatch(logout())}>Logout</button>,
      icon: <LogoutOutlined />,
      extra: "⌘S",
    },
  ];

  return (
    <section className="">

      {/* Header with animated gradient */}
      <header className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white py-2 bg-[length:200%_100%] animate-gradient">
        <div className="container mx-auto px-4 flex justify-center items-center text-sm">
          <Percent size={16} className="mr-2 animate-bounce" />
          <p>Special offer: Free shipping on orders over $50!</p>
        </div>
      </header>
      {/*  */}
      <div className="bg-white px-4 py-5 lg:px-16">
        <div className="grid  grid-cols-5 gap-4 justify-between items-center ">
          <Link to="/">
            <div className="col-span-1 flex items-center">
              {/* <img
              src="https://i.ibb.co.com/wKZbrTj/logo.webp"
              alt="logo"
              className="w-10 rounded-full h-auto"
            /> */}
         <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                MarketSphere
              </h1>
            </div>
          </Link>
          {/* search bar */}
          <div className="col-span-3 flex justify-center items-center relative ">
            {/* <Search
          type="search"
          value={searchTerm}
            placeholder="input search text"
            enterButton="Search"
            size="large"
            loading={isLoading}
            className="w-2/3 h-10  hidden sm:flex "
          
            onChange={(e) => setSearchTerm(e.target.value)}
          /> */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-all duration-300 group-hover:border-blue-400"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {
                  isLoading ? <div className="absolute inset-0 bg-gray-100 opacity-50 rounded-lg">
                    <Spin size="small" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div> :
                    <Search className={`absolute right-3 top-2.5 text-gray-400 group-hover:text-blue-600 transition-colors duration-300 `} size={20} />
                }
              </div>
            </div>
            {products && searchTerm && <div className="absolute space-y-1 top-12 bg-neutral-100 rounded-md z-50 p-3 w-2/3 shadow ">
              {
                products?.slice(0, 4)?.map((product: TProduct) => <div onClick={() => { navigate(`/products/${product.id}`); setSearchTerm(""); }} className="cursor-pointer rounded-lg hover:shadow-lg flex gap-3 justify-between border p-4 bg-white">
                  <div className="">
                    <img src={product?.images[0]} alt={product.name} className="w-20 h-auto " />
                  </div>
                  <div className="flex-1 space-y-1">

                    <h4 className=" font-semibold text-xs text-gray-500">{product.category.name}</h4>
                    <h4 className=" font-semibold text-base">{product.name}</h4>
                    <Rate value={product.rating} disabled className="text-sm" />
                    <h4 className="font-semibold text-sm text-blue-500">${product.price}</h4>

                  </div>
                </div>)
              }
              <div className="py-2">
                <Button size="large" variant="solid" className="w-full " onClick={() => { navigate(`/products?searchTerm=${searchTerm}`); setSearchTerm(""); }}>See All</Button>
              </div>
            </div>}
          </div>
          {/*  */}
          {/* <div className="col-span-1 flex gap-4 justify-end items-center">
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
                <Dropdown menu={{ items }} trigger={["click"]}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <Avatar size="large" icon={<img src={profileData?.profilePhoto} alt={profileData?.name} />} />
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </div>
            )}
          </div> */}
          <div className="flex items-center space-x-6">
            <Wishlist />
            <button className="text-gray-600 hover:text-blue-600 transition-transform duration-300 hover:scale-110">
              <Bell size={24} />
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition-transform duration-300 hover:scale-110" onClick={() => navigate("/login")}>
              <User size={24} />
            </button>
            <Cart />

            {user && (
              <div className="flex justify-between items-center gap-2">
                <Dropdown menu={{ items }} trigger={["click"]}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <Avatar size="large" icon={<img src={profileData?.profilePhoto} alt={profileData?.name} />} />
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>

  );
};

export default TopHeader;
