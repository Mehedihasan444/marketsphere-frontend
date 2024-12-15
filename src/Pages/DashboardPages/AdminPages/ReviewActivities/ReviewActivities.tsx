/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Table, Button, Space, message, Pagination, Spin, Alert } from "antd";
import { useDeleteReviewMutation, useGetAdminReviewsQuery } from "../../../../Redux/Features/Review/reviewApi";

// const { Option } = Select;

interface Review {
  id: string;
  user: string;
  review: string;
  rating: number;
  status: string;
  date: string;
}

const ReviewActivities = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Fetch reviews from the API
  const { data = {}, isLoading, error } = useGetAdminReviewsQuery({
    page: currentPage,
    limit,
  });

  const [deleteReview, { isLoading: isDeleting }] =
  useDeleteReviewMutation();

  const { data: reviews = [], meta } = data?.data || {};
  const { total } = meta || {};



  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (reviewItemId: string) => {
    try {
      const response = await deleteReview(reviewItemId);
      if (response?.data?.success) {
        message.success("Review status updated successfully.");
      } else {
        message.error("Failed to update review status.");
      }
    } catch (error) {
      console.log(error);
      message.error("An error occurred while updating the review status.");
    }
  };

  const columns = [
    {
      title: "User",
      dataIndex: "customer",
      key: "customer",
      render: (customer: any) =>
        <div className="">
          <h3>{customer?.name}</h3>
          <h3>{customer?.email}</h3>
        </div>,
    },
    {
      title: "Review",
      dataIndex: "comment",
      key: "comment",
      ellipsis: true,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => `${rating} ★`,
    },
 
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Review) => (
        <Space>
      
          <Button
            type="default"
            danger
            size="small"
            loading={isDeleting}
            onClick={() => handleDelete(record.id)}

          >
            Delete
          </Button>
        </Space>
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
    <div className="p-5 bg-white rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Customer Reviews</h1>
      {/* Filters */}
      {/* <Space className="mb-4" size="large">
        <Select
          placeholder="Filter by Status"
          value={selectedStatus}
          onChange={handleStatusChange}
          allowClear
          style={{ width: 200 }}
        >
          <Option value="APPROVED">Approved</Option>
          <Option value="PENDING">Pending</Option>
          <Option value="REJECTED">Rejected</Option>
        </Select>
      </Space> */}

      {/* Reviews Table */}
      <Table
        columns={columns}
        dataSource={reviews}
        rowKey="id"
        pagination={false}
      />

      {/* Pagination */}
      <div className="mt-4 flex justify-end">
        <Pagination
          current={currentPage}
          total={total}
          pageSize={limit}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ReviewActivities;


