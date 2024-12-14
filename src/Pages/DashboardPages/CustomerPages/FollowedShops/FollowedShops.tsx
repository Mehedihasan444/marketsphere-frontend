import React from "react";
import { Card, List, Avatar, Button, Spin, message } from "antd";
import { TFollow, TShop } from "../../../../Interface";
import { useNavigate } from "react-router-dom";
import { useFollowedShopsQuery, useUnfollowMutation } from "../../../../Redux/Features/Follow/followApi";

const FollowedShops: React.FC = () => {
  const navigate = useNavigate();
  const { data = {}, isLoading: loadingShops } = useFollowedShopsQuery("");
  const [unfollow, { isLoading: unfollowing }] = useUnfollowMutation();
  const followedShops = data?.data?.map((item: TFollow) => item.shop) || [];
  // Unfollow shop
  const handleUnfollow = async (shopId: string) => {
    const customerId = data?.data[0]?.customerId;
    const followInfo = {
      customerId,
      shopId
    }
    try {
      const res = await unfollow(followInfo);
      if (res?.data?.success) {
        message.success("Unfollowed the shop!");
      } else if (res?.error) {
        message.error(res?.error.data?.message)
      }
    } catch (error) {
      console.log(error);
      message.error("An error occurred while unfollowing the shop.");
    }
  }

  return (
    <div className="p-4 bg-white rounded shadow-md max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Followed Shops</h2>
      {loadingShops ? (
        <div className="flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : followedShops.length === 0 ? (
        <p>You are not following any shops yet.</p>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={followedShops}
          renderItem={(shop: TShop) => (
            <Card className="mb-4">
              <List.Item
                actions={[
                  <Button
                    type="primary"
                    danger
                    onClick={() => handleUnfollow(shop.id)}
                    loading={unfollowing}
                  >
                    Unfollow
                  </Button>,
                  <Button
                    type="primary"
                    onClick={() => navigate(`/shops/${shop.id}`)}
                  >
                    Go To Shop
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      size={64}
                      src={shop.logo || "/default-shop-logo.png"}
                      alt={shop.name}
                    />
                  }
                  title={<a href={`/shop/${shop.id}`}>{shop.name}</a>}
                  description={shop.description || "No description available"}
                />
              </List.Item>
            </Card>
          )}
        />
      )}
    </div>
  );
};

export default FollowedShops;
