import React from "react";
import { Card, Col, Row, Typography, Spin, Alert } from "antd";
import {
  UserOutlined,
  ShopOutlined,
  DollarCircleOutlined,
  ShoppingCartOutlined,
  TagsOutlined,
  AppstoreOutlined,
  TeamOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useGetAdminDashboardDataQuery } from "../../../../Redux/Features/DashboardHome/dashboardHomeApi";

const { Title } = Typography;

const AdminHome: React.FC = () => {
  const { data = {}, isLoading, error } = useGetAdminDashboardDataQuery("");
  const dashboardData = data.data || {};

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
        description="Failed to load data."
        type="error"
        showIcon
      />
    );
  }

  return (
    <div className="bg-neutral-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <Title level={2} className="mb-4">
          Admin Dashboard Overview
        </Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={8}>
            <Card
              title="Total Users"
              bordered={false}
              className="shadow-md"
              extra={<TeamOutlined className="text-2xl text-blue-500" />}
            >
              <Title level={3} className="text-blue-600">
                {dashboardData.totalUsers}
              </Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Card
              title="Total Vendors"
              bordered={false}
              className="shadow-md"
              extra={<ShopOutlined className="text-2xl text-orange-500" />}
            >
              <Title level={3} className="text-orange-600">
                {dashboardData.totalVendors}
              </Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Card
              title="Total Customers"
              bordered={false}
              className="shadow-md"
              extra={<UserOutlined className="text-2xl text-green-500" />}
            >
              <Title level={3} className="text-green-600">
                {dashboardData.totalCustomers}
              </Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Card
              title="Total Orders"
              bordered={false}
              className="shadow-md"
              extra={<ShoppingCartOutlined className="text-2xl text-red-500" />}
            >
              <Title level={3} className="text-red-600">
                {dashboardData.totalOrders}
              </Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Card
              title="Total Revenue"
              bordered={false}
              className="shadow-md"
              extra={
                <DollarCircleOutlined className="text-2xl text-gold-500" />
              }
            >
              <Title level={3} className="text-gold-600">
                ${dashboardData.totalRevenue.toFixed(2)}
              </Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Card
              title="Total Products"
              bordered={false}
              className="shadow-md"
              extra={<TagsOutlined className="text-2xl text-purple-500" />}
            >
              <Title level={3} className="text-purple-600">
                {dashboardData.totalProducts}
              </Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Card
              title="Total Categories"
              bordered={false}
              className="shadow-md"
              extra={<AppstoreOutlined className="text-2xl text-teal-500" />}
            >
              <Title level={3} className="text-teal-600">
                {dashboardData.totalCategories}
              </Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Card
              title="Total Shops"
              bordered={false}
              className="shadow-md"
              extra={<ShopOutlined className="text-2xl text-indigo-500" />}
            >
              <Title level={3} className="text-indigo-600">
                {dashboardData.totalShops}
              </Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Card
              title="Total Reviews"
              bordered={false}
              className="shadow-md"
              extra={<StarOutlined className="text-2xl text-pink-500" />}
            >
              <Title level={3} className="text-pink-600">
                {dashboardData.totalReviews}
              </Title>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AdminHome;
