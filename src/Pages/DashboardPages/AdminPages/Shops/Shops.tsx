// ! have to be fixed
import React, { useEffect, useState } from "react";
import { Table, Button, Tag, Modal, Input, message } from "antd";
import { useDeleteShopMutation, useGetAllShopsQuery, useUpdateShopStatusMutation } from "../../../../Redux/Features/Shop/shopApi";
// import { useGetShopsQuery, useUpdateShopMutation, useDeleteShopMutation } from "../../Redux/Features/Shops/shopsApi";

const { Search } = Input;

const Shops: React.FC = () => {
  const [status, setStatus] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [selectedShop, setSelectedShop] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch shops data using Redux Query
  const { data={}, isLoading } = useGetAllShopsQuery({status,limit,page});
  const {data:shops}=data?.data||{}
  const [updateShop, { isLoading: updating }] = useUpdateShopStatusMutation();
  const [deleteShop, { isLoading: deleting }] = useDeleteShopMutation();

  useEffect(() => {
    if (shops && status) {
      message.success(`Found ${shops.length} shop(s) matching "${status}"`);
    }
  }, [shops, status]);

  const handleStatusChange = async (shopId: string, status: string) => {
    try {
      await updateShop({ shopId, data: { status } });
      message.success("Shop status updated successfully!");
    } catch (error) {
      message.error("Failed to update shop status.");
    }
  };

  const handleDelete = async (shopId: string) => {
    try {
      await deleteShop(shopId);
      message.success("Shop deleted successfully!");
    } catch (error) {
      message.error("Failed to delete shop.");
    }
  };

  const handleSearch = (value: string) => {
    setStatus(value);
  };

  const columns = [
    {
      title: "Shop Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      render: (owner: { name: string; email: string }) => (
        <>
          <p>{owner.name}</p>
          <p>{owner.email}</p>
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "approved" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            onClick={() =>
              handleStatusChange(record.id, record.status === "approved" ? "pending" : "approved")
            }
            loading={updating}
          >
            {record.status === "approved" ? "Revoke" : "Approve"}
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)} loading={deleting}>
            Delete
          </Button>
          <Button type="link" onClick={() => handleViewDetails(record)}>
            View Details
          </Button>
        </div>
      ),
    },
  ];

  const handleViewDetails = (shop: any) => {
    setSelectedShop(shop);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Manage Shops</h2>
      <Search
        placeholder="Search shops by name or owner"
        onSearch={handleSearch}
        allowClear
        enterButton
        className="mb-4"
      />
      <Table
        dataSource={shops}
        columns={columns}
        loading={isLoading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title="Shop Details"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {selectedShop && (
          <div>
            <p><strong>Name:</strong> {selectedShop.name}</p>
            <p><strong>Owner:</strong> {selectedShop.owner.name} ({selectedShop.owner.email})</p>
            <p><strong>Status:</strong> {selectedShop.status}</p>
            <p><strong>Description:</strong> {selectedShop.description}</p>
            <p><strong>Products:</strong> {selectedShop.totalProducts}</p>
            <p><strong>Followers:</strong> {selectedShop.followersCount}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Shops;
