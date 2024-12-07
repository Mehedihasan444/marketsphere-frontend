import React, { useState } from "react";
import {
  Table,
  Tag,
  Button,
  Input,
  Select,
  DatePicker,
  Space,
  Modal,
  Pagination,
  Spin,
  message,
  Alert,
} from "antd";
import { useGetAllTransactionsQuery } from "../../../../Redux/Features/Transaction/transactionApi";

const { Option } = Select;
const { RangePicker } = DatePicker;

interface Transaction {
  id: string;
  user: string;
  amount: number;
  status: string;
  date: string;
  type: string;
}

const MonitorTransactions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [dateRange, setDateRange] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const limit = 10;

  const {
    data = {},
    isLoading,
    error,
  } = useGetAllTransactionsQuery({
    status: selectedStatus,
    type: selectedType,
    search: searchQuery,
    page: currentPage,
    limit,
    startDate: dateRange[0],
    endDate: dateRange[1],
  });

  const { data:transactions = [], meta } = data?.data || {};
  const { total } = meta || {};

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    setCurrentPage(1); // Reset page on filter change
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    setCurrentPage(1);
  };

  const handleDateRangeChange = (dates: any) => {
    setDateRange(dates ? [dates[0].toISOString(), dates[1].toISOString()] : []);
    setCurrentPage(1);
  };

  const openTransactionModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setModalVisible(true);
  };

  const closeTransactionModal = () => {
    setModalVisible(false);
    setSelectedTransaction(null);
  };

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "SUCCESS" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Actions",
      key: "action",
      render: (_: any, record: Transaction) => (
        <Button onClick={() => openTransactionModal(record)}>View</Button>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Spin tip="Loading transactions..." />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description="Failed to load transactions. Please try again."
        type="error"
        showIcon
      />
    );
  }
  return (
    <div className="p-5 bg-white rounded-lg">
      {/* Filters */}
      <Space className="mb-4" size="large">
        <Input
          placeholder="Search by Transaction ID or User"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          allowClear
        />
        <Select
          placeholder="Filter by Status"
          value={selectedStatus}
          onChange={handleStatusChange}
          allowClear
          style={{ width: 150 }}
        >
          <Option value="SUCCESS">Success</Option>
          <Option value="FAILED">Failed</Option>
          <Option value="PENDING">Pending</Option>
        </Select>
        <Select
          placeholder="Filter by Type"
          value={selectedType}
          onChange={handleTypeChange}
          allowClear
          style={{ width: 150 }}
        >
          <Option value="DEBIT">Debit</Option>
          <Option value="CREDIT">Credit</Option>
        </Select>
        <RangePicker onChange={handleDateRangeChange} />
      </Space>

      {/* Transactions Table */}
      <Table
        columns={columns}
        dataSource={transactions||[]}
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

      {/* Transaction Detail Modal */}
      <Modal
        visible={modalVisible}
        title="Transaction Details"
        onCancel={closeTransactionModal}
        footer={[
          <Button key="close" onClick={closeTransactionModal}>
            Close
          </Button>,
        ]}
      >
        {selectedTransaction && (
          <div>
            <p>
              <strong>ID:</strong> {selectedTransaction.id}
            </p>
            <p>
              <strong>User:</strong> {selectedTransaction.user}
            </p>
            <p>
              <strong>Amount:</strong> ${selectedTransaction.amount.toFixed(2)}
            </p>
            <p>
              <strong>Status:</strong> {selectedTransaction.status}
            </p>
            <p>
              <strong>Date:</strong> {selectedTransaction.date}
            </p>
            <p>
              <strong>Type:</strong> {selectedTransaction.type}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MonitorTransactions;
