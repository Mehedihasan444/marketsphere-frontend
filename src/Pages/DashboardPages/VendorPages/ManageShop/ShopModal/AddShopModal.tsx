/* eslint-disable @typescript-eslint/no-explicit-any */
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
      const res = await addShop(formData);

      if (res?.data?.success) {
        message.success("Shop added successfully!");
        form.resetFields();
        setLogoFile(null);
        setBannerFile(null);
        setIsModalOpen(false);
      } else if(res?.error) {

        if ('data' in res.error) {
          // For FetchBaseQueryError, safely access the `data` property
          const errorMessage = (res.error.data as { message?: string })?.message || "Failed to add shop.";
          message.error(errorMessage);
      } else if ('message' in res.error) {
          // For SerializedError, handle the `message` property
          message.error(res.error.message || "Failed to add shop.");
      } else {
          // Handle unknown error types
          message.error("An unknown error occurred.");
      }
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred while adding the shop.");
    }
  };

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false)
    setLogoFile(null);
    setBannerFile(null);
  };

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
            <img src={logoFile?URL.createObjectURL(logoFile):""} alt="logo" className="w-16 h-auto mb-2" />
            <Input
              type="file"
              variant="outlined"
              accept="image/*"
              name="logo"
              onChange={(e) => setLogoFile(e.target.files![0])}
            />
          </Form.Item>

          <Form.Item name="banner" label="Shop Banner">
          <img src={bannerFile?URL.createObjectURL(bannerFile):""} alt="logo" className="w-16 h-auto mb-2" />

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
