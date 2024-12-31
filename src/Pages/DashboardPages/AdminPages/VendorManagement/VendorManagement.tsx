import React, { useState } from "react";
import {
  Alert,
  Input,
  Spin,
  Table,
  Select,
  Pagination,
  Row,
  Col,
  message,
  Space,
  Button,
  Popconfirm,
} from "antd";
import type { TableProps } from "antd";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "../../../../Redux/Features/User/userApi";

const { Option } = Select;

interface DataType {
  id: string;
  name: string;
  status: string;
  role: string;
  email: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

const VendorManagement: React.FC = () => {
  const [searchEmail, setSearchEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;

  const {
    data = {},
    isLoading,
    error,
  } = useGetAllUsersQuery({
    role: "VENDOR",
    userStatus: selectedStatus,
    email: searchEmail,
    page: currentPage,
    limit,
  });

  const { data: users = [], meta } = data?.data || {};
  const { total } = meta || {};

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
    setCurrentPage(1); // Reset to page 1 when filter changes
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    setCurrentPage(1); // Reset to page 1 when filter changes
  };
  // Update user status
  const onStatusUpdate = async (UserId: string, newStatus: string) => {
    try {
      const res = await updateUser({ UserId, status: newStatus });
      if (res?.data?.success) {
        message.open({
          type: "success",
          content: `User status updated successfully!`,
        });
      } else if (res?.error) {
      
        if ('data' in res.error) {
          // For FetchBaseQueryError, safely access the `data` property
          const errorMessage = (res.error.data as { message?: string })?.message || "Failed to update status .";
          message.error(errorMessage);
      } else if ('message' in res.error) {
          // For SerializedError, handle the `message` property
          message.error(res.error.message || "Failed to update status .");
      } else {
          // Handle unknown error types
          message.error("An unknown error occurred.");
      }
      }
    } catch (error) {
      console.log(error);
      message.open({
        type: "error",
        content: "Failed to update user status.",
      });
    }
  };

  // Delete user
  const handleDelete = async (UserId: string) => {
    try {
      const res = await deleteUser(UserId);
      if (res?.data?.success) {
        message.open({
          type: "success",
          content: `User deleted successfully!`,
        });
      } else if (res.error) {
 

        if ('data' in res.error) {
          // For FetchBaseQueryError, safely access the `data` property
          const errorMessage = (res.error.data as { message?: string })?.message || "Failed to delete user .";
          message.error(errorMessage);
      } else if ('message' in res.error) {
          // For SerializedError, handle the `message` property
          message.error(res.error.message || "Failed to delete user .");
      } else {
          // Handle unknown error types
          message.error("An unknown error occurred.");
      }
      }
    } catch (error) {
      console.log(error);
      message.open({
        type: "error",
        content: "Failed to delete user.",
      });
    }
  };
  const columns: TableProps<DataType>["columns"] = [
    {
      title: '#',
      key: 'index',
      render: (_text: any, _record: any, index: number) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          value={status}
          onChange={(value) => onStatusUpdate(record.id, value)}
          style={{ width: "100px" }}
          disabled={isUpdating}
        >
          <Option value="ACTIVE">Active</Option>
          <Option value="SUSPENDED">Suspended</Option>
          <Option value="BLOCKED">Blocked</Option>
        </Select>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Shop Name",
      dataIndex: "shopName",
      key: "shopName",
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
          <Popconfirm
            title="Are you sure you want to delete this vendor?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              // onClick={() => handleDelete(record.id)}
              loading={isDeleting}
            >
              Delete
            </Button>
          </Popconfirm>
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
        description="Failed to load vendors."
        type="error"
        showIcon
      />
    );
  }

  return (
    <div className=" p-5 rounded-lg  ">
      <div className=" bg-white p-4">
        {/* Filters Section */}
        <Row gutter={16} className="mb-4">
          <Col span={8}>
            {/* Total Count */}
            <div className=" text-gray-600">
              Total Users: <strong>{total || 0}</strong>
            </div>
          </Col>
          <Col span={8}>
            <Input
              type="text"
              placeholder="Search by Email"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              allowClear
            />
          </Col>
          <Col span={4}>
            <Select
              placeholder="Filter by Role"
              value={selectedRole}
              onChange={handleRoleChange}
              allowClear
              className="w-full"
            >
              <Option value="">All Roles</Option>
              <Option value="ADMIN">Admin</Option>
              <Option value="VENDOR">Vendor</Option>
              <Option value="CUSTOMER">Customer</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Select
              placeholder="Filter by Status"
              value={selectedStatus}
              onChange={handleStatusChange}
              allowClear
              className="w-full"
            >
              <Option value="">All Statuses</Option>
              <Option value="ACTIVE">Active</Option>
              <Option value="SUSPENDED">Suspended</Option>
              <Option value="BLOCKED">Blocked</Option>
            </Select>
          </Col>
        </Row>

        {/* Users Table */}
        <Table<DataType>
          columns={columns}
          rowKey="id"
          dataSource={users}
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

export default VendorManagement;
