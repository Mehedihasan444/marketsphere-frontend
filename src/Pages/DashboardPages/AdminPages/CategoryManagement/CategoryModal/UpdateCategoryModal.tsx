import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, message, Select } from "antd";
import { useUpdateCategoryMutation, useGetAllCategoriesQuery } from "../../../../../Redux/Features/Category/categoryApi";
import { TCategory } from "../../../../../Interface";

const { Option } = Select;
const { TextArea } = Input;
const UpdateCategoryModal: React.FC<{ category: TCategory | null }> = ({
  category,
}) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [form] = Form.useForm();
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  // Fetch all categories for parent selection
  const { data: categoriesData } = useGetAllCategoriesQuery({ limit: 100 });
  const allCategories = categoriesData?.data?.data || [];

 
  const handleSubmit = async (values: {
    name: string;
    description: string;
    parentId?: string;
    image: File;
  }) => {
    try {
      const formData = new FormData();
      const data = {
        name: values.name,
        description: values.description,
        parentId: values.parentId || null,
      };
      formData.append("data", JSON.stringify(data));
      if (file) {
        formData.append("image", file);
      }
      const res = await updateCategory({CategoryId:category?.id,formData});
      if (res?.data?.success) {
        message.success("Category updated successfully!");
        form.resetFields(); // Reset the form
        setOpen(false); // Close the modal
      } else if (res?.error) {
       
        if ('data' in res.error) {
          // For FetchBaseQueryError, safely access the `data` property
          const errorMessage = (res.error.data as { message?: string })?.message || "Failed to update category.";
          message.error(errorMessage);
      } else if ('message' in res.error) {
          // For SerializedError, handle the `message` property
          message.error(res.error.message || "Failed to update category.");
      } else {
          // Handle unknown error types
          message.error("An unknown error occurred.");
      }
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred while updating the category.");
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
  // Pre-fill form when editing
  useEffect(() => {
    if (category) {
      form.setFieldsValue(category);
    } else {
      form.resetFields();
    }
  }, [category, form]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
     Edit Category
      </Button>
      <Modal
        title={"Edit Category"}
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
            name="parentId"
            label="Parent Category (Optional)"
            help="Leave empty for top-level category"
          >
            <Select
              placeholder="Select parent category"
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {allCategories
                .filter((cat: TCategory) => !cat.parentId && cat.id !== category?.id) // Exclude self and show only top-level
                .map((cat: TCategory) => (
                  <Option key={cat.id} value={cat.id}>
                    {cat.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter category description!" },
            ]}
          >
            <TextArea placeholder="Enter category description" rows={3} />
          </Form.Item>
          <Form.Item
            name="image"
            label="Category Image"
          // rules={[
          //   { required: true, message: "Please select a category image!" },
          // ]}
          >
            <img src={file ? URL.createObjectURL(file) : category ? category?.image : ""} alt="category" className="w-16 h-auto mb-2" />
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
              Update Category
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateCategoryModal;
