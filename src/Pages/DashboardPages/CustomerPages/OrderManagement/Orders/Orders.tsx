/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Button, message, Pagination, Space } from "antd";
import { useState } from "react";
import { OrderStatus, TOrder } from "../../../../../Interface";
import { useCancelOrderMutation, useGetOrdersQuery, useMakePaymentMutation } from "../../../../../Redux/Features/Order/orderApi";
const Orders = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 8;
    const { data = {}, isLoading, } = useGetOrdersQuery({ status: OrderStatus.PENDING })
    const { data: orders, meta } = data.data || {}
    const { total } = meta || {};
    const [makePayment, { isLoading: isPaying }] = useMakePaymentMutation()
    const [cancelOrder] = useCancelOrderMutation()


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

            } else if (res?.error) {
                if ('data' in res.error) {
                    // For FetchBaseQueryError, safely access the `data` property
                    const errorMessage = (res.error.data as { message?: string })?.message || "Payment error occurred.";
                    message.error(errorMessage);
                } else if ('message' in res.error) {
                    // For SerializedError, handle the `message` property
                    message.error(res.error.message || "Payment error occurred.");
                } else {
                    // Handle unknown error types
                    message.error("An unknown error occurred.");
                }
            }
        } catch (error) {
            console.log(error)
            message.error("Failed to initiate payment")
        }
    }
    const handleCancel = async (orderId: string) => {
        try {
            const res = await cancelOrder(orderId)
            if (res?.data?.success) {
                message.success("Order cancelled successfully")
            }
            else if (res?.error) {
                // Check if the error is a FetchBaseQueryError
                if ("data" in res.error) {
                    const errorMessage = (res.error.data as { message?: string })?.message || "Failed to cancel order.";
                    message.error(errorMessage);
                }
                // Check if the error is a SerializedError
                else if ("message" in res.error) {
                    message.error(res.error.message || "Failed to cancel order.");
                } else {
                    message.error("An unknown error occurred.");
                }
            }
        } catch (error) {
            console.log(error)
            message.error("Failed to cancel order")

        }
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
            render: (_: any, record: TOrder) => (
                <Space>

                    <Button
                        type="primary"
                        loading={isPaying}
                        onClick={() => handlePayment(record.id, record.totalAmount)}
                        className=""
                        disabled={record.status === OrderStatus.CANCELLED || record.paymentStatus === "PAID"}
                    >
                        Pay Now
                    </Button>
                    <Button
                        type="primary"
                        danger
                        onClick={() => handleCancel(record.id)}
                        className=""
                        disabled={record.status === OrderStatus.CONFIRMED || record.status === OrderStatus.CANCELLED || record.status === OrderStatus.SHIPPED || record.status === OrderStatus.DELIVERED}
                    >
                        Cancel
                    </Button>
                </Space>

            ),
        },
    ];



    // if (isLoading)
    //     return (
    //         <div className="flex justify-center items-center h-screen">
    //             <Spin size="large" />
    //         </div>
    //     );
    // if (error) {
    //     return (
    //         <Alert
    //             message="Error"
    //             description="Failed to load orders."
    //             type="error"
    //             showIcon
    //         />
    //     );
    // }

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
                loading={isLoading}
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