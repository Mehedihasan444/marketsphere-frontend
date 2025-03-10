/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useEffect, useState } from "react";
import { Table, Tag, Alert, Spin, message, Button } from "antd";
import { OrderStatus, TCustomer, TOrder, TOrderItem } from "../../../../Interface";
import { useGetOrderHistoryQuery,  } from "../../../../Redux/Features/Order/orderApi";


const AdminOrderHistory = () => {
  const { data={}, isLoading, isError } = useGetOrderHistoryQuery({status: OrderStatus.DELIVERED,paymentStatus: "PAID"}); // Fetch order 
  const {data: orders} = data.data || {};
  const [orderHistory, setOrderHistory] = useState<TOrder[]>([]);


  useEffect(() => {
    if (orders) {
      setOrderHistory(orders);
    }
  }, [orders]);
  // Handle status update
  const viewOrderDetails = async (orderId: string) => {
message.info(`View Order Details: ${orderId}`);
   
  };
  // Table columns for order history
  // Table columns
  const columns = [
    {
      title: '#',
      key: 'index',
      render: (_text: any, _record: any, index: number) => index + 1,
    },
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
            <Button
                type="link"
                onClick={() => viewOrderDetails(record.id)}
                className="text-blue-500"
            >
                View Details
            </Button>
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
      <h2 className="text-xl font-semibold mb-4">Orders History</h2>
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




export default AdminOrderHistory;