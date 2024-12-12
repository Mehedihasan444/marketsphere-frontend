import React, { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { useAddCategoryMutation } from "../../../../../Redux/Features/Category/categoryApi";

// const { Option } = Select;
const { TextArea } = Input;
const AddCategoryModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>();
  const [form] = Form.useForm();
  const [addCategory, { isLoading }] = useAddCategoryMutation();


  const handleSubmit = async (values: {
    name: string;
    description: string;
    image: File;
  }) => {
    try {
      const formData = new FormData();
      const data = {
        name: values.name,
        description: values.description,
      };
      formData.append("data", JSON.stringify(data));
      if (file) {
        formData.append("image", file);
      }
      const response = await addCategory(formData);
      if (response?.data?.success) {
        message.success("Category added successfully!");
        form.resetFields(); // Reset the form
        setOpen(false); // Close the modal
      } else if (response?.error) {
        message.error(
          response?.error?.data?.message || "Failed to add category."
        );
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
    setFile(null);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Category
      </Button>
      <Modal
        title="Add Category"
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
            rules={[
              { required: true, message: "Please enter a category name!" },
            ]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter category description!" },
            ]}
          >
            <TextArea placeholder="Enter category name" />
          </Form.Item>
          <Form.Item
            name="image"
            label="Category Image"
          // rules={[
          //   { required: true, message: "Please select a category image!" },
          // ]}
          >
            {
              file &&
              <img src={file ? URL.createObjectURL(file) : ""} alt="category" className="w-16 h-auto mb-2" />
            }
            <Input
              type="file"
              variant="outlined"
              accept="image/*"
              onChange={(e) => setFile(e.target.files![0])}
            />
          </Form.Item>

          <Form.Item className="flex justify-end items-center gap-4">
            <Button onClick={handleCancel} className="mr-4">Cancel</Button>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddCategoryModal;
