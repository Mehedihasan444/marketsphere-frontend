import { Button, Divider, message } from "antd";
import {
  HeartOutlined,
  HeartFilled,
  HomeOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import DynamicBreadcrumb from "../../../../Components/Shared/DynamicBreadcrumb";
import { TFollow, TShop } from "../../../../Interface";
import { useFollowMutation, useUnfollowMutation } from "../../../../Redux/Features/Follow/followApi";
import { useGetMyProfileQuery } from "../../../../Redux/Features/User/userApi";
import { useMemo } from "react";
const ShopDetails = ({ shop }: { shop: TShop }) => {
  const { data = {} } = useGetMyProfileQuery("");
  const userProfile = useMemo(() => data.data || {}, [data]);
  const [follow, { isLoading, }] = useFollowMutation()

  const [unfollow, { isLoading: isUnfollowing }] = useUnfollowMutation()
  // Follow shop
  const handleFollow = async () => {
    const followInfo = {
      customerId: userProfile?.id,
      shopId: shop.id
    }
    try {
      const res = await follow(followInfo);

      if (res.data?.success) {
        message.success("Followed the shop!");
      } else if (res?.error) {
        message.error(res.error.data?.message)
      }
    } catch (error) {
      console.log(error);
      message.error("An error occurred while following the shop.");
    }

  };

  // Unfollow shop
  const handleUnfollow = async () => {
    const followInfo = {
      customerId: userProfile?.id,
      shopId: shop.id
    }
    try {
      const res = await unfollow(followInfo);

      if (res.data?.success) {
        message.success("Unfollowed the shop!");
      } else if (res?.error) {
        message.error(res.error.data?.message)
      }
    } catch (error) {
      console.log(error);
      message.error("An error occurred while unfollowing the shop.");
    }
  }
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
            <span className="text-gray-600">{shop?.followers?.length || 0} Followers</span>
            <Divider type="vertical" variant="solid" className="h-5 bg-blue-400" />
            <span className="text-gray-600">{shop?.products?.length || 0} Products</span>
          </div>
        </div>
        <div className="mt-4 flex items-center space-x-4">
          {shop?.followers?.some((follower: TFollow) => follower.customerId === userProfile?.id && follower.shopId === shop.id) ?

            <Button
              size="large"
              type={"primary"}
              icon={<HeartFilled />}
              loading={isUnfollowing}
              onClick={handleUnfollow}
            >
              Unfollow
            </Button>
            :
            <Button
              size="large"
              type={"primary"}
              icon={<HeartOutlined />}
              onClick={handleFollow}
              loading={isLoading}

            >
              Follow
            </Button>
          }
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;
