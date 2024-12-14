import { Button, Divider, message } from "antd";
import {
  HeartOutlined,
  HeartFilled,
  HomeOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import {useState } from "react";
import DynamicBreadcrumb from "../../../../Components/Shared/DynamicBreadcrumb";
import { TShop } from "../../../../Interface";
import { useFollowMutation } from "../../../../Redux/Features/Follow/followApi";
const ShopDetails = ({ shop }:{shop:TShop}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState();
const [follow,{isLoading,error}]=useFollowMutation()
  // Follow/Unfollow Vendor
  const toggleFollow = () => {
    if (isFollowing) {
      message.info("Unfollowed the shop.");
    } else {
      message.success("Followed the shop!");
    }
    setIsFollowing(!isFollowing);
  };
  // Breadcrumb Items
  const breadcrumbItems = [
    {
      href: "/",
      title: <HomeOutlined />,
    },
    {
      href: "/shops",
      title: (
        <>
          <ShopOutlined />
          <span>Shops</span>
        </>
      ),
    },
    {
      title: shop?.name,
    },
  ];
  return (
    <div
      className="bg-white shadow p-6 rounded-lg mb-4"
      style={{ backgroundImage: `url(${shop.banner})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
      {/* Breadcrumb */}
      <div className="mb-4">
        <DynamicBreadcrumb items={breadcrumbItems} />
      </div>
      <div className="flex justify-between items-center gap-5">

      <div className="flex items-center space-x-4">
        <div className="">
          <img
            src={shop.logo}
            alt="vendor logo"
            className="w-20 h-20 rounded-full" />
        </div>
        <div className="">

          <h1 className="text-3xl font-bold">{shop.name}</h1>
          <p className="text-gray-600 mt-2 text-sm"><span className="font-semibold">Description:</span>  <br /> {shop?.description}</p>
        <span className="text-gray-600">{shop?.followers?.length||0} Followers</span>
        <Divider type="vertical" variant="solid" className="h-5 bg-blue-400" />
        <span className="text-gray-600">{shop?.products?.length||0} Products</span>
        </div>
      </div>
      <div className="mt-4 flex items-center space-x-4">
        <Button
        size="large"
          type={isFollowing ? "default" : "primary"}
          icon={isFollowing ? <HeartFilled /> : <HeartOutlined />}
          onClick={toggleFollow}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </div>
      </div>
    </div>
  );
};

export default ShopDetails;
