
import React, { useState } from "react";
import { MenuUnfoldOutlined, CloseOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Drawer } from "antd";
import { RiDiscountPercentFill } from "react-icons/ri";
import {Menu as LuMenu} from 'lucide-react'

type MenuItem = Required<MenuProps>["items"][number];


const items: MenuItem[] = [
  {
    label: <a href="/" >Home</a>,
    key: "home",
  },
  {
    label: (<a href="/products" >Products</a>),
    key: "products",
  },
  {
    label: "Categories",
    key: "categories",
    children: [
      {
        type: "group",
        label: "Mobiles & Tablets",
        children: [
          { label: "Smartphones", key: "mobiles:smartphones" },
          { label: "Tablets", key: "mobiles:tablets" },
        ],
      },
      {
        type: "group",
        label: "Laptops & Computers",
        children: [
          { label: "Laptops", key: "computers:laptops" },
          { label: "Desktops", key: "computers:desktops" },
          { label: "Accessories", key: "computers:accessories" },
        ],
      },
      {
        type: "group",
        label: "Gaming",
        children: [
          { label: "Gaming Consoles", key: "gaming:consoles" },
          { label: "Gaming Accessories", key: "gaming:accessories" },
          { label: "Games", key: "gaming:games" },
        ],
      },
      {
        type: "group",
        label: "Drones & VR",
        children: [
          { label: "Drones", key: "electronics:drones" },
          { label: "VR Devices", key: "electronics:vr" },
        ],
      },
    ],
  },
  {
    label: (<a href="/compare-products" >Compare</a>),
    key: "compare",
  },
  // {
  //   label: (<a href="/about" >About Us</a>) ,
  //   key: "about",
  // },
  // {
  //   label: "Contact",
  //   key: "contact",
  // },
  // {
  //   key: "external-link",
  //   label: (
  //     <a href="https://example.com" target="_blank" rel="noopener noreferrer">
  //       Visit Our Blog
  //     </a>
  //   ),
  // },
];

const Navbar: React.FC = () => {
  const [current, setCurrent] = useState("mail");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    setMobileMenuOpen(false);
  };

  return (
    <div className="w-full bg-white px-4 lg:px-0 sm:bg-none">
      {/* Desktop Navigation */}
      <div className="max-w-8xl lg:mx-16 mx-auto hidden lg:grid grid-cols-5 gap-4 items-center bg-white  ">
        <div className="col-span-1">
          {/* <div className="flex gap-4 items-center cursor-pointer">
            <MenuUnfoldOutlined />
            <h1 className="text-lg font-bold">Browse All Categories</h1>
          </div> */}
           <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300">
                <LuMenu size={20} className="mr-2" />
                Categories
              </button>
        </div>
        <div className="col-span-3 flex justify-end">

          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
            className="border-none w-full"
          />
        </div>
        <div className="col-span-1 flex items-center justify-end gap-2">
          <RiDiscountPercentFill className="text-red-500 text-2xl" />
          <h3 className="font-semibold">Sale $20 Off Your First Order.</h3>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden flex justify-between items-center py-2">
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => setMobileMenuOpen(true)}
        >
          <MenuUnfoldOutlined className="text-xl" />
          <span className="text-base font-medium">Menu</span>
        </div>
        <div className="flex items-center gap-2">
          <RiDiscountPercentFill className="text-red-500 text-xl" />
          <span className="text-sm font-medium">$20 Off First Order</span>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        className="lg:hidden"
        closeIcon={<CloseOutlined />}
        width={300}
      >
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="inline"
          items={items}
          className="border-none"
        />

      </Drawer>
    </div>
  );
};

export default Navbar;