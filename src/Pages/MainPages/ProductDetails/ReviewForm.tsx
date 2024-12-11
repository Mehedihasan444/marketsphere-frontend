import React, { useState } from "react";
import { Form, Input, Button, Rate, message } from "antd";

const ReviewForm: React.FC<{ id: string }> = ({ id }) => {
  const [form] = Form.useForm();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (values: any) => {
    try {
      // Handle form submission
      console.log("Form values:", values);
      message.success("Review submitted successfully!");
    } catch (error) {
      message.error("Failed to submit review.");
      console.error(error);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      className="max-w-md mx-auto"
    >
      <Form.Item
        label="Your Name"
        name="name"
        rules={[{ required: true, message: "Please enter your name" }]}
      >
        <Input
          value={name}
          placeholder="Enter your name..."
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Your Email"
        name="email"
        rules={[
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <Input
          value={email}
          placeholder="Enter your email address..."
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Rating"
        name="rating"
        rules={[{ required: true, message: "Please provide a rating" }]}
      >
        <Rate
          value={rating}
          onChange={(value) => setRating(value)}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit Review
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ReviewForm;
