import React, { useState } from 'react';
import { Input, Breadcrumb, Tag } from 'antd';
import { 
  SearchOutlined, 
  HomeOutlined,
  MobileOutlined,
  LaptopOutlined,
  ApiOutlined,
  RocketOutlined,
  CameraOutlined,
  CustomerServiceOutlined,
  TabletOutlined,
  DesktopOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const AllCategories = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const categoryData = [
    {
      id: 1,
      name: "Mobile Phones",
      icon: <MobileOutlined />,
      count: 1247,
      color: "blue",
      subcategories: ["Smartphones", "Feature Phones", "Refurbished Phones"]
    },
    {
      id: 2,
      name: "Tablets",
      icon: <TabletOutlined />,
      count: 342,
      color: "cyan",
      subcategories: ["Android Tablets", "iPad", "Windows Tablets"]
    },
    {
      id: 3,
      name: "Laptops",
      icon: <LaptopOutlined />,
      count: 856,
      color: "purple",
      subcategories: ["Gaming Laptops", "Business Laptops", "Ultrabooks", "Chromebooks"]
    },
    {
      id: 4,
      name: "Desktop Computers",
      icon: <DesktopOutlined />,
      count: 423,
      color: "geekblue",
      subcategories: ["Gaming PCs", "All-in-One", "Workstations"]
    },
    {
      id: 5,
      name: "Computer Accessories",
      icon: <AppstoreOutlined />,
      count: 2134,
      color: "orange",
      subcategories: ["Keyboards", "Mice", "Monitors", "Webcams", "Cables"]
    },
    {
      id: 6,
      name: "Gaming",
      icon: <ApiOutlined />,
      count: 1567,
      color: "red",
      subcategories: ["Gaming Consoles", "Gaming Accessories", "Video Games", "VR Headsets"]
    },
    {
      id: 7,
      name: "Audio Devices",
      icon: <CustomerServiceOutlined />,
      count: 892,
      color: "green",
      subcategories: ["Headphones", "Earbuds", "Speakers", "Microphones"]
    },
    {
      id: 8,
      name: "Cameras",
      icon: <CameraOutlined />,
      count: 534,
      color: "magenta",
      subcategories: ["DSLR Cameras", "Mirrorless Cameras", "Action Cameras", "Camera Lenses"]
    },
    {
      id: 9,
      name: "Smart Watches",
      icon: <RocketOutlined />,
      count: 678,
      color: "volcano",
      subcategories: ["Apple Watch", "Android Watches", "Fitness Trackers"]
    },
    {
      id: 10,
      name: "Smart Home",
      icon: <HomeOutlined />,
      count: 445,
      color: "lime",
      subcategories: ["Smart Speakers", "Smart Lights", "Security Cameras", "Smart Plugs"]
    },
    {
      id: 11,
      name: "Drones",
      icon: <RocketOutlined />,
      count: 187,
      color: "gold",
      subcategories: ["Consumer Drones", "Professional Drones", "Drone Accessories"]
    },
    {
      id: 12,
      name: "Mobile Accessories",
      icon: <MobileOutlined />,
      count: 3456,
      color: "blue",
      subcategories: ["Phone Cases", "Screen Protectors", "Chargers", "Power Banks"]
    },
  ];

  const filteredCategories = categoryData.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.subcategories.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalProducts = categoryData.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Breadcrumb
            items={[
              {
                href: '/',
                title: (
                  <>
                    <HomeOutlined />
                    <span>Home</span>
                  </>
                ),
              },
              {
                title: 'All Categories',
              },
            ]}
          />
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Browse All Categories
            </h1>
            <p className="text-gray-600 text-lg">
              Explore our wide range of products across {categoryData.length} categories
            </p>
            <div className="mt-2">
              <Tag color="blue" className="text-sm px-3 py-1">
                {totalProducts.toLocaleString()} Products Available
              </Tag>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <Input
              size="large"
              placeholder="Search categories..."
              prefix={<SearchOutlined className="text-gray-400" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-lg shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCategories.map((category) => (
              <Link
                to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                key={category.id}
                className="block"
              >
                <div className="bg-white rounded-lg border border-gray-200 hover:border-[#1890ff] hover:shadow-lg transition-all duration-300 h-full group">
                  {/* Category Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-2xl text-[#1890ff] group-hover:bg-[#1890ff] group-hover:text-white transition-colors">
                        {category.icon}
                      </div>
                      <Tag color={category.color} className="text-xs">
                        {category.count} items
                      </Tag>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#1890ff] transition-colors">
                      {category.name}
                    </h3>
                  </div>

                  {/* Subcategories */}
                  <div className="p-6">
                    <ul className="space-y-2">
                      {category.subcategories.map((sub, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-600 hover:text-[#1890ff] transition-colors flex items-center gap-2 group/sub"
                        >
                          <span className="w-1 h-1 rounded-full bg-gray-400 group-hover/sub:bg-[#1890ff]"></span>
                          {sub}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* View All Link */}
                  <div className="px-6 pb-6">
                    <div className="text-sm text-[#1890ff] font-medium group-hover:underline flex items-center gap-1">
                      View All
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No categories found
            </h3>
            <p className="text-gray-600">
              Try searching with different keywords
            </p>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[#1890ff] mb-2">
                {categoryData.length}+
              </div>
              <div className="text-gray-600">Product Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#1890ff] mb-2">
                {totalProducts.toLocaleString()}+
              </div>
              <div className="text-gray-600">Total Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#1890ff] mb-2">
                100%
              </div>
              <div className="text-gray-600">Quality Guaranteed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCategories;
