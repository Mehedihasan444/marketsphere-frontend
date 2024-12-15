/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState } from "react";
import {
  Table,
  Button,
  Space,
  Tag,
  message,
  Pagination,
  Spin,
  Alert,
} from "antd";
import {
  useGetAllShopsQuery,
  useUpdateShopStatusMutation,
} from "../../../../Redux/Features/Shop/shopApi";
import { ShopStatus, TShop } from "../../../../Interface";




const BlacklistShop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Fetch shops from the API
  const {
    data = {},
    isLoading,
    error,
  } = useGetAllShopsQuery({
    status: "RESTRICTED",
    page: currentPage,
    limit,
  });

  const [updateShopStatus, { isLoading: isUpdating }] =
    useUpdateShopStatusMutation();

  const { data:shops = [], meta } = data?.data || {};
  const { total } = meta || {};



  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await updateShopStatus({ id, shopStatus: newStatus });
      if (response?.data?.success) {
        message.success("Shop status updated successfully.");
      } else {
        message.error("Failed to update shop status.");
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred while updating the shop status.");
    }
  };

  const columns = [
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      render: (logo: string) => (
        <img
          src={logo}
          alt="Shop Logo"
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Vendor ID",
      dataIndex: "vendorId",
      key: "vendorId",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color =
          status === "APPROVED"
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
      render: (_: any, record: TShop) => (
        <Space>
     
            <Button
              type="primary"
              size="small"
              onClick={() => handleUpdateStatus(record.id, ShopStatus.ACTIVE)}
              disabled={isUpdating}
            >
              Reinstate
            </Button>
        
        </Space>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];

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
        description="Failed to load shops. Please try again."
        type="error"
        showIcon
      />
    );
  }
  return (
    <div className="p-5 bg-white rounded-lg">
      <h1 className="text-2xl font-semibold mb-3">Blacklisted Shops</h1>

      {/* Shops Table */}
      <Table
        columns={columns}
        dataSource={shops}
        rowKey="id"
        pagination={false}
      />

      {/* Pagination */}
      <div className="mt-4 flex justify-end">
        <Pagination
          current={currentPage}
          total={total}
          pageSize={limit}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default BlacklistShop;
