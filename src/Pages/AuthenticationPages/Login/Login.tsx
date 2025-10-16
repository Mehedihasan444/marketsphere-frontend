import React from "react";
import type { FormProps } from "antd";
import {

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
import { BiArrowBack } from "react-icons/bi";

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
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const userInfo = {
      email: values.email as string,
      password: values.password as string,
    };
    try {
      const res = await login(userInfo);
      if (res && res?.data?.success) {
        const user = verifyToken(res.data.data.accessToken) as TJwtPayload;
        dispatch(setUser({ user: user, token: res.data.data.accessToken }));
        message.open({
          type: "success",
          content: `Logged in as ${user?.name}`,
        });
        if (user.role === "ADMIN" || user.role === "VENDOR" || user.role === "SUPER_ADMIN") {
          navigate(`/dashboard/${user.role.toLowerCase()}/home`);
        } else {

          navigate(`/`);
        }
      } else if (res && res?.error) {

        if ('data' in res.error) {
          // For FetchBaseQueryError, safely access the `data` property
          const errorMessage = (res.error.data as { message?: string })?.message || "Login error occurred.";
          message.error(errorMessage);
        } else if ('message' in res.error) {
          // For SerializedError, handle the `message` property
          message.error(res.error.message || "Login error occurred.");
        } else {
          // Handle unknown error types
          message.error("An unknown error occurred.");
        }
      }
    } catch (error) {
      console.log(error);
      message.open({
        type: "error",
        content: "Login Failed!",
      });
    }
  };


// Add interface for credentials
interface Credentials {
  email: string;
  password: string;
}

// Add default values object
const defaultCredentials: Record<string, Credentials> = {
  admin: {
    email: "admin@marketsphere.com",
    password: "password123",
  },
  vendor: {
    email: "vendor1@marketsphere.com",
    password: "password123",
  },
  customer: {
    email: "customer1@gmail.com",
    password: "password123",
  },
};

// Update setDefaultValues function
const setDefaultValues = (type: keyof typeof defaultCredentials) => {
  form.setFieldsValue(defaultCredentials[type]);
};

  return (
    <div className="flex bg-neutral-100 flex-col justify-center items-center min-h-screen "
    // style={{
    //   background: "url('https://t4.ftcdn.net/jpg/02/58/86/97/360_F_258869730_KSydnAki0M5lBLRthoTtCfIxkwhA5VzF.jpg')",
    //   backgroundSize: "cover",
    //   backgroundPosition: "center",
    //   backgroundRepeat: "no-repeat",

    // }}
    >
        <div className="flex justify-center items-center max-w-sm mx-auto w-full gap-4">
        <Button   className="w-full " onClick={() => navigate("/")} iconPosition="start" icon={<BiArrowBack/>}>Back To Home</Button>
       

      </div>
      <div className="flex justify-between items-center max-w-lg mx-auto w-full p-4 gap-4">
        <Button onClick={() => setDefaultValues("admin")}>Admin Credentials</Button>
        <Button onClick={() => setDefaultValues("vendor")}>Vendor Credentials</Button>
        <Button onClick={() => setDefaultValues("customer")}>Customer Credentials</Button>

      </div>
      <div className="p-8 bg-white shadow rounded-lg max-w-sm w-full ">
        <Title level={3} className="text-center">
          Welcome Back
        </Title>
        <Text className="block text-center mb-6" type="secondary">
          Please log in to your account
        </Text>
        <Form
        form={form}
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
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
            <a href="/forget-password" className="text-blue-500">
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
              loading={isLoading}
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
