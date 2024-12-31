/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Table, Button, Modal, Input, message, Select, Row, Col } from "antd";
import { useDeleteShopMutation, useGetAllShopsQuery, useUpdateShopStatusMutation } from "../../../../Redux/Features/Shop/shopApi";
import { TShop } from "../../../../Interface";


const Shops: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  // const [page, setPage] = useState<number>(1);
  // const [limit, setLimit] = useState<number>(10);
  const [status, setStatus] = useState<string>("");
  const [selectedShop, setSelectedShop] = useState<TShop | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch shops data using Redux Query
  const { data = {}, isLoading } = useGetAllShopsQuery({ searchTerm, status, limit:10, page:1 });
  const { data: shops = [], meta } = data?.data || {}
  const { total } = meta || {};
  const [updateShopStatus, { isLoading: updating }] = useUpdateShopStatusMutation()
  const [deleteShop, { isLoading: deleting }] = useDeleteShopMutation();


  const handleStatusChange = async (shopId: string, shopStatus: string) => {
    try {
      await updateShopStatus({ id: shopId, shopStatus });
      message.success("Shop status updated successfully!");
    } catch (error) {
      console.log(error);
      message.error("Failed to update shop status.");
    }
  };

  const handleDelete = async (shopId: string) => {
    try {
      await deleteShop(shopId);
      message.success("Shop deleted successfully!");
    } catch (error) {
      console.log(error);
      message.error("Failed to delete shop.");
    }
  };



  const columns = [
    {
      title: '#',
      key: 'index',
      render: (_text: any, _record: any, index: number) => index + 1,
    },
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
      title: "Shop Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      render: (_:any, shop: TShop) => (
        console.log(shop),
        <>
          <p>{shop?.vendor?.name}</p>
          <p>{shop?.vendor?.email}</p>
        </>
      ),
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
      render: (_: any, record: TShop) => (
        <Select
          defaultValue={record.status}
          style={{ width: 120 }}

          onChange={(value) => handleStatusChange(record.id, value)}
          loading={updating}
        >
          <Select.Option value="ACTIVE">ACTIVE</Select.Option>
          <Select.Option value="RESTRICTED">RESTRICTED</Select.Option>
          <Select.Option value="SUSPENDED">SUSPENDED</Select.Option>
        </Select>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: TShop) => (
        <div className="flex gap-2">

          <Button type="primary" danger onClick={() => handleDelete(record.id)} loading={deleting}>
            Delete
          </Button>
          <Button type="default" variant="outlined" onClick={() => handleViewDetails(record)}>
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

      {/* Filters Section */}
      <Row gutter={16} className="mb-4">
        <Col span={8}>
          {/* Total Count */}
          <div className="text-gray-600">
            Total Categories: <strong>{total || 0}</strong>
          </div>
        </Col>
        <Col span={2}></Col>
        <Col span={6}>
          <Input
            type="text"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
          />
        </Col>
        <Col span={8} className="flex justify-end">
          <Select
            style={{ width: 180 }}
            defaultValue={"All"}
            onChange={(value) => setStatus(value)}
            loading={updating}
          >
            <Select.Option value=" ">All</Select.Option>
            <Select.Option value="ACTIVE">ACTIVE</Select.Option>
            <Select.Option value="RESTRICTED">RESTRICTED</Select.Option>
            <Select.Option value="SUSPENDED">SUSPENDED</Select.Option>
          </Select>
        </Col>
      </Row>
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
        centered
      >
        {selectedShop && (
          <div>
            <p><strong>Name:</strong> {selectedShop?.name}</p>
            <p><strong>Owner:</strong> {selectedShop.vendor.name} ({selectedShop.vendor.email})</p>
            <p><strong>Status:</strong> {selectedShop.status}</p>
            <p><strong>Description:</strong> {selectedShop.description}</p>
            <p><strong>Products:</strong> {selectedShop?.products?.length || 0}</p>
            <p><strong>Followers:</strong> {selectedShop?.followers?.length || 0}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Shops;
