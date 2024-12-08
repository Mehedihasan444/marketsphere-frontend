// ! have to implement this page
import React, { useState } from 'react';
import { Table, Button, Modal, message, Tag } from 'antd';
import { useFetchRequestsQuery, useUpdateRequestMutation } from '../../Redux/Features/Requests/requestApi';

const CustomerRequests: React.FC = () => {
  const { data: requests, isLoading } = useFetchRequestsQuery(); // Fetch requests from the API
  const [updateRequest, { isLoading: isUpdating }] = useUpdateRequestMutation(); // Mutation for updating requests

  const [selectedRequest, setSelectedRequest] = useState<any>(null); // For modal details
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApprove = async (id: string) => {
    try {
      await updateRequest({ id, status: 'approved' }).unwrap();
      message.success('Request approved successfully!');
    } catch (error) {
      message.error('Failed to approve request!');
    }
  };

  const handleReject = async (id: string) => {
    try {
      await updateRequest({ id, status: 'rejected' }).unwrap();
      message.success('Request rejected successfully!');
    } catch (error) {
      message.error('Failed to reject request!');
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
      title: 'Customer Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = status === 'pending' ? 'orange' : status === 'approved' ? 'green' : 'red';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button type="primary" onClick={() => handleApprove(record.id)} disabled={record.status !== 'pending'}>
            Approve
          </Button>
          <Button type="danger" onClick={() => handleReject(record.id)} disabled={record.status !== 'pending'}>
            Reject
          </Button>
          <Button onClick={() => openDetailsModal(record)}>View Details</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Customer Requests to Become Vendors</h2>
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
              <strong>Reason:</strong> {selectedRequest.reason || 'No reason provided'}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CustomerRequests;
