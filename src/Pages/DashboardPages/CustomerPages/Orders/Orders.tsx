import { Table, Button, Spin, message, Alert, Pagination, Space } from "antd";
import { useGetOrdersQuery, useMakePaymentMutation } from "../../../../Redux/Features/Order/orderApi";
import { useState } from "react";
import { TOrder } from "../../../../Interface";

const Orders = () => {
    const { data = {}, isLoading, error } = useGetOrdersQuery({ paymentStatus: "UNPAID" })
    const { data: orders, meta } = data.data || {}
    const { total } = meta || {};
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 8;
    const [makePayment, { isLoading: isPaying }] = useMakePaymentMutation()
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const handlePayment = async (orderId: string, amount: number) => {
        try {
            const payemntData = {
                orderId,
                amount
            }
            const res = await makePayment(payemntData)
            if (res?.data?.data.payment_url) {
                window.location.href = res.data.data.payment_url;
                return;

            } else if (res?.error) {
                message.error(res?.error.data.message)
            }
        } catch (error) {
            console.log(error)
            message.error("Failed to initiate payment")
        }
    }
    const handleDelete = (orderId: string) => {

    }
    // Columns for Ant Design table
    const columns = [
        {
            title: "Order #",
            dataIndex: "orderNumber",
            key: "orderNumber",
        },
        {
            title: "Date",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt: string) => new Date(createdAt).toLocaleDateString(),
        },
        {
            title: "Total",
            dataIndex: "totalAmount",
            key: "totalAmount",
            render: (totalAmount: number) => `$${totalAmount.toFixed(2)}`,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <span
                    className={`px-2 py-1 rounded text-white ${status === "COMPLETED"
                        ? "bg-green-500"
                        : status === "PENDING"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                >
                    {status}
                </span>
            ),
        },
        {
            title: "Payment",
            dataIndex: "paymentStatus",
            key: "paymentStatus",
            render: (paymentStatus: string) => (
                <span
                    className={`px-2 py-1 rounded text-white ${paymentStatus === "PAID"
                        ? "bg-green-500"
                        : paymentStatus === "UNPAID"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                >
                    {paymentStatus}
                </span>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record: TOrder) => (
                <Space>

                    <Button
                        type="primary"
                        loading={isPaying}
                        onClick={() => handlePayment(record.id, record.totalAmount)}
                        className=""
                    >
                        Pay Now
                    </Button>
                    <Button
                        type="primary"
                        danger
                        onClick={() => handleDelete(record.id)}
                        className=""
                    >
                        Cancel
                    </Button>
                </Space>

            ),
        },
    ];

    // Helper function to view order details
    const viewOrderDetails = (orderId: string) => {
        message.info(`Viewing details for order #${orderId}`);
        // Navigate to detailed order page if needed
        // e.g., use React Router: navigate(`/order/${orderId}`);
    };

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    if (error) {
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
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Order History</h2>

            {/* {orders?.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : ( */}
            <Table
                columns={columns}
                dataSource={orders}
                rowKey="id"
                pagination={false}
                className="shadow-md"
            />
            {/* )} */}
            {/* Pagination */}
            <div className="mt-4 flex justify-end">
                <Pagination
                    current={currentPage}
                    total={total}
                    pageSize={limit}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
};



export default Orders;