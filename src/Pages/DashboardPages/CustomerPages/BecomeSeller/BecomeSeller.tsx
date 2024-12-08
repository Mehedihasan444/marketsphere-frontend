// ! have to complete this page
import React, { useState } from "react";
import { Form, Input, Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
// import { useBecomeSellerMutation } from "../../Redux/Features/Requests/requestApi";

const BecomeSeller: React.FC = () => {
  const [form] = Form.useForm();
//   const [becomeSeller, { isLoading }] = useBecomeSellerMutation(); // Mutation for submitting seller request
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]); // For handling uploaded files

  const handleFileUpload = (file: File) => {
    setUploadedFiles((prevFiles) => [...prevFiles, file]);
    return false; // Prevent auto upload by Ant Design
  };

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("reason", values.reason);

    uploadedFiles.forEach((file) => {
      formData.append("documents", file); // Append uploaded files
    });

    // try {
    //   const response = await becomeSeller(formData).unwrap();
    //   if (response.success) {
    //     message.success("Your request to become a seller has been submitted successfully!");
    //     form.resetFields();
    //     setUploadedFiles([]);
    //   } else {
    //     message.error("Failed to submit your request. Please try again.");
    //   }
    // } catch (error) {
    //   console.error(error);
    //   message.error("An error occurred while submitting your request.");
    // }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Apply to Become a Seller</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ name: "", email: "", reason: "" }}
      >
        <Form.Item
          name="name"
          label="Full Name"
          rules={[{ required: true, message: "Please enter your full name!" }]}
        >
          <Input placeholder="Enter your full name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="reason"
          label="Reason for Becoming a Seller"
          rules={[{ required: true, message: "Please provide a reason!" }]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Describe why you want to become a seller"
          />
        </Form.Item>

        <Form.Item
          name="documents"
          label="Supporting Documents (Optional)"
          extra="You can upload any supporting documents such as licenses or business proof."
        >
          <Upload
            beforeUpload={handleFileUpload}
            fileList={uploadedFiles.map((file) => ({
              uid: file.name,
              name: file.name,
              status: "done",
            }))}
            onRemove={(file) => {
              setUploadedFiles((prevFiles) =>
                prevFiles.filter((f) => f.name !== file.name)
              );
            }}
          >
            <Button icon={<UploadOutlined />}>Upload Documents</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            // loading={isLoading}
            className="w-full"
          >
            Submit Request
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BecomeSeller;
