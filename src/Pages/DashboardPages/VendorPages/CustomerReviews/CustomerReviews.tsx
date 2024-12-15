/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Table, Rate, Button, message, Alert, Spin } from "antd";
import { TReview } from "../../../../Interface";
import { useGetVendorReviewsQuery } from "../../../../Redux/Features/Review/reviewApi";

const CustomerReviews = () => {

  const { data = {}, isLoading, error } = useGetVendorReviewsQuery({ page:1, limit:10 });
  const { data: reviews, } = data?.data || {};

  // Fetch reviews for vendor's products
  const [reviewList, setReviewList] = useState<TReview[]>([]);

  useEffect(() => {
    if (reviews) {
      setReviewList(reviews);
    }
  }, [reviews]);

  // Table columns for reviews
  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Product",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: TReview) => (
        <Button
          type="link"
          danger
          onClick={() => handleDeleteReview(record.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  // Handle deleting a review
  const handleDeleteReview = async (reviewId: string) => {
    try {
      // Replace this with a delete API call
      message.success("Review deleted successfully!");
      setReviewList((prev) => prev.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error(error);
      message.error("Failed to delete the review.");
    }
  };


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
        description="Failed to load reviews."
        type="error"
        showIcon
      />
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
      <Table
        columns={columns}
        dataSource={reviewList}
        rowKey="_id"
        loading={isLoading}
        pagination={{ pageSize: 5 }}
        bordered
      />

    </div>
  );
};

export default CustomerReviews;
