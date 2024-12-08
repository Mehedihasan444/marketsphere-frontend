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
import { useUpdateShopStatusMutation } from "../../../../Redux/Features/Shop/shopApi";
import { useAppSelector } from "../../../../Redux/hook";
import { useGetVendorQuery } from "../../../../Redux/Features/Vendor/vendorApi";
import AddShopModal from "./AddShopModal/AddShopModal";
import { TShop } from "../../../../Interface";
// import { useGetAllShopsQuery, useUpdateShopStatusMutation } from "../../Redux/Features/Shop/shopApi";

const ManageShop: React.FC = () => {
  const vendor = useAppSelector((state) => state.auth.user);
  // Fetch vendor all shops
  const {
    data = {},
    isLoading,
    error,
  } = useGetVendorQuery(vendor?.email as string);

  const { id, shop = [], name } = data.data || {};

  const [updateShopStatus, { isLoading: updating }] =
    useUpdateShopStatusMutation();

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
  const handleStatusUpdate = async (shopId: string, newStatus: string) => {
    try {
      const response = await updateShopStatus({ shopId, status: newStatus });
      if (response?.data?.success) {
        message.success("Shop status updated successfully!");
      } else {
        message.error(
          response?.error?.data?.message || "Failed to update shop status."
        );
      }
    } catch (err) {
      console.error(err);
      message.error("An error occurred while updating the shop status.");
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
      render: (record:TShop) => {
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
          <Popconfirm
            title="Are you sure you want to blacklist this shop?"
            onConfirm={() => handleStatusUpdate(record.id, "BLACKLISTED")}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="default"
              variant="outlined"
           
              disabled={record.status === "BLACKLISTED"}
            >
              Edit
            </Button>
          </Popconfirm>
          <Popconfirm
            title="Are you sure you want to activate this shop?"
            onConfirm={() => handleStatusUpdate(record.id, "ACTIVE")}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger disabled={record.status === "ACTIVE"}>
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
