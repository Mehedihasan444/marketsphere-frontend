import { Avatar, Button, Dropdown, MenuProps, Rate, Space, Spin } from "antd";
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
import { TProduct, TCategory } from "../../../Interface";
import { Bell, Search, User } from "lucide-react";
import { LuMenu } from "react-icons/lu";
import { useGetAllCategoriesQuery } from "../../../Redux/Features/Category/categoryApi";
// const { Search } = Input;


const TopHeader = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data = {} } = useGetMyProfileQuery("")
  const profileData = data.data || {}

  const { data: productsData = {}, isLoading, } = useGetProductsQuery({ searchTerm }, { skip: !searchTerm });
  const { data: products } = productsData?.data || {};

  // Fetch categories
  const { data: categoriesData = {} } = useGetAllCategoriesQuery({ page: 1, limit: 100 });
  const categories = categoriesData?.data?.data || [];

  // Create category menu items for dropdown
  const categoryMenuItems: MenuProps["items"] = [
    {
      key: "all",
      label: <span onClick={() => { setSelectedCategory("All Categories"); navigate("/products"); }}>All Categories</span>,
    },
    ...(categories?.map((category: TCategory) => ({
      key: category.id,
      label: <span onClick={() => { setSelectedCategory(category.name); navigate(`/products?category=${category.id}`); }}>{category.name}</span>,
    })) || []),
  ];

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
        <a href={`/dashboard/${user?.role?.toLowerCase()}/home`}>Dashboard</a>
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
    <section className=" bg-blue-600 px-4 py-5 ">

      {/* Header with animated gradient */}
      {/* <header className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white py-2 bg-[length:200%_100%] animate-gradient">
        <div className="container mx-auto px-4 flex justify-center items-center text-sm">
          <Percent size={16} className="mr-2 animate-bounce" />
          <p>Special offer: Free shipping on orders over $50!</p>
        </div>
      </header> */}
      {/*  */}
      <div className="container mx-auto  ">
        <div className="grid  grid-cols-5 gap-4 justify-between items-center ">
          <Link to="/">
            <div className="col-span-1 flex items-center">
              <h1 className="text-2xl font-bold bg-white text-transparent bg-clip-text">
                MarketSphere
              </h1>
            </div>
          </Link>
          {/* search bar */}
          <div className="col-span-3 sm:hidden"></div>
          <div className="hidden col-span-3 sm:flex justify-center items-center relative ">
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative flex items-center bg-white rounded-full shadow-sm overflow-hidden">
                {/* Menu/Category Dropdown */}
                <Dropdown menu={{ items: categoryMenuItems }} trigger={["click"]}>
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 transition-colors border-r border-gray-200">
                    <LuMenu size={20} className="mr-2" />
                    <span className="text-sm text-gray-700 hidden lg:inline">{selectedCategory}</span>
                    <DownOutlined className="text-gray-600 text-xs" />
                  </button>
                </Dropdown>

                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search for..."
                  value={searchTerm}
                  className="flex-1 px-4 py-2.5 focus:outline-none text-gray-700 placeholder-gray-400"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Search Button */}
                <button className="flex items-center gap-2 px-6 py-3  bg-blue-500 hover:bg-blue-600 transition-colors text-white">
                  {isLoading ? (
                    <Spin size="small" />
                  ) : (
                    <Search size={20} />
                  )}
                </button>
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
       
         
          <div className="flex items-center space-x-6 col-span-1 justify-end">
            <Wishlist />
            <button className="text-white hover:text-blue-400 transition-transform duration-300 hover:scale-110">
              <Bell size={24} />
            </button>
            <button className="text-white hover:text-blue-400 transition-transform duration-300 hover:scale-110" onClick={() => navigate("/login")}>
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
