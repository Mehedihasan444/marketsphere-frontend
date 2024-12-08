import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddShopModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [addShop, { isLoading }] = useAddShopMutation();

  const handleSubmit = async (values: any) => {
    try {
      const response = await addShop(values).unwrap();
      if (response.success) {
        message.success("Shop added successfully!");
        form.resetFields();
        setIsModalOpen(false);
      } else {
        message.error(response.message || "Failed to add shop.");
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred while adding the shop.");
    }
  };

  const handleUpload = (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} uploaded successfully.`);
      return info.file.response?.url || "";
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} upload failed.`);
    }
  };

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Shop
      </Button>
      <Modal
        title="Add New Shop"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            status: "PENDING",
          }}
        >
          <Form.Item
            name="name"
            label="Shop Name"
            rules={[{ required: true, message: "Please enter the shop name!" }]}
          >
            <Input placeholder="Enter shop name" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please provide a description!" },
            ]}
          >
            <Input.TextArea placeholder="Enter shop description" rows={4} />
          </Form.Item>

          <Form.Item name="logo" label="Shop Logo">
            <Upload
              name="file"
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture"
              onChange={handleUpload}
            >
              <Button icon={<UploadOutlined />}>Upload Logo</Button>
            </Upload>
          </Form.Item>

          <Form.Item name="banner" label="Shop Banner">
            <Upload
              name="file"
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture"
              onChange={handleUpload}
            >
              <Button icon={<UploadOutlined />}>Upload Banner</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select a status!" }]}
          >
            <Select>
              <Option value="PENDING">Pending</Option>
              <Option value="ACTIVE">Active</Option>
              <Option value="BLACKLISTED">Blacklisted</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Add Shop
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddShopModal;
