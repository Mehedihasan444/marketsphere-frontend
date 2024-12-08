import  { useEffect, useState } from "react";
import { Table, Tag, Button, Alert, Spin } from "antd";
import { TOrder } from "../../../../Interface";
import { useGetOrderHistoryQuery } from "../../../../Redux/Features/Order/orderApi";

const OrderHistory = () => {
  const { data: orders, isLoading, isError } = useGetOrderHistoryQuery(); // Fetch order history
  const [orderHistory, setOrderHistory] = useState<TOrder[]>([]);

  useEffect(() => {
    if (orders) {
      setOrderHistory(orders);
    }
  }, [orders]);

  // Table columns for order history
  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Product",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number) => `৳${price.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color =
          status === "Pending"
            ? "orange"
            : status === "Shipped"
            ? "blue"
            : "green";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: TOrder) => (
        <Button
          type="link"
          onClick={() => viewOrderDetails(record._id)}
          className="text-blue-500"
        >
          View Details
        </Button>
      ),
    },
  ];

  // Handle viewing details of a specific order
  const viewOrderDetails = (orderId: string) => {
    // Navigate to a detailed order view page or show a modal
    console.log(`Viewing details for order ID: ${orderId}`);
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Spin tip="Loading..." />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert
        message="Error"
        description="Failed to load orders."
        type="error"
        showIcon
      />
    );
  }
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Order History</h2>
      <Table
        columns={columns}
        dataSource={orderHistory}
        rowKey="_id"
        loading={isLoading}
        pagination={{ pageSize: 5 }}
        bordered
      />
   
    </div>
  );
};

export default OrderHistory;
