import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { useAddShopMutation } from "../../../../../Redux/Features/Shop/shopApi";


const AddShopModal: React.FC<{ vendorId: string }> = ({ vendorId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [addShop, { isLoading }] = useAddShopMutation();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const handleSubmit = async (values: any) => {
    const formData = new FormData();

    // Append text fields
    const data = {
      name: values.name,
      description: values.description,
      vendorId: vendorId, // Use the vendorId prop passed to the component
    };
    formData.append("data", JSON.stringify(data));

    // Append the logo and banner file if they exist
    if (logoFile) formData.append("logo", logoFile); // Append the logo file
    if (bannerFile) formData.append("banner", bannerFile); // Append the banner file

    try {
      // Make the API request
      const response = await addShop(formData);

      if (response?.data?.success) {
        message.success("Shop added successfully!");
        form.resetFields();
        setLogoFile(null);
        setBannerFile(null);
        setIsModalOpen(false);
      } else if(response?.error) {
        message.error(response?.error?.data.message || "Failed to add shop.");
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred while adding the shop.");
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
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
            <Input
              type="file"
              variant="outlined"
              accept="image/*"
              name="logo"
              onChange={(e) => setLogoFile(e.target.files![0])}
            />
          </Form.Item>

          <Form.Item name="banner" label="Shop Banner">
            <Input
              type="file"
              name="logo"
              accept="image/*"
              variant="outlined"
              onChange={(e) => setBannerFile(e.target.files![0])}
            />
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
