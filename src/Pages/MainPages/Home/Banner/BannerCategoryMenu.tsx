import React from 'react';
import { AppstoreOutlined, CameraOutlined, GlobalOutlined, HomeOutlined, LaptopOutlined, PrinterOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { IoGameControllerOutline, IoWatchOutline } from "react-icons/io5";
import { TbDeviceVisionProFilled } from 'react-icons/tb';
import { GiDeliveryDrone } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
type MenuItem = Required<MenuProps>['items'][number];


const onClick: MenuProps['onClick'] = (e) => {
  console.log('click', e);
};
const BannerCategoryMenu: React.FC = () => {
  
  const navigate = useNavigate()
  const items: MenuItem[] = [
    {
      key: 'mobiles',
      icon: <AppstoreOutlined />,
      onClick: () => navigate("/products?category=phone"),
      label: 'Mobiles & Tablets',
      children: [
        {
          key: 'smartphones',
          label: 'Smartphones',
          children: [
            { key: 'android', label: 'Android Phones' },
            { key: 'ios', label: 'iPhones' },
          ],
        },
        {
          key: 'tablets',
          label: 'Tablets',
          children: [
            { key: 'android-tablets', label: 'Android Tablets' },
            { key: 'ipad', label: 'iPads' },
          ],
        },
      ],
    },
    {
      key: 'laptops',
      icon: <LaptopOutlined />,
      onClick: () => navigate("/products?category=laptop"),
      label: 'Laptops & Computers',
      children: [
        { key: 'gaming-laptops', label: 'Gaming Laptops' },
        { key: 'ultrabooks', label: 'Ultrabooks' },
        { key: 'desktop-pcs', label: 'Desktop PCs' },
        { key: 'monitors', label: 'Monitors' },
      ],
    },
    {
      key: 'accessories',
      icon: <SettingOutlined />,
      onClick: () => navigate("/products?category=Ear-Bird"),
      label: 'Accessories',
      children: [
        { key: 'headphones', label: 'Headphones & Earbuds' },
        { key: 'chargers', label: 'Chargers & Cables' },
        { key: 'power-banks', label: 'Power Banks' },
        { key: 'cases', label: 'Cases & Covers' },
      ],
    },
    {
      key: 'gaming',
      icon: <IoGameControllerOutline />,
      onClick: () => navigate("/products?category=pc"),
      label: 'Gaming',
      children: [
        { key: 'consoles', label: 'Consoles' },
        { key: 'games', label: 'Games' },
        { key: 'controllers', label: 'Controllers' },
        { key: 'gaming-chairs', label: 'Gaming Chairs' },
      ],
    },
    {
      key: 'home-appliances',
      icon: <HomeOutlined />,
      label: 'Home Appliances',
      onClick: () => navigate("/products?category=tv"),
      children: [
        { key: 'televisions', label: 'Televisions' },
        { key: 'speakers', label: 'Speakers' },
        { key: 'smart-home', label: 'Smart Home Devices' },
        { key: 'kitchen-appliances', label: 'Kitchen Appliances' },
      ],
    },
    {
      key: 'wearables',
      icon: <IoWatchOutline />,
      onClick: () => navigate("/products?category=smart-watch"),
      label: 'Wearables',
      children: [
        { key: 'smartwatches', label: 'Smartwatches' },
        { key: 'fitness-bands', label: 'Fitness Bands' },
      ],
    },
    {
      key: 'cameras',
      icon: <CameraOutlined />,
      onClick: () => navigate("/products?category=Camera"),
      label: 'Cameras',
      children: [
        { key: 'dslr', label: 'DSLR Cameras' },
        { key: 'action-cameras', label: 'Action Cameras' },
        { key: 'lenses', label: 'Camera Lenses' },
      ],
    },
    {
      key: 'networking',
      icon: <GlobalOutlined />,
      onClick: () => navigate("/products?category=router"),
      label: 'Networking',
      children: [
        { key: 'routers', label: 'Routers' },
        { key: 'modems', label: 'Modems' },
        { key: 'range-extenders', label: 'Range Extenders' },
        { key: 'network-cables', label: 'Network Cables' },
      ],
    },
    {
      key: 'office',
      icon: <PrinterOutlined />,
      onClick: () => navigate("/products?category=printer"),
      label: 'Office Equipment',
      children: [
        { key: 'printers', label: 'Printers & Scanners' },
        { key: 'projectors', label: 'Projectors' },
        { key: 'office-chairs', label: 'Office Chairs' },
        { key: 'office-desks', label: 'Office Desks' },
      ],
    },
    {
      key: 'drones',
      icon: <GiDeliveryDrone />,
      label: 'Drones & Accessories',
      onClick: () => navigate("/products?category=drone"),
      children: [
        { key: 'camera-drones', label: 'Camera Drones' },
        { key: 'racing-drones', label: 'Racing Drones' },
        { key: 'mini-drones', label: 'Mini Drones' },
        { key: 'drone-accessories', label: 'Drone Accessories' },
        { key: 'professional-drones', label: 'Professional Drones' },
      ],
    },{
      key: 'vr',
      icon: <TbDeviceVisionProFilled />,
      onClick: () => navigate("/products?category=vr"),
      label: 'VR & AR Devices',
      children: [
        { key: 'vr-headsets', label: 'VR Headsets' },
        { key: 'ar-glasses', label: 'AR Glasses' },
        { key: 'vr-accessories', label: 'VR Accessories' },
        { key: 'gaming-vr', label: 'Gaming VR Systems' },
        { key: '360-cameras', label: '360° Cameras' },
      ],
    }
    
    
  ];
  return(

  <Menu onClick={onClick}  style={{ width: 270,  height:"100%"}} mode="vertical" items={items} />
)};

export default BannerCategoryMenu;