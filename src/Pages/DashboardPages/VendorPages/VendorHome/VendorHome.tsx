/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Card, Col, Row, Statistic, Table, Button, Space, Tag, Alert, Spin } from "antd";
import { DollarCircleOutlined, ShoppingCartOutlined, TeamOutlined } from "@ant-design/icons";
import { useGetVendorDashboardDataQuery } from "../../../../Redux/Features/DashboardHome/dashboardHomeApi";
import { FcRatings } from "react-icons/fc";

// ! have to remove this
const recentOrders= [
        {
          orderId: "ORD12345",
          customerName: "John Doe",
          totalAmount: 150.75,
          status: "Completed"
        },
        {
          orderId: "ORD12346",
          customerName: "Jane Smith",
          totalAmount: 75.50,
          status: "Pending"
        },
        {
          orderId: "ORD12347",
          customerName: "Emily Johnson",
          totalAmount: 99.99,
          status: "Cancelled"
        }
      ]

const VendorHome: React.FC = () => {
  // Fetch vendor-specific dashboard data
  const { data={}, isLoading, error } = useGetVendorDashboardDataQuery("");
const { data:dashboardData } = data;
if (isLoading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spin size="large" />
    </div>
  );
}

if (error) {
  return (
    <Alert
      message="Error"
      description="Failed to load data."
      type="error"
      showIcon
    />
  );
}

  const {
    totalOrders,
    totalEarnings,
    totalProducts,
    totalReviews,
    averageRating,

  } = dashboardData ;

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color =
          status === "Completed"
            ? "green"
            : status === "Pending"
            ? "orange"
            : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space>
          <Button type="link" size="small">
            View
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5 bg-white rounded-lg">
      {/* Dashboard Stats */}
      <Row gutter={16} className="mb-5">
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Sales"
              value={totalEarnings}
              prefix={<DollarCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Orders"
              value={totalOrders}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Products"
              value={totalProducts}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Reviews"
              value={totalReviews}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} className="mb-5">
        <Col span={6}>
          <Card>
            <Statistic
              title="AVerage Rating"
              value={averageRating}
              prefix={<FcRatings />}
            />
          </Card>
        </Col>

      </Row>

      {/* Recent Orders Table */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="mb-4 text-xl font-semibold">Recent Orders</h2>
        <Table
          columns={columns}
          dataSource={recentOrders}
          rowKey="orderId"
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
};

export default VendorHome;
