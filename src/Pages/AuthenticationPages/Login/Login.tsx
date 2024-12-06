import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, Typography } from "antd";

const { Title, Text } = Typography;

type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Login: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white shadow-lg rounded-lg max-w-sm w-full">
        <Title level={3} className="text-center">
          Welcome Back
        </Title>
        <Text className="block text-center mb-6" type="secondary">
          Please log in to your account
        </Text>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* Username Field */}
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Please input your username!" },
            ]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          {/* Password Field */}
          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          {/* Remember Me and Forgot Password */}
          <div className="flex justify-between items-center mb-4">
            <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              noStyle
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="/forgot-password" className="text-blue-500">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="font-semibold"
            >
              Log In
            </Button>
          </Form.Item>
        </Form>

        {/* Sign Up Link */}
        <div className="text-center mt-4">
          <Text type="secondary">Don't have an account?</Text>{" "}
          <a href="/signup" className="text-blue-500">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
