import { useEffect, useState } from "react";
import { Table, Select, message, Tag, Alert, Spin } from "antd";
import { OrderStatus, TCustomer, TOrder } from "../../../../Interface";
import {
  useGetOrdersQuery,
  useUpdateOrderMutation,
} from "../../../../Redux/Features/Order/orderApi";

const { Option } = Select;

const ManageOrder = () => {
  const [filterStatus, setFilterStatus] = useState<string | null>(null); // Filter by order status
  const { data = {}, isLoading, isError } = useGetOrdersQuery({ status: OrderStatus.PENDING, paymentStatus: "PAID" }); // Fetch all orders
  const { data: orders, } = data.data || {}
  const [updateOrder, { isLoading: isUpdating }] =
    useUpdateOrderMutation(); // Mutation to update order status


  console.log(orders)


  const [filteredOrders, setFilteredOrders] = useState<TOrder[]>([]);

  // Apply filters when orders or filterStatus changes
  useEffect(() => {
    if (orders) {
      setFilteredOrders(
        filterStatus
          ? orders.filter((order: TOrder) => order.status === filterStatus)
          : orders
      );
    }
  }, [orders, filterStatus]);

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
      render: (orderItems: any) => <>
        {orderItems?.map((item: any) => (
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Orders</h2>
        <Select
          placeholder="Filter by Status"
          onChange={(value) => setFilterStatus(value)}
          allowClear
          style={{ width: 200 }}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Shipped">Shipped</Option>
          <Option value="Delivered">Delivered</Option>
        </Select>
      </div>
      <Table
        columns={columns}
        dataSource={filteredOrders}
        rowKey="_id"
        loading={isLoading}
        pagination={{ pageSize: 5 }}
        bordered
      />

    </div>
  );
};

export default ManageOrder;
