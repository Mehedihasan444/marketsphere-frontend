
import React, { useState } from "react";
import {  CloseOutlined, RightOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Drawer } from "antd";
import { RiDiscountPercentFill } from "react-icons/ri";
import {
  MobileOutlined,
  LaptopOutlined,
  ApiOutlined,
  RocketOutlined,
  FireOutlined,
  ThunderboltOutlined,
  StarOutlined
} from "@ant-design/icons";
import { LuMenu } from "react-icons/lu";

type MenuItem = Required<MenuProps>["items"][number];

// Professional Megamenu Component
const CategoriesMegaMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    {
      title: "Mobiles & Tablets",
      icon: <MobileOutlined />,
      items: [
        { name: "Smartphones", link: "/category/smartphones" },
        { name: "Feature Phones", link: "/category/feature-phones" },
        { name: "Tablets", link: "/category/tablets" },
        { name: "Smart Watches", link: "/category/smartwatches" },
        { name: "Mobile Accessories", link: "/category/mobile-accessories" },
      ]
    },
    {
      title: "Computers & Laptops",
      icon: <LaptopOutlined />,
      items: [
        { name: "Laptops", link: "/category/laptops" },
        { name: "Desktop PCs", link: "/category/desktops" },
        { name: "Monitors", link: "/category/monitors" },
        { name: "Keyboards & Mice", link: "/category/keyboards-mice" },
        { name: "Computer Accessories", link: "/category/computer-accessories" },
      ]
    },
    {
      title: "Gaming",
      icon: <ApiOutlined />,
      items: [
        { name: "Gaming Consoles", link: "/category/consoles" },
        { name: "Gaming Laptops", link: "/category/gaming-laptops" },
        { name: "Gaming Accessories", link: "/category/gaming-accessories" },
        { name: "Video Games", link: "/category/games" },
        { name: "VR Headsets", link: "/category/vr-headsets" },
      ]
    },
    {
      title: "Electronics & Gadgets",
      icon: <RocketOutlined />,
      items: [
        { name: "Cameras", link: "/category/cameras" },
        { name: "Drones", link: "/category/drones" },
        { name: "Audio & Headphones", link: "/category/audio" },
        { name: "Smart Home Devices", link: "/category/smart-home" },
        { name: "Wearable Tech", link: "/category/wearables" },
      ]
    },
  ];

  const featuredBanners = [
    {
      title: "Hot Deals",
      subtitle: "Up to 50% off",
      icon: <FireOutlined />,
      gradient: "from-orange-500 to-red-500",
      link: "/deals"
    },
    {
      title: "New Arrivals",
      subtitle: "Latest products",
      icon: <ThunderboltOutlined />,
      gradient: "from-blue-500 to-purple-500",
      link: "/new-arrivals"
    },
    {
      title: "Best Sellers",
      subtitle: "Top rated items",
      icon: <StarOutlined />,
      gradient: "from-green-500 to-teal-500",
      link: "/best-sellers"
    },
  ];

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="px-4 pb-2 hover:text-[#1890ff] transition-colors duration-200  text-[15px] flex items-center gap-1">
        Categories
        <RightOutlined className="text-[10px] rotate-90 transition-transform duration-200 group-hover:translate-y-0.5" />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-0 w-[980px] bg-white shadow-xl z-50 border-t-2 border-[#1890ff]">
          <div className="p-8">
            {/* Main Categories Grid */}
            <div className="grid grid-cols-4 gap-8 mb-8">
              {categories.map((category, idx) => (
                <div key={idx}>
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-gray-100">
                    <span className="text-[#1890ff] text-lg">{category.icon}</span>
                    <h3 className="font-semibold text-gray-800 text-[15px]">{category.title}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {category.items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <a
                          href={item.link}
                          className="text-gray-600 hover:text-[#1890ff] hover:pl-2 transition-all duration-200 text-[14px] flex items-center gap-1 group/link"
                        >
                          <RightOutlined className="text-[8px] opacity-0 group-hover/link:opacity-100 transition-opacity" />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Featured Banners */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
              {featuredBanners.map((banner, idx) => (
                <a
                  key={idx}
                  href={banner.link}
                  className="group/banner relative overflow-hidden rounded-lg h-24 block"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${banner.gradient} opacity-90 group-hover/banner:opacity-100 transition-opacity`}></div>
                  <div className="relative h-full flex items-center justify-between px-5 text-white">
                    <div>
                      <h4 className="font-bold text-lg mb-0.5">{banner.title}</h4>
                      <p className="text-sm text-white/90">{banner.subtitle}</p>
                    </div>
                    <span className="text-4xl opacity-20 group-hover/banner:opacity-30 group-hover/banner:scale-110 transition-all">
                      {banner.icon}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


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
    label: <CategoriesMegaMenu />,
    key: "categories",
  },
  {
    label: (<a href="/compare-products" >Compare</a>),
    key: "compare",
  },
  {
    label: (<a href="/about" >About Us</a>),
    key: "about",
  },
  {
    label: (<a href="/contact" >Contact</a>),
    key: "contact",
  },
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
    <section className="w-full bg-neutral-100 px-4 lg:px-0 sm:bg-none">
      {/* Desktop Navigation */}
      <div className="max-w-7xl mx-auto hidden lg:grid grid-cols-5 gap-4 items-center  justify-center py-2">

        <div className="col-span-3 flex justify-end">

          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
            className="border-none w-full bg-neutral-100"
          />
        </div>
        <div className="col-span-2 flex items-center justify-end gap-2">
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
          <LuMenu className="text-xl" />
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
    </section>
  );
};

export default Navbar;