import React from "react";
import type { FormProps } from "antd";
import {
  Alert,
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Typography,
} from "antd";
import { useAppDispatch } from "../../../Redux/hook";
import { useLoginMutation } from "../../../Redux/Features/Auth/authApi";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../../../Utils/verifyToken";
import { setUser } from "../../../Redux/Features/Auth/authSlice";

const { Title, Text } = Typography;

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

type TJwtPayload = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};
const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const userInfo = {
      email: values.email as string,
      password: values.password as string,
    };
    try {
      const res = await login(userInfo);
      if (res && res.data.success) {
        const user = verifyToken(res.data.data.accessToken) as TJwtPayload;
        if (!user) {
          message.open({
            type: "error",
            content: "Login Failed!",
          });
          return;
        }
        dispatch(setUser({ user: user, token: res.data.data.accessToken }));
        message.open({
          type: "success",
          content: `Logged in as ${user?.name as string}`,
        });
        navigate(`/`);
      } else if (res.error) {
        message.open({
          type: "error",
          content: res?.error?.data?.message as string,
        });
      }
    } catch (error) {
      console.error(error);
      message.open({
        type: "error",
        content: "Login Failed!",
      });
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
    <Alert
      message={errorInfo.errorFields[0].errors[0]}
      type="error"
      showIcon
    />;
  };

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
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          {/* Password Field */}
          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
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
