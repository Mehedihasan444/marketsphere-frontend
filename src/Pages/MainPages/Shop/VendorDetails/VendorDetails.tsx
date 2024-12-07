import { Button, message } from "antd";
import {
  HeartOutlined,
  HeartFilled,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import DynamicBreadcrumb from "../../../../Components/Shared/DynamicBreadcrumb";
const VendorDetails = ({ shop }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(shop.initialFollowers);
  const breadcrumbItems = [
    {
      href: "/",
      title: <HomeOutlined />,
    },
    {
      href: "/products",
      title: (
        <>
          <UserOutlined />
          <span>Application List</span>
        </>
      ),
    },
    {
      title: "Shoes Reebok Zig Kinetica 3",
    },
  ];
  // Follow/Unfollow Vendor
  const toggleFollow = () => {
    if (isFollowing) {
      setFollowerCount(followerCount - 1);
      message.info("Unfollowed the shop.");
    } else {
      setFollowerCount(followerCount + 1);
      message.success("Followed the shop!");
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="bg-white shadow p-6 rounded-lg mb-4">
      {/* Breadcrumb */}
      <div className="mb-4">
        <DynamicBreadcrumb items={breadcrumbItems} />
      </div>
      <h1 className="text-3xl font-bold">{shop.name}</h1>
      <p className="text-gray-600 mt-2">{shop.description}</p>
      <p className="text-gray-500 mt-1">Location: {shop.location}</p>
      <div className="mt-4 flex items-center space-x-4">
        <Button
          type={isFollowing ? "default" : "primary"}
          icon={isFollowing ? <HeartFilled /> : <HeartOutlined />}
          onClick={toggleFollow}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
        <span className="text-gray-600">{followerCount} Followers</span>
      </div>
    </div>
  );
};

export default VendorDetails;
