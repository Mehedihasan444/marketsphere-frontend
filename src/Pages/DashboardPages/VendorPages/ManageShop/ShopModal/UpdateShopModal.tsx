/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, message, Modal } from "antd";
import { useState } from "react";
import { TShop } from "../../../../../Interface";
import { useUpdateShopMutation } from "../../../../../Redux/Features/Shop/shopApi";

const UpdateShopModal = ({ shop }: { shop: TShop }) => {
    const [open, setOpen] = useState(false);
    // const [confirmLoading, setConfirmLoading] = useState(false);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);

    const [form] = Form.useForm();
    const [updateShop, { isLoading }] = useUpdateShopMutation();
    const showModal = () => {
        setOpen(true);
    };

    // const handleOk = () => {
    //     setConfirmLoading(true);
    //     setTimeout(() => {
    //         setOpen(false);
    //         setConfirmLoading(false);
    //     }, 2000);
    // };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);

    };
    const handleSubmit = async (values: any) => {
        const formData = new FormData();
        const data = {
            name: values.name,
            description: values.description,
        };
        formData.append("data", JSON.stringify(data));
        // Append the logo and banner file if they exist
        if (logoFile) formData.append("logo", logoFile); // Append the logo file
        if (bannerFile) formData.append("banner", bannerFile); // Append the banner file

        try {
            const res = await updateShop({ id: shop.id, formData });
            if (res?.data?.success) {
                message.success("Shop updated successfully!");
                form.resetFields();
                setLogoFile(null);
                setBannerFile(null);
                setOpen(false);
            } else if (res?.error) {
                if ('data' in res.error) {
                    // For FetchBaseQueryError, safely access the `data` property
                    const errorMessage = (res.error.data as { message?: string })?.message || "Failed to update shop.";
                    message.error(errorMessage);
                } else if ('message' in res.error) {
                    // For SerializedError, handle the `message` property
                    message.error(res.error.message || "Failed to update shop.");
                } else {
                    // Handle unknown error types
                    message.error("An unknown error occurred.");
                }
            }
        } catch (error) {
            console.error(error);
            message.error("An error occurred while updating the shop.");
        }
    }

    return (
        <>
            
            <Button
                type="default"
                variant="outlined"
                onClick={showModal}
                disabled={shop.status === "RESTRICTED"}
            >
                Edit
            </Button>
            <Modal
                title="Update Shop"
                open={open}
                onCancel={handleCancel}
                footer={null}
            >

                <Form form={form} layout="vertical" initialValues={shop} onFinish={handleSubmit}>
                    <Form.Item
                        name="name"
                        label="Shop Name"
                        rules={[{ required: true, message: "Please enter the shop name!" }]}
                    >
                        <Input placeholder="Enter shop name" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                            { required: true, message: "Please provide a description!" },
                        ]}
                    >
                        <Input.TextArea placeholder="Enter shop description" rows={4} />
                    </Form.Item>

                    <Form.Item name="logo" label="Shop Logo">
                        <img src={logoFile ? URL.createObjectURL(logoFile) : shop?.logo ? shop?.logo : ""} alt="logo" className="w-16 h-auto mb-2" />
                        <Input
                            type="file"
                            variant="outlined"
                            accept="image/*"
                            name="logo"
                            onChange={(e) => setLogoFile(e.target.files![0])}
                        />
                    </Form.Item>

                    <Form.Item name="banner" label="Shop Banner">
                        <img src={bannerFile ? URL.createObjectURL(bannerFile) : shop?.banner ? shop?.banner : ""} alt="banner" className="w-16 h-auto mb-2" />
                        <Input
                            type="file"
                            name="logo"
                            accept="image/*"
                            variant="outlined"
                            onChange={(e) => setBannerFile(e.target.files![0])}
                        />
                    </Form.Item>

                    <Form.Item className="flex justify-end">
                        <Button type="primary" htmlType="submit" loading={isLoading}>
                            Update Shop
                        </Button>
                    </Form.Item>
                </Form>

            </Modal>
        </>
    );
};


export default UpdateShopModal;