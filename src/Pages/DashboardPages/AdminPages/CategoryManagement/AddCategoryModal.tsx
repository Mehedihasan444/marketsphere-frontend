import React, { useState } from "react";
import { Button, Modal, Form, Input, Select, message } from "antd";
import { useAddCategoryMutation } from "../../../../Redux/Features/Category/categoryApi";

const { Option } = Select;

const AddCategoryModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [addCategory, { isLoading }] = useAddCategoryMutation();

  const handleSubmit = async (values: { name: string; status: string }) => {
    try {
      const response = await addCategory(values);
      if (response?.data?.success) {
        message.success("Category added successfully!");
        form.resetFields(); // Reset the form
        setOpen(false); // Close the modal
      } else {
        message.error(response?.error?.data?.message || "Failed to add category.");
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred while adding the category.");
    }
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    form.resetFields(); // Reset the form when the modal is closed
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Category
      </Button>
      <Modal
        title="Add New Category"
        open={open}
        onCancel={handleCancel}
        footer={null} // Remove default OK and Cancel buttons
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="p-4"
        >
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: "Please enter a category name!" }]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>
          <Form.Item
            name="image"
            label="Category Image"
            rules={[{ required: true, message: "Please select a category image!" }]}
          >
            <Input type="file"  variant="outlined"  />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select a status!" }]}
          >
            <Select placeholder="Select category status">
              <Option value="ACTIVE">Active</Option>
              <Option value="INACTIVE">Inactive</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="w-full"
            >
              Add Category
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddCategoryModal;
