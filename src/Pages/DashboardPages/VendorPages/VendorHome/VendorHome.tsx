import React from "react";
import { Card, Col, Row, Statistic, Table, Button, Space, Tag } from "antd";
import { DollarCircleOutlined, ShoppingCartOutlined, TeamOutlined } from "@ant-design/icons";
import { useGetVendorDashboardDataQuery } from "../../Redux/Features/Vendor/vendorApi";

// ! 
const dashboardData={
    "data": {
      "totalSales": 25000,
      "totalOrders": 1200,
      "totalProducts": 50,
      "totalCustomers": 150,
      "recentOrders": [
        {
          "orderId": "ORD12345",
          "customerName": "John Doe",
          "totalAmount": 150.75,
          "status": "Completed"
        },
        {
          "orderId": "ORD12346",
          "customerName": "Jane Smith",
          "totalAmount": 75.50,
          "status": "Pending"
        },
        {
          "orderId": "ORD12347",
          "customerName": "Emily Johnson",
          "totalAmount": 99.99,
          "status": "Cancelled"
        }
      ]
    }
  }
  

const VendorHome: React.FC = () => {
  // Fetch vendor-specific dashboard data
//   const { data, isLoading, error } = useGetVendorDashboardDataQuery();

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error loading dashboard data. Please try again.</div>;

//   const {
//     totalSales,
//     totalOrders,
//     totalProducts,
//     totalCustomers,
//     recentOrders,
//   } = data?.data || {};
  const {
    totalSales,
    totalOrders,
    totalProducts,
    totalCustomers,
    recentOrders,
  } = dashboardData.data || {};

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
      render: (_: any, record: any) => (
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
              value={totalSales}
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
              title="Total Customers"
              value={totalCustomers}
              prefix={<TeamOutlined />}
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
