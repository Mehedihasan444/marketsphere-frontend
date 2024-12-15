import React, { useState } from "react";
import {
  Alert,
  Input,
  Spin,
  Table,
  Pagination,
  Row,
  Col,
  message,
  Space,
  Button,
  Popconfirm,
} from "antd";
import type { TableProps } from "antd";
import { useDeleteCategoryMutation, useGetAllCategoriesQuery } from "../../../../Redux/Features/Category/categoryApi";
import UpdateCategoryModal from "./CategoryModal/UpdateCategoryModal";
import { TCategory } from "../../../../Interface";
import AddCategoryModal from "./CategoryModal/AddCategoryModal";




const CategoryManagement: React.FC = () => {
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;

  const {
    data = {},
    isLoading,
    error,
  } = useGetAllCategoriesQuery({
    searchTerm: searchName,
    page: currentPage,
    limit,
  });

  const { data: categories = [], meta } = data?.data || {};
  const { total } = meta || {};

  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };



  // Delete category
  const handleDelete = async (CategoryId: string) => {
    try {
      const res = await deleteCategory(CategoryId);
      if (res.data.success) {
        message.open({
          type: "success",
          content: `Category deleted successfully!`,
        });
      } else if (res.error) {
    
        if ('data' in res.error) {
          // For FetchBaseQueryError, safely access the `data` property
          const errorMessage = (res.error.data as { message?: string })?.message || "Category deleted error occurred.";
          message.error(errorMessage);
      } else if ('message' in res.error) {
          // For SerializedError, handle the `message` property
          message.error(res.error.message || "Category deleted error occurred.");
      } else {
          // Handle unknown error types
          message.error("An unknown error occurred.");
      }
      }
    } catch (error) {
      console.log(error);
      message.open({
        type: "error",
        content: "Failed to delete category.",
      });
    }
  };

  const columns: TableProps<TCategory>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "NO. of Products",
      dataIndex: "noOfProducts",
      key: "noOfProducts",
      render: (record) => (
        <span>{record?.products?.length || 0}</span>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
    {
      title: "Action",
      key: "action",
      render: (record: TCategory) => (
        <Space size="middle">
          <UpdateCategoryModal category={record} />
          <Popconfirm
            title="Are you sure you want to activate this shop?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >

          <Button danger loading={isDeleting}>
            Delete
          </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen w-full">
      <Spin tip="Loading..." />
    </div>;
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description="Failed to load categories."
        type="error"
        showIcon
      />
    );
  }

  return (
    <div className="p-5 rounded-lg">
      <div className="bg-white p-4">
        <h1 className="text-2xl font-semibold mb-3">Category Management</h1>
        {/* Filters Section */}
        <Row gutter={16} className="mb-4">
          <Col span={8}>
            {/* Total Count */}
            <div className="text-gray-600">
              Total Categories: <strong>{total || 0}</strong>
            </div>
          </Col>
          <Col span={2}></Col>
          <Col span={6}>
            <Input
              type="text"
              placeholder="Search by Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              allowClear
            />
          </Col>
          <Col span={8} className="flex justify-end">
            <AddCategoryModal />
          </Col>
        </Row>

        {/* Categories Table */}
        <Table<TCategory>
          columns={columns}
          rowKey="id"
          dataSource={categories}
          pagination={false} // Custom Pagination Below
        />

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
    </div>
  );
};

export default CategoryManagement;
