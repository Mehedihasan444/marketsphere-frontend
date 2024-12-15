/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useEffect, useState } from "react";
import { Table, Tag, Alert, Spin, message, Select } from "antd";
import { useGetOrderHistoryQuery, useUpdateOrderMutation } from "../../../../../Redux/Features/Order/orderApi";
import { OrderStatus, TCustomer, TOrder, TOrderItem } from "../../../../../Interface";

const { Option } = Select;
const ConfirmedOrders = () => {
  const { data={}, isLoading, isError } = useGetOrderHistoryQuery({status: OrderStatus.CONFIRMED,paymentStatus: "PAID"}); // Fetch order 
  const {data: orders} = data.data || {};
  const [orderHistory, setOrderHistory] = useState<TOrder[]>([]);
  const [updateOrder, { isLoading: isUpdating }] =
    useUpdateOrderMutation(); // Mutation to update order status


  useEffect(() => {
    if (orders) {
      setOrderHistory(orders);
    }
  }, [orders]);
  // Handle status update
  const handleStatusUpdate = async (orderId: string, status: string) => {
    console.log(orderId, status)
    try {
      const response = await updateOrder({ orderId, status });
      if (response?.data?.success) {
        message.success("Order status updated successfully!");
      } else {
        message.error("Failed to update order status.");
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred while updating order status.");
    }
  };
  // Table columns for order history
  // Table columns
  const columns = [
    {
      title: "Order Number",
      dataIndex: "orderNumber",
      key: "orderNumber",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Customer Name",
      dataIndex: "customer",
      key: "customer",
      render: (customer: TCustomer) => <span>{customer?.name}</span>,
    },
    {
      title: "Product",
      dataIndex: "orderItems",
      key: "orderItems",
      render: (orderItems: TOrderItem[]) => <>
        {orderItems?.map((item: TOrderItem) => (
          <div key={item.id}>
            <h3 > <strong>Name:</strong> {item.product.name}</h3>
            <h3 > <strong>Quantity:</strong> {item.quantity}</h3>
          </div>
        ))}
      </>

    },
    {
      title: "Total Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount: number) => `$${totalAmount.toFixed(2)}`,
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
        title: "Action",
        key: "action",
        render: (_: any, record: TOrder) => (
          <Select
            defaultValue={record.status}
            onChange={(value) => handleStatusUpdate(record.id, value)}
            style={{ width: 150 }}
            loading={isUpdating}
          >
            <Option value="PENDING">PENDING</Option>
            <Option value="CONFIRMED"> CONFIRMED</Option>
            <Option value="SHIPPED">SHIPPED</Option>
            <Option value="DELIVERED">DELIVERED</Option>
          </Select>
        ),
      },
  ];

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
      <h2 className="text-xl font-semibold mb-4">Confirmed Orders</h2>
      <Table
        columns={columns}
        dataSource={orderHistory}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 5 }}
        bordered
      />
   
    </div>
  );
};

export default ConfirmedOrders;
