import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Avatar, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "../../../../Redux/Features/User/userApi";
interface FormValues {
  name: string;
  phone: string;
  address: string;
}
const Profile: React.FC = () => {
  const { data = {}, isLoading: loadingProfile } = useGetMyProfileQuery("");
  const userProfile = React.useMemo(() => data.data || {}, [data]);
  const [updateMyProfile, { isLoading: updatingProfile }] =
    useUpdateMyProfileMutation();

  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState<File | null>(null);

  useEffect(() => {
    if (userProfile) {
      form.setFieldsValue({
        name: userProfile.name,
        email: userProfile.email,
      });
    }
  }, [userProfile, form]);

  const handleSubmit = async (values: FormValues) => {
    const formData = new FormData();
    const info = {
      name: values.name as string,
      phone: values.phone as string,
      address: values.address as string,
    };
    formData.append("data", JSON.stringify(info));

    if (avatar) {
      formData.append("profilePhoto", avatar);
    }

    try {
      const response = await updateMyProfile(formData).unwrap();
      console.log(response);
      if (response.success) {
        message.success("Profile updated successfully!");
      } else {
        message.error(response.message || "Failed to update profile.");
      }
    } catch (error) {
      console.log(error);
      message.error("An error occurred while updating your profile.");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
      {loadingProfile ? (
        <div className="flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            name: userProfile?.name,
            email: userProfile?.email,
            phone: userProfile?.phone,
            address: userProfile?.address,
          }}
        >
          <Form.Item label="Profile Picture">
            <div className="flex items-center gap-4">
              <Avatar
                size={64}
                src={userProfile?.profilePhoto || "/path/to/default-avatar.png"}
                alt={userProfile?.name || "User Avatar"}
              />

              <div className="flex items-center gap-4">
                <Button icon={<UploadOutlined />}>
                  <label htmlFor="profilePhoto"> Change Avatar</label>
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatar(e.target.files![0])}
                  className="hidden invisible w-0"
                  id="profilePhoto"
                  name="profilePhoto"
                />
                {
                  // Show the file name
                  avatar && (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt={userProfile?.name || "User Avatar"}
                      className="w-20 h-20 object-cover rounded-full"
                    />
                  )
                }
              </div>
            </div>
          </Form.Item>

          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" disabled />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please enter your phone number!" },
            ]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please enter your address!" }]}
          >
            <Input placeholder="Enter your address" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={updatingProfile}
              disabled={loadingProfile}
              className="w-full"
            >
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default Profile;
