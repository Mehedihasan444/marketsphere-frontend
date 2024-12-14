import { Table, Spin, Alert, Pagination, Divider } from "antd";
import { useState } from "react";
import { useGetOrderHistoryQuery } from "../../../../Redux/Features/Order/orderApi";
import { OrderStatus, TOrder, TReviewItem } from "../../../../Interface";
import ReviewCard from "../../../MainPages/ProductDetails/ReviewCard/ReviewCard";
import ReviewModal from "./ReviewModal";
import { useGetCustomerReviewsQuery } from "../../../../Redux/Features/Review/reviewApi";


// const reviews = [
//     {
//         id: 1,
//         name: "Helen M.",
//         date: "Yesterday",
//         rating: 5,
//         review: "Excellent running shoes. It turns very sharply on the foot.",
//         likes: 42,
//         replies: 0,
//     },
//     {
//         id: 2,
//         name: "Ann D.",
//         date: "2 days ago",
//         rating: 5,
//         review: "Good shoes",
//         likes: 35,
//         replies: 2,
//     },
//     {
//         id: 3,
//         name: "Andrew G.",
//         date: "2 days ago",
//         rating: 4,
//         review: "Is it suitable for running?",
//         likes: 10,
//         replies: 0,
//     },
// ];


const LeaveReviews = () => {
    const { data = {}, isLoading, error } = useGetOrderHistoryQuery({ status: OrderStatus.DELIVERED, isReview: "false" });
    const { data: orders, meta } = data.data || {}
    const { total } = meta || {};
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 8;
    const { data: reviewData = {}, isLoading: reviewLoading } = useGetCustomerReviewsQuery({ page: currentPage, limit: limit })

    const reviews = reviewData?.data?.data || []
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


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
                <ReviewModal order={record} />
            ),
        },
    ];



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
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            <Table
                columns={columns}
                dataSource={orders}
                rowKey="id"
                pagination={false}
                className="shadow-md"
            />
            {/* reviews */}
            <div className="mt-4">
                <h1 className="text-2xl font-semibold mb-4">Your reviews</h1>
                {reviewLoading ? <div className="flex justify-center items-center h-screen w-full">
                    <Spin size="large" tip="Loading reviews..." />
                </div> : reviews?.map((review: TReviewItem) => (
                    <>
                        <div className="shadow-md" key={review.id}>

                            <ReviewCard review={review} />
                        </div>
                        <Divider />
                    </>
                ))}
            </div>
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


export default LeaveReviews;