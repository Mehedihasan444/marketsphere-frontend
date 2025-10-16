/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useMemo } from "react";
import {  CloseOutlined, RightOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Drawer } from "antd";
import { RiDiscountPercentFill } from "react-icons/ri";
import {
  ApiOutlined,
  FireOutlined,
  ThunderboltOutlined,
  StarOutlined
} from "@ant-design/icons";
import { LuMenu } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../../../Redux/Features/Category/categoryApi";

type MenuItem = Required<MenuProps>["items"][number];

interface Category {
  id: string;
  name: string;
  parentId: string | null;
}

// Professional Megamenu Component
const CategoriesMegaMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: categoriesData } = useGetAllCategoriesQuery({ limit: 100 }); // Get all categories
  
  // Extract categories array from the response
  const allCategories = useMemo(() => categoriesData?.data?.data || [], [categoriesData]);
  
  // Get parent categories with their children
  const parentCategories = useMemo(() => 
    Array.isArray(allCategories) 
      ? allCategories.filter((cat: Category) => !cat.parentId)
      : []
  , [allCategories]);
  
  // Helper function to convert category name to slug
  const categoryToSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };
  
  // Map parent categories to megamenu format - memoized to prevent re-renders
  const categories = useMemo(() => {
    return parentCategories
      .map((parent: Category) => {
        const children = Array.isArray(allCategories)
          ? allCategories.filter((cat: Category) => cat.parentId === parent.id)
          : [];
        
        return {
          id: parent.id,
          title: parent.name,
          icon: <ApiOutlined />,
          items: children.map((child: Category) => {
            const slug = categoryToSlug(child.name);
            const link = `/category/${slug}`;
            return {
              id: child.id,
              name: child.name,
              link: link,
            };
          }),
          hasChildren: children.length > 0
        };
      })
      .filter((category) => category.hasChildren);
  }, [parentCategories, allCategories]);

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
        <div className="absolute left-0 top-full mt-0 w-[1200px] bg-white shadow-xl z-[9999] border-t-2 border-[#1890ff] pointer-events-auto">
          <div className="p-8">
            {/* Main Categories Grid */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {categories.map((category: any) => (
                <div key={category.id} className="min-w-0">
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b-2 border-gray-100">
                    <span className="text-[#1890ff] text-lg">{category.icon}</span>
                    <h3 className="font-semibold text-gray-800 text-[15px]">{category.title}</h3>
                  </div>
                  <ul className="">
                    {category.items.map((item: any) => (
                      <li key={item.id} className="relative" >
                        <Link
                          to={item.link}
                          onClick={() => setIsOpen(false)}
                          className="text-gray-600 hover:text-[#1890ff] hover:pl-2 transition-all duration-200 text-[14px] flex items-center gap-1 group/link relative z-10 hover:bg-gray-100"
                          data-category={item.name}
                          data-link={item.link}
                          style={{ display: 'block', padding: '4px' }}
                        >
                          <RightOutlined className="text-[8px] opacity-0 group-hover/link:opacity-100 transition-opacity" />
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Featured Banners */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
              {featuredBanners.map((banner, idx) => (
                <Link
                  key={idx}
                  to={banner.link}
                  onClick={() => setIsOpen(false)}
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
                </Link>
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
    label: <Link to="/">Home</Link>,
    key: "home",
  },
  {
    label: <Link to="/products">Products</Link>,
    key: "products",
  },
  {
    label: <CategoriesMegaMenu />,
    key: "categories",
  },
  {
    label: <Link to="/compare-products">Compare</Link>,
    key: "compare",
  },
  {
    label: <Link to="/about">About Us</Link>,
    key: "about",
  },
  {
    label: <Link to="/contact">Contact</Link>,
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
  const { data: categoriesData } = useGetAllCategoriesQuery({ limit: 100 });

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    setMobileMenuOpen(false);
  };

  // Helper function to convert category name to slug
  const categoryToSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  // Get categories for mobile menu
  const allCategories = categoriesData?.data?.data || [];
  const parentCategories = Array.isArray(allCategories) 
    ? allCategories.filter((cat: Category) => !cat.parentId)
    : [];

  // Create mobile menu items with categories
  const mobileMenuItems: MenuItem[] = [
    {
      label: <Link to="/">Home</Link>,
      key: "home",
    },
    {
      label: <Link to="/products">Products</Link>,
      key: "products",
    },
    {
      label: "Categories",
      key: "categories-mobile",
      children: parentCategories.map((parent: Category) => {
        const children = Array.isArray(allCategories)
          ? allCategories.filter((cat: Category) => cat.parentId === parent.id)
          : [];
        
        return {
          label: parent.name,
          key: `parent-${parent.id}`,
          children: children.length > 0 
            ? children.map((child: Category) => ({
                label: <Link to={`/category/${categoryToSlug(child.name)}`}>{child.name}</Link>,
                key: `child-${child.id}`,
              }))
            : undefined,
        };
      }),
    },
    {
      label: <Link to="/compare-products">Compare</Link>,
      key: "compare",
    },
    {
      label: <Link to="/about">About Us</Link>,
      key: "about",
    },
    {
      label: <Link to="/contact">Contact</Link>,
      key: "contact",
    },
  ];

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
        width={280}
      >
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="inline"
          items={mobileMenuItems}
          className="border-none"
        />
      </Drawer>
    </section>
  );
};

export default Navbar;