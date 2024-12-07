import React, { useState } from "react";
import {
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { RiDiscountPercentFill } from "react-icons/ri";

type MenuItem = Required<MenuProps>["items"][number];


const items: MenuItem[] = [
    {
      label: "Home",
      key: "home",
    },
    {
      label:  (<a href="/products" >Products</a>) ,
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
      label: "Deals",
      key: "deals",
    },
    {
      label: (<a href="/about" >About Us</a>) ,
      key: "about",
    },
    {
      label: "Contact",
      key: "contact",
    },
    {
      key: "external-link",
      label: (
        <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          Visit Our Blog
        </a>
      ),
    },
  ];
  
const Navbar: React.FC = () => {
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <div className="lg:mx-16 bg-white px-4">
      <div className="grid grid-cols-5 gap-4 justify-between items-center ">
        <div className="col-span-1">
          <div className="flex gap-4 items-center">
            <MenuUnfoldOutlined />
            <h1 className="text-lg font-bold">Browse All Categories</h1>
          </div>
        </div>
        <div className="col-span-3 ">
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
          />
          
        </div>
        <div className="col-span-1 flex items-center justify-center gap-2">
        <RiDiscountPercentFill className="text-red-500 text-2xl"/>
          <h3 className=" font-semibold">
            Sale $20 Off Your First Order.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
