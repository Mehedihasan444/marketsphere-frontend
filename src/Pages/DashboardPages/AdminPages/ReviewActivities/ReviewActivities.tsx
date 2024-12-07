import { useState } from "react";
import { Table, Button, Tag, Space, message, Select, Pagination, Spin, Alert } from "antd";
import { useGetAllReviewsQuery, useUpdateReviewStatusMutation } from "../../../../Redux/Features/Review/reviewApi";

const { Option } = Select;

interface Review {
  id: string;
  user: string;
  review: string;
  rating: number;
  status: string;
  date: string;
}

const ReviewActivities= () => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Fetch reviews from the API
  const { data = {}, isLoading, error } = useGetAllReviewsQuery({
    status: selectedStatus,
    page: currentPage,
    limit,
  });

  const [updateReviewStatus, { isLoading: isUpdating }] =
    useUpdateReviewStatusMutation();

  const { data:reviews = [], meta } = data?.data || {};
  const { total } = meta || {};

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    setCurrentPage(1); // Reset to the first page when filter changes
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await updateReviewStatus({ id, status: newStatus });
      if (response?.data?.success) {
        message.success("Review status updated successfully.");
      } else {
        message.error("Failed to update review status.");
      }
    } catch (error) {
      message.error("An error occurred while updating the review status.");
    }
  };

  const columns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Review",
      dataIndex: "review",
      key: "review",
      ellipsis: true,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => `${rating} ★`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color = status === "APPROVED" ? "green" : status === "PENDING" ? "orange" : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Review) => (
        <Space>
          <Button
            type="primary"
            size="small"
            onClick={() => handleUpdateStatus(record.id, "APPROVED")}
            disabled={record.status === "APPROVED" || isUpdating}
          >
            Approve
          </Button>
          <Button
            type="default"
            danger
            size="small"
            onClick={() => handleUpdateStatus(record.id, "REJECTED")}
            disabled={record.status === "REJECTED" || isUpdating}
          >
            Reject
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
      {/* Filters */}
      <Space className="mb-4" size="large">
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
      </Space>

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


