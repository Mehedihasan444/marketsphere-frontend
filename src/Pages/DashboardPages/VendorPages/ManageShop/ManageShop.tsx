/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Table,
  Button,
  Space,
  Tag,
  message,
  Popconfirm,
  Alert,
  Spin,
} from "antd";
import { useDeleteShopMutation } from "../../../../Redux/Features/Shop/shopApi";
import { useAppSelector } from "../../../../Redux/hook";
import { useGetVendorQuery } from "../../../../Redux/Features/Vendor/vendorApi";
import { TShop } from "../../../../Interface";
import AddShopModal from "./ShopModal/AddShopModal";
import UpdateShopModal from "./ShopModal/UpdateShopModal";

const ManageShop: React.FC = () => {
  const vendor = useAppSelector((state) => state.auth.user);
  // Fetch vendor all shops
  const {
    data = {},
    isLoading,
    error,
  } = useGetVendorQuery(vendor?.email as string);

  const { id, shop = [], name } = data.data || {};

  const [deleteShop, { isLoading: updating }] =
  useDeleteShopMutation()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Spin tip="Loading..." />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description="Failed to load shops."
        type="error"
        showIcon
      />
    );
  }

  // Handle status updates
  const handleDeleteShop = async (shopId: string) => {
    try {
      const res = await deleteShop(shopId);
      if (res?.data?.success) {
        message.success("Shop deleted successfully!");
      } else if (res?.error) {
        if ('data' in res.error) {
          // For FetchBaseQueryError, safely access the `data` property
          const errorMessage = (res.error.data as { message?: string })?.message || "Failed to delete shop.";
          message.error(errorMessage);
      } else if ('message' in res.error) {
          // For SerializedError, handle the `message` property
          message.error(res.error.message || "Failed to delete shop.");
      } else {
          // Handle unknown error types
          message.error("An unknown error occurred.");
      }
      }
    } catch (err) {
      console.error(err);
      message.error("An error occurred while deleting the shop.");
    }
  };

  const columns = [
    {
      title: "Shop Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Vendor",
      dataIndex: ["vendor", "name"],
      key: "vendorName",
      render: () => name || "N/A",
    },
    {
      title: "Number of products",
      key: "noOfProducts",
      render: (record: TShop) => {
        return record.products?.length || 0;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color =
          status === "ACTIVE"
            ? "green"
            : status === "PENDING"
              ? "orange"
              : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space size="middle">

          <UpdateShopModal shop={record} />

          <Popconfirm
            title="Are you sure you want to activate this shop?"
            onConfirm={() => handleDeleteShop(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5 bg-white rounded-lg">
      <div className="flex justify-between items-center gap-5">
        <h2 className="mb-4 text-xl font-semibold">Manage Shops</h2>
        <AddShopModal vendorId={id} />
      </div>
      <Table
        columns={columns}
        dataSource={shop}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        loading={isLoading || updating}
      />
    </div>
  );
};

export default ManageShop;
