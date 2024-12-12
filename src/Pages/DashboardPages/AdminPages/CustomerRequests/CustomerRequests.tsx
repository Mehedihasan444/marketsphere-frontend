/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Table, Button, Modal, message, Tag, Alert, Spin, Popconfirm } from "antd";
import {
  useGetAllBecomeVendorRequestsQuery,
  useUpdateBecomeVendorRequestMutation,
} from "../../../../Redux/Features/BecomeSeller/becomeSellerApi";
import { BecomeVendorRequestStatus } from "../../../../Interface";

const CustomerRequests: React.FC = () => {
  const {
    data = {},
    isLoading,
    error,
  } = useGetAllBecomeVendorRequestsQuery("");
  const requests = data.data || {};

  const [updateBecomeVendorRequest, { isLoading: isUpdating }] =
    useUpdateBecomeVendorRequestMutation();

  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApprove = async (id: string) => {
    try {
      const res = await updateBecomeVendorRequest({ id, status: "APPROVED" }).unwrap();
      console.log(res)
      message.success("Request approved successfully!");
    } catch (error) {
      console.log(error);
      message.error("Failed to approve request!");
    }
  };

  const handleReject = async (id: string) => {
    try {
      const res = await updateBecomeVendorRequest({ id, status: BecomeVendorRequestStatus.REJECTED }).unwrap();
      console.log(res)
      message.success("Request rejected successfully!");
    } catch (error) {
      console.log(error);
      message.error("Failed to reject request!");
    }
  };

  const openDetailsModal = (request: any) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setSelectedRequest(null);
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "name",
      key: "name",
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
      render: (status: string) => {
        const color =
          status === "pending"
            ? "orange"
            : status === "approved"
              ? "green"
              : "red";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            loading={isUpdating}
            onClick={() => handleApprove(record.id)}
            disabled={record.status !== "PENDING"}
          >
            Approve
          </Button>
          <Popconfirm
            title="Are you sure you want to reject this request?"
            onConfirm={() => handleReject(record.id)}
            okText="Yes"
            cancelText="No"

          >


            <Button
              danger
              disabled={record.status !== "PENDING"}
            >
              Reject
            </Button>
          </Popconfirm>
          <Button onClick={() => openDetailsModal(record)}>View Details</Button>
        </div>
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
    <div>
      <h2 className="text-lg font-bold mb-4">
        Customer Requests to Become Vendors
      </h2>
      <Table
        columns={columns}
        dataSource={requests?.map((req: any) => ({ ...req, key: req.id }))}
        loading={isLoading}
        pagination={{ pageSize: 10 }}
      />

      {/* Modal for Viewing Details */}
      <Modal
        title="Customer Request Details"
        visible={isModalOpen}
        onCancel={closeDetailsModal}
        footer={[
          <Button key="close" onClick={closeDetailsModal}>
            Close
          </Button>,
        ]}
      >
        {selectedRequest && (
          <div>
            <p>
              <strong>Name:</strong> {selectedRequest.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedRequest.email}
            </p>
            <p>
              <strong>Status:</strong> {selectedRequest.status}
            </p>
            <p>
              <strong>Reason:</strong>{" "}
              {selectedRequest.reason || "No reason provided"}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CustomerRequests;
