import React from "react";
import { Card, Col, Row, Typography, Spin, Alert } from "antd";
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  StarOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { useGetCustomerDashboardDataQuery } from "../../../../Redux/Features/DashboardHome/dashboardHomeApi";

const { Title} = Typography;

const CustomerHome: React.FC = () => {
  const { data={}, isLoading, error } = useGetCustomerDashboardDataQuery("");
  const dashboardData = data.data || {};

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

  return (
    <div className="bg-neutral-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <Title level={2} className="mb-4">
          Welcome to Your Dashboard
        </Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={8}>
            <Card
              title="Total Orders"
              bordered={false}
              className="shadow-md"
              extra={
                <ShoppingCartOutlined className="text-2xl text-blue-500" />
              }
            >
              <Title level={3} className="text-blue-600">
                {dashboardData.totalOrders}
              </Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Card
              title="Total Spent"
              bordered={false}
              className="shadow-md"
              extra={
                <DollarCircleOutlined className="text-2xl text-green-500" />
              }
            >
              <Title level={3} className="text-green-600">
                ${dashboardData.totalSpent.toFixed(2)}
              </Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Card
              title="Total Saved"
              bordered={false}
              className="shadow-md"
              extra={<SaveOutlined className="text-2xl text-yellow-500" />}
            >
              <Title level={3} className="text-yellow-600">
                ${dashboardData.totalSaved.toFixed(2)}
              </Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Card
              title="Total Reviews"
              bordered={false}
              className="shadow-md"
              extra={<StarOutlined className="text-2xl text-purple-500" />}
            >
              <Title level={3} className="text-purple-600">
                {dashboardData.totalReviews}
              </Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Card
              title="Total Follows"
              bordered={false}
              className="shadow-md"
              extra={<HeartOutlined className="text-2xl text-pink-500" />}
            >
              <Title level={3} className="text-pink-600">
                {dashboardData.totalFollows}
              </Title>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CustomerHome;
