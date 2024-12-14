import { Modal, Form, Input, Rate, Button, message } from "antd";
import { useState } from "react";
import { useAddReviewsMutation } from "../../../../Redux/Features/Review/reviewApi";
import { TOrder } from "../../../../Interface";

const ReviewModal = ({ order }: { order: TOrder }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [addReviews, { isLoading }] = useAddReviewsMutation();
    const handleSubmit = async (values: { rating: number; comment: string }) => {
        const reviewData = {
            ...values,
            customerId: order.customerId,
            reviewId: order?.orderItems[0]?.product?.reviews.id,
            orderId: order.id,
        }

       
        try {
            // Call the mutation to add a review
            const res = await addReviews(reviewData);
            if (res?.data?.success) {
                message.success("Your review has been submitted successfully!");
                setIsModalVisible(false);
                form.resetFields();
            }
            else if (res?.error) {
                message.error(res?.error.data.message);
            }
        } catch (error) {
            console.error("Error submitting review: ", error);

            message.error("Failed to submit the review. Please try again.");
        }
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    return (
        <div>
            <Button type="primary" onClick={showModal} disabled={order?.isReview===true}>
                Leave a Review
            </Button>
            <Modal
                title="Leave a Review"
                open={isModalVisible} // Updated from "visible" to "open"
                onCancel={handleCancel}
                onOk={() => form.submit()} // Trigger form submission
                confirmLoading={isLoading} // Show loading spinner on OK button
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        name="rating"
                        label="Rating"
                        rules={[{ required: true, message: "Please select a rating!" }]}
                    >
                        <Rate allowHalf />
                    </Form.Item>
                    <Form.Item
                        name="comment"
                        label="Review"
                        rules={[{ required: true, message: "Please enter your review!" }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ReviewModal;
