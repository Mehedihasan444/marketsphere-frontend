import React from "react";
import { Form, Input, Button, message } from "antd";
import { useSendBecomeVendorRequestMutation } from "../../../../Redux/Features/BecomeSeller/becomeSellerApi";

const BecomeSeller: React.FC = () => {
  const [form] = Form.useForm();
  const [sendBecomeVendorRequest, { isLoading }] =
    useSendBecomeVendorRequestMutation(); 

  const handleSubmit = async (values: any) => {
    console.log(values)
    try {
      const response = await sendBecomeVendorRequest(values);
      console.log(response);
      if (response?.data?.success) {
        message.success(
          "Your request to become a seller has been submitted successfully!"
        );
        form.resetFields();
        // setUploadedFiles([]);
      } else if (response?.error) {
        message.error(response?.error?.data?.message);
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred while submitting your request.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Apply to Become a Seller</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ name: "", email: "", reason: "" , phone: "", address: ""}}
      >
        <div className="flex justify-between items-center gap-4">
          <Form.Item
            name="name"
            label="Full Name"
            rules={[
              { required: true, message: "Please enter your full name!" },
            ]}
            className="flex-1"
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
            className="flex-1"
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
        </div>
        <div className="flex justify-between items-center gap-4">
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: "Please enter your full name!" },
            ]}
            className="flex-1"
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please enter your address!" }]}
            className="flex-1"
          >
            <Input placeholder="Enter your address" />
          </Form.Item>
        </div>

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

        {/* <Form.Item
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
        </Form.Item> */}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
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
