/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useResetPasswordMutation } from "../../../Redux/Features/Auth/authApi";
import { Form, Input, Button, message } from "antd"; // Importing Ant Design components

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [resetPassword] = useResetPasswordMutation();

  // Getting the URL parameters for token and id (you can replace this with React Router or any other method)
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  const handleSubmit = async (values: any) => {
    const { oldPassword, newPassword, confirmPassword } = values;

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (token && id) {
      try {
        await resetPassword({ userId: id, newPassword, oldPassword, token });
        message.success("Password reset successfully!");
        // Clear form fields
        setOldPassword("");
        setPassword("");
        setConfirmPassword("");
      } catch (error) {
        console.log(error);
        setError("Failed to reset password.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please enter your new password below.
          </p>
        </div>

        <Form
          name="reset-password"
          className="mt-8 space-y-6"
          onFinish={handleSubmit}
          initialValues={{ oldPassword, newPassword: password, confirmPassword }}
        >
          <div className="space-y-3">
            <Form.Item
              label="Old Password"
              name="oldPassword"
              rules={[{ required: true, message: "Please input your old password!" }]}
            >
              <Input.Password
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Old Password"
                className="w-full"
              />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[{ required: true, message: "Please input your new password!" }]}
            >
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
                className="w-full"
              />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[{ required: true, message: "Please confirm your new password!" }]}
            >
              <Input.Password
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full"
              />
            </Form.Item>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
