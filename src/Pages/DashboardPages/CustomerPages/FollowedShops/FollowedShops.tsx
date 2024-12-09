/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Card, List, Avatar, Button, Spin, message } from "antd";
import { useFollowedShopsQuery, useUnfollowMutation } from "../../../../Redux/Features/Follow/followApi";

const FollowedShops: React.FC = () => {
  const { data = {}, isLoading: loadingShops } = useFollowedShopsQuery("");
  const [unfollowShop, { isLoading: unfollowing }] = useUnfollowMutation();
  const followedShops = data?.shops || [];

  const handleUnfollow = async (shopId: string) => {
    try {
      const response = await unfollowShop(shopId).unwrap();
      if (response.success) {
        message.success("You have unfollowed the shop successfully!");
      } else {
        message.error("Failed to unfollow the shop.");
      }
    } catch (error) {
        console.log(error);
      message.error("An error occurred while unfollowing the shop.");
    }
  };

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
          renderItem={(shop: any) => (
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
