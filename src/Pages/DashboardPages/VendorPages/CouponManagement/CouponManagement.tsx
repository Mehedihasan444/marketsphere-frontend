/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/CouponManagement.js
import { useState } from 'react';
import {
    Layout, Button, Table, Space, Modal, Form, Input, Select, message,
} from 'antd';
import { TCoupon, TCouponItem, TShop } from '../../../../Interface';
import {
    useAddCouponMutation,
    useDeleteCouponMutation,
    useGetCouponsQuery,
    useUpdateCouponMutation,
} from '../../../../Redux/Features/Coupon/couponApi';
import { useGetVendorQuery } from '../../../../Redux/Features/Vendor/vendorApi';
import { useAppSelector } from '../../../../Redux/hook';

const { Content } = Layout;
const { Option } = Select;

const CouponManagement = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [selectedCoupon, setSelectedCoupon] = useState<TCouponItem>({} as TCouponItem);
    const vendor = useAppSelector((state) => state.auth.user);

    // API Queries
    const { data = {},isLoading, } = useGetCouponsQuery('');
    const allShopcoupons  = data?.data || [];
    const { data: shopData = {} } = useGetVendorQuery(vendor?.email as string);
    const { shop: shops = [] } = shopData.data || {};

    // API Mutations
    const [addCoupon] = useAddCouponMutation();
    const [updateCoupon] = useUpdateCouponMutation();
    const [deleteCoupon] = useDeleteCouponMutation();


    // extract shop coupons
    const coupons = allShopcoupons.flatMap((coupon: TCoupon) => coupon?.couponItem || []);
    // Table Columns
    const columns = [
        {
            title: 'Coupon Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Discount (%)',
            dataIndex: 'discount',
            key: 'discount',
        },
        {
            title: 'Expiration Date',
            dataIndex: 'expiryDate',
            key: 'expiryDate',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: TCouponItem) => (
                <Space size="middle">
                    <Button onClick={() => (handleEdit(record),console.log(record,"r"))}>Edit</Button>
                    <Button danger onClick={() => handleDelete(record)}>Delete</Button>
                </Space>
            ),
        },
    ];


    // Handle Create
    const handleCreate = () => {
        setModalMode('create');
        setSelectedCoupon({} as TCouponItem); // Reset form data
        setIsModalVisible(true);
    };

    // Handle Edit
    const handleEdit = (record: TCouponItem) => {
        setModalMode('edit');
        setSelectedCoupon(record);
        setIsModalVisible(true);
    };

    // Handle Delete
    const handleDelete = (record: TCouponItem) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this coupon?',
            onOk: async () => {
                try {
                    const res = await deleteCoupon(record.id);
                    if (res?.data?.success) {
                        message.success('Coupon deleted successfully');
                    } else {
                        message.error('Failed to delete coupon');
                    }
                } catch (error) {
                    console.log(error);
                    message.error('Error deleting coupon');
                }
            },
        });
    };

    // Form Submission for Create and Edit
    const handleFinish = async (values: any) => {
        try {
            if (modalMode === 'create') {
                const res = await addCoupon(values);
                if (res?.data?.success) {
                    message.success('Coupon created successfully');
                } else {
                    message.error('Failed to create coupon');
                }
            } else {
                const res = await updateCoupon({id: selectedCoupon?.id, ...values,  });
                if (res?.data?.success) {
                    message.success('Coupon updated successfully');
                } else {
                    message.error('Failed to update coupon');
                }
            }
            setIsModalVisible(false);
        } catch (error) {
            console.log(error);
            message.error('An error occurred while processing your request.');
        }
    };

    return (
        <Layout>
            <Content
                className="site-layout-background p-4"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}
            >
                {/* Header */}
                <div className="flex justify-between mb-4">
                    <h1 className="text-xl font-bold">Coupon Management</h1>
                    <Button type="primary" onClick={handleCreate}>
                        Create New Coupon
                    </Button>
                </div>

                {/* Table */}
                <Table columns={columns} pagination={false} dataSource={coupons} rowKey={(record) => record.id}  loading={isLoading}
                    />

                {/* Modal */}
                <Modal
                    title={modalMode === 'create' ? 'Create Coupon' : 'Edit Coupon'}
                    visible={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    centered
                    footer={null}
                >
                    <Form
                        name="couponForm"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{
                            code: selectedCoupon?.code,
                            discount: selectedCoupon?.discount,
                            expiryDate: selectedCoupon?.expiryDate
                                ? new Date(selectedCoupon?.expiryDate).toISOString().split('T')[0]
                                : '',
                            shopId: selectedCoupon?.coupon?.shopId,
                        }}
                        onFinish={handleFinish}
                        key={modalMode + (selectedCoupon?.id || '')} // Re-render form on mode change
                    >
                        <Form.Item
                            label="Coupon Code"
                            name="code"
                            rules={[{ required: true, message: 'Please input the coupon code!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Discount (%)"
                            name="discount"
                            rules={[{ required: true, message: 'Please select a discount percentage!' }]}
                        >
                            <Select placeholder="Select discount">
                                <Option value={5}>5%</Option>
                                <Option value={10}>10%</Option>
                                <Option value={15}>15%</Option>
                                <Option value={20}>20%</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Expiration Date"
                            name="expiryDate"
                            rules={[{ required: true, message: 'Please input the expiration date!' }]}
                        >
                            <Input type="date" />
                        </Form.Item>

                        <Form.Item
                            label="Shop"
                            name="shopId"
                            rules={[{ required: true, message: 'Please select a shop!' }]}
                        >
                            <Select placeholder="Select shop">
                                {shops.map((shop: TShop) => (
                                    <Option key={shop.id} value={shop.id}>
                                        {shop.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Space>
                                <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
                                <Button type="primary" htmlType="submit">
                                    {modalMode === 'create' ? 'Create' : 'Update'}
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Modal>
            </Content>
        </Layout>
    );
};

export default CouponManagement;
