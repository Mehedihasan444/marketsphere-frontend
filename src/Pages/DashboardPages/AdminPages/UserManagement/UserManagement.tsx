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

const UserManagement: React.FC = () => {
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
    role: selectedRole,
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
      if (res.data.success) {
        message.open({
          type: "success",
          content: `User status updated successfully!`,
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
        content: "Failed to update user status.",
      });
    }
  };

  // Update user role
  const onRoleUpdate = async (UserId: string, newRole: string) => {
    try {
      const res = await updateUser({ UserId, role: newRole });
      if (res.data.success) {
        message.open({
          type: "success",
          content: `User role updated successfully!`,
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
        content: "Failed to update user role.",
      });
    }
  };
  // Delete user
  const handleDelete = async (UserId: string) => {
    try {
      const res = await deleteUser(UserId);
      if (res.data.success) {
        message.open({
          type: "success",
          content: `User deleted successfully!`,
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
        content: "Failed to delete user.",
      });
    }
  };
  const columns: TableProps<DataType>["columns"] = [
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
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role, record) => (
        <Select
          value={role}
          onChange={(value) => onRoleUpdate(record.id, value)}
          style={{ width: "120px" }}
          disabled={isUpdating}
        >
          <Option value="ADMIN">Admin</Option>
          <Option value="VENDOR">Vendor</Option>
          <Option value="CUSTOMER">Customer</Option>
        </Select>
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
          <Button
            danger
            onClick={() => handleDelete(record.id)}
            loading={isDeleting}
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
        description="Failed to load users."
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

export default UserManagement;