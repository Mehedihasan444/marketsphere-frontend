import { Avatar, Button, Dropdown, Input, MenuProps, Rate, Space } from "antd";

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
const { Search } = Input;


const TopHeader = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data = {} } = useGetMyProfileQuery("")
  const profiledata = data.data || {}

  const { data: productsData = {}, isLoading,  } = useGetProductsQuery({ searchTerm }, { skip: !searchTerm });
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
        <div className="col-span-3 flex justify-center items-center relative">
          <Search
          type="search"
          value={searchTerm}
            placeholder="input search text"
            enterButton="Search"
            size="large"
            loading={isLoading}
            className="w-2/3 h-10"
          
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {products&&searchTerm&&<div className="absolute space-y-1 top-14 bg-blue-50 rounded-md z-50 p-3 w-2/3 shadow ">
            {
              products?.slice(0, 6)?.map((product: TProduct) => <div onClick={()=>{navigate(`/products/${product.id}`); setSearchTerm(""); }} className="cursor-pointer hover:bg-neutral-100 flex gap-3 justify-between border p-4 bg-white">
                <div className="">
                  <img src={product?.images[0]} alt={product.name} className="w-20 h-auto " />
                </div>
                <div className="flex-1 space-y-1">

                  <h4 className=" font-semibold text-sm text-gray-500">{product.category.name}</h4>
                  <h4 className=" font-semibold text-xl">{product.name}</h4>
                  <Rate value={product.rating} disabled/>
                  <h4 className="font-semibold text-lg text-blue-500">${product.price}</h4>

                </div>
              </div>)
            }
            <div className="py-2">
              <Button  size="large" variant="solid" className="w-full " onClick={() => { navigate(`/products?searchTerm=${searchTerm}`); setSearchTerm(""); }}>See All</Button>
            </div>
          </div>}
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
              <Dropdown menu={{ items }} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <Avatar size="large" icon={<img src={profiledata?.profilePhoto} alt={profiledata?.name} />} />
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
