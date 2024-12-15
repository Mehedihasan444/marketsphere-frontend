
import React, { useState } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Typography, Radio, message } from "antd";
import { useRegisterMutation } from "../../../Redux/Features/Auth/authApi";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

type FieldType = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
};

const Register: React.FC = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const [role, setRole] = useState<string>("");

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const userInfo = {
      name: values.name as string,
      email: values.email as string,
      password: values.password as string,
      role: values.role ,
    };
    try {
      const res = await register(userInfo);
      if (res && res?.data?.success) {
        message.success("Registration Completed!");
        if (userInfo.role === "vendor") {
          navigate("/vendor/dashboard/home", { replace: true });
        } else {
          navigate("/login", { replace: true });
        }
      } else if (res.error) {
        if ("data" in res.error) {
          const errorMessage = (res.error.data as { message?: string })?.message || "Register error occurred.";
          message.error(errorMessage);
        } else if ("message" in res.error) {
          message.error(res.error.message || "Register error occurred.");
        } else {
          message.error("An unknown error occurred.");
        }
      }
    } catch (error) {
      message.error("Registration Failed!");
      console.log(error);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white shadow-lg rounded-lg max-w-sm w-full">
        <Title level={3} className="text-center">
          Create an Account
        </Title>
        <Text className="block text-center mb-6" type="secondary">
          Join us today! Please fill in the details below.
        </Text>
        <Form
          name="register"
          layout="vertical"
          initialValues={{ remember: true, role: "user" }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* Name Field */}
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input your name!" },
              { min: 3, message: "Name must be at least 3 characters." },
            ]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          {/* Email Field */}
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email address." },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          {/* Password Field */}
          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters." },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          {/* Confirm Password Field */}
          <Form.Item<FieldType>
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("The passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>

          {/* Role Selection */}
          <Form.Item<FieldType>
            label="Register As"
            name="role"
            rules={[{ required: true, message: "Please select a role!" }]}
          >
            <Radio.Group onChange={(e) => setRole(e.target.value)} value={role}>
              <Radio value="CUSTOMER">User</Radio>
              <Radio value="VENDOR">Vendor</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="font-semibold"
              loading={isLoading}
            >
              Register
            </Button>
          </Form.Item>
        </Form>

        {/* Already Have an Account */}
        <div className="text-center mt-4">
          <Text type="secondary">Already have an account?</Text>{" "}
          <a href="/login" className="text-blue-500">
            Log In
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;



// import React from "react";
// import type { FormProps } from "antd";
// import { Button, Form, Input, Typography } from "antd";
// import {  useRegisterMutation } from "../../../Redux/Features/Auth/authApi";
// import { message } from 'antd';
// import { useNavigate } from "react-router-dom";
// const { Title, Text } = Typography;

// type FieldType = {
//   name?: string;
//   email?: string;
//   password?: string;
//   confirmPassword?: string;
// };

// const Register: React.FC = () => {
//   const [register,{isLoading}] = useRegisterMutation();
//   const navigate = useNavigate();
//   const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
  
//     const userInfo = {
//       name: values.name as string,
//       email: values.email as string,
//       password: values.password as string,
//     };
//     try {
//       const res = await register(userInfo);
//       if (res && res?.data?.success) {
//         message.open({
//           type: 'success',
//           content: 'Registration Completed!',
//         });
//         navigate('/login', { replace: true });
//       } else if (res.error) {
    
//         if ('data' in res.error) {
//           // For FetchBaseQueryError, safely access the `data` property
//           const errorMessage = (res.error.data as { message?: string })?.message || "Register error occurred.";
//           message.error(errorMessage);
//       } else if ('message' in res.error) {
//           // For SerializedError, handle the `message` property
//           message.error(res.error.message || "Register error occurred.");
//       } else {
//           // Handle unknown error types
//           message.error("An unknown error occurred.");
//       }
//       }
//     } catch (error) {
//       message.open({
//         type: 'error',
//         content: 'Registration Failed!',
//       });
//       console.log(error);
//     }
//   };
  
//   const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50">
//       <div className="p-8 bg-white shadow-lg rounded-lg max-w-sm w-full">
//         <Title level={3} className="text-center">
//           Create an Account
//         </Title>
//         <Text className="block text-center mb-6" type="secondary">
//           Join us today! Please fill in the details below.
//         </Text>
//         <Form
//           name="register"
//           layout="vertical"
//           initialValues={{ remember: true }}
//           onFinish={onFinish}
//           onFinishFailed={onFinishFailed}
//           autoComplete="off"
//         >
//           {/* Username Field */}
//           <Form.Item<FieldType>
//             label="Name"
//             name="name"
//             rules={[
//               { required: true, message: "Please input your name!" },
//               { min: 3, message: "name must be at least 3 characters." },
//             ]}
//           >
//             <Input placeholder="Enter your name" />
//           </Form.Item>

//           {/* Email Field */}
//           <Form.Item<FieldType>
//             label="Email"
//             name="email"
//             rules={[
//               { required: true, message: "Please input your email!" },
//               { type: "email", message: "Please enter a valid email address." },
//             ]}
//           >
//             <Input placeholder="Enter your email" />
//           </Form.Item>

//           {/* Password Field */}
//           <Form.Item<FieldType>
//             label="Password"
//             name="password"
//             rules={[
//               { required: true, message: "Please input your password!" },
//               { min: 6, message: "Password must be at least 6 characters." },
//             ]}
//           >
//             <Input.Password placeholder="Enter your password" />
//           </Form.Item>

//           {/* Confirm Password Field */}
//           <Form.Item<FieldType>
//             label="Confirm Password"
//             name="confirmPassword"
//             dependencies={["password"]}
//             rules={[
//               { required: true, message: "Please confirm your password!" },
//               ({ getFieldValue }) => ({
//                 validator(_, value) {
//                   if (!value || getFieldValue("password") === value) {
//                     return Promise.resolve();
//                   }
//                   return Promise.reject(
//                     new Error("The passwords do not match!")
//                   );
//                 },
//               }),
//             ]}
//           >
//             <Input.Password placeholder="Confirm your password" />
//           </Form.Item>

//           {/* Submit Button */}
//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               block
//               className="font-semibold"
//               loading={isLoading}
//             >
//               Register
//             </Button>
//           </Form.Item>
//         </Form>

//         {/* Already Have an Account */}
//         <div className="text-center mt-4">
//           <Text type="secondary">Already have an account?</Text>{" "}
//           <a href="/login" className="text-blue-500">
//             Log In
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;