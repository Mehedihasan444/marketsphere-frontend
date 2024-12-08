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
} from "antd";
import type { TableProps } from "antd";
import { useDeleteCategoryMutation, useGetAllCategoriesQuery } from "../../../../Redux/Features/Category/categoryApi";
import CategoryModal from "./CategoryModal";



interface CategoryType {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  image: string;
}

const CategoryManagement: React.FC = () => {
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;

  const {
    data = {},
    isLoading,
    error,
  } = useGetAllCategoriesQuery({
    name: searchName,
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
        message.open({
          type: "error",
          content: res.error.data.message,
        });
      }
    } catch (error) {
      console.log(error);
      message.open({
        type: "error",
        content: "Failed to delete category.",
      });
    }
  };

  const columns: TableProps<CategoryType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "NO. of Products",
      dataIndex: "noOfProducts",
      key: "noOfProducts",
      render: ( record) => (
        <span>{record?.products?.length||0}</span>
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
      render: (_, record) => (
        <Space size="middle">
           <CategoryModal initialData={record}/>
          <Button danger onClick={() => handleDelete(record.id)} loading={isDeleting}>
            Delete
          </Button>
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
        {/* Filters Section */}
        <Row gutter={16} className="mb-4">
          <Col span={8}>
            {/* Total Count */}
            <div className="text-gray-600">
              Total Categories: <strong>{total || 0}</strong>
            </div>
          </Col>
          <Col span={4}></Col>
          <Col span={8}>
            <Input
              type="text"
              placeholder="Search by Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              allowClear
            />
          </Col>
          <Col span={4}>
            <CategoryModal initialData={null}/>
          </Col>
        </Row>

        {/* Categories Table */}
        <Table<CategoryType>
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
