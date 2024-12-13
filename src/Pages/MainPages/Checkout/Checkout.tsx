import { Alert, Button, Col, Divider, div, Spin } from "antd";
import { useGetCartItemsQuery } from "../../../Redux/Features/Cart/cartApi";
import { useEffect, useMemo, useState } from "react";
import { TCartItem } from "../../../Interface";
import { MdDeliveryDining } from "react-icons/md";
import { GiCardPickup } from "react-icons/gi";
import { Form, Input, Select, Checkbox, message } from "antd";
const { TextArea } = Input;
import { BiCart } from "react-icons/bi";
import { useCreateOrderMutation } from "../../../Redux/Features/Order/orderApi";
import { useGetMyProfileQuery } from "../../../Redux/Features/User/userApi";

const Checkout = () => {
    const [subTotalAmount, setSubTotalAmount] = useState<number>(0)
    const [totalAmount, setTotalAmount] = useState<number>(0)
    const [discount, setDiscount] = useState<number>(0)
    const [shipping, setShipping] = useState<number>(5)
    const [coupon, setCoupon] = useState<string>("")
    const [OrderShippingType, setOrderShippingType] = useState<string>("")
    const { data = {}, isLoading, error } = useGetCartItemsQuery("");
    const { data: cartItems = [] } = data || {};
    const [createOrder, { isLoading: orderIsPlacing }] = useCreateOrderMutation()
    const { data :profileData= {}} = useGetMyProfileQuery("");
    const userProfile = useMemo(() => profileData.data || {}, [profileData]);
    const [form] = Form.useForm();

    useEffect(() => {
        const subTotal = cartItems?.reduce((acc: number, item: TCartItem) => acc + item.product.price * item.quantity, 0)
        setSubTotalAmount(subTotal)
        setTotalAmount(subTotal + shipping - discount)
    }, [cartItems])

    

    const handleSubmit = async (values: any) => {
        const quantity = cartItems?.reduce((acc: number, item: TCartItem) => acc + item.quantity, 0)
const newOrder = {
    ...values,
    customerId: userProfile.id,
    shopId:"68ecb332-5e05-4dc3-91b8-f9894e6f99e0",
    quantity,
    totalAmount,
    discount,
    orderNumber: `ORD-${Math.floor(Math.random() * 1000000)}`,
    note:"",
    orderItems: cartItems?.map((item: TCartItem) => ({
        productId: item.product.id,
        quantity: item.quantity,
    })),
}
        try {
            const res = await createOrder(newOrder)
            console.log(res)
            if (res?.data?.success) {
                form.resetFields()
                message.success('Order placed successfully!')
            } else if (res?.error) {
                message.error(res?.error?.data.message)
            }
        } catch (error) {
            console.log(error)
            message.error('Failed to place order!')
        }
        console.log('Form values:', newOrder);
        message.success('Form submitted successfully!');
    };
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen w-full">
                <Spin tip="Loading..." />
            </div>
        )

    }
    if (error) {
        return (
            <Alert
                message="Error"
                description="Failed to load users."
                type="error"
                showIcon
            />
        );

    }
    return (
        <div className="min-h-screen bg-gray-100 ">
            <div className="max-w-8xl lg:mx-16 mx-auto p-8 bg-white shadow-md rounded-md">
                {/* Header */}
                <div className="flex justify-between items-center pb-6 border-b">
                    <h1 className="text-2xl font-semibold text-blue-600">Chechout</h1>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <span className="text-blue-500 font-medium">Products</span>
                            <span className="mx-2 text-gray-400">→</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-blue-500 font-medium">Cart</span>
                            <span className="mx-2 text-gray-400">→</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-blue-500 font-medium">Checkout</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    className="space-y-4"
                >

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                        {/* Shipping Information */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                            {/* Shipping Options */}
                            <Form.Item
                                name="orderShippingType"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select a shipping type!",
                                    },
                                ]}
                            >
                                <div className="flex items-center space-x-4 ">
                                    <Button
                                        type={OrderShippingType === "DELIVERY" ? "primary" : "text"}
                                        icon={<MdDeliveryDining className="text-xl" />}
                                        onClick={() => {
                                            setOrderShippingType("DELIVERY");
                                            form.setFieldsValue({ orderShippingType: "DELIVERY" });
                                        }}
                                        size="large"
                                        className="text-lg flex-1 py-2 px-4 border border-gray-300 rounded-md text-center font-medium"
                                    >
                                        Delivery
                                    </Button>
                                    <Button
                                        type={OrderShippingType === "PICK_UP" ? "primary" : "text"}
                                        icon={<GiCardPickup className="text-xl" />}
                                        onClick={() => {
                                            setOrderShippingType("PICK_UP");
                                            form.setFieldsValue({ orderShippingType: "PICK_UP" });
                                        }}
                                        size="large"
                                        className="text-lg flex-1 py-2 px-4 border border-gray-300 rounded-md text-center font-medium"
                                    >
                                        Pick up
                                    </Button>
                                </div>
                            </Form.Item>




                            {/* Form */}

                            <Form.Item
                                name="name"
                                label="Full name"
                                rules={[{ required: true, message: 'Please enter your full name!' }]}
                            >
                                <Input size="large" placeholder="Enter full name" />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label="Email address"
                                rules={[{ required: true, type: 'email', message: 'Please enter a valid email address!' }]}
                            >
                                <Input size="large" placeholder="Enter email address" />
                            </Form.Item>
                            <div className="flex justify-between items-center gap-4">
                                <Form.Item
                                    name="phone"
                                    label="Phone number"
                                    className="w-full "
                                    rules={[{ required: true, message: 'Please enter your phone number!' }]}
                                >
                                    <Input size="large" placeholder="Enter phone number" />
                                </Form.Item>
                                <Form.Item
                                    name="country"
                                    label="Country"
                                    className="w-full "
                                    rules={[{ required: true, message: 'Please select your country!' }]}
                                >
                                    <Select>
                                        <Select.Option value="USA">USA</Select.Option>
                                        <Select.Option value="Canada">Canada</Select.Option>
                                        <Select.Option value="Canada">Canada</Select.Option>
                                    </Select>
                                </Form.Item>



                            </div>
                            <div className="flex justify-between items-center gap-4">

                                <Form.Item
                                    name="city"
                                    label="City"
                                    className="w-full "
                                    rules={[{ required: true, message: 'Please enter your city!' }]}
                                >
                                    <Input size="large" placeholder="Enter city" />
                                </Form.Item>
                                <Form.Item
                                    name="state"
                                    label="State"
                                    className="w-full "
                                    rules={[{ required: true, message: 'Please enter your state!' }]}
                                >
                                    <Input size="large" placeholder="Enter state" />
                                </Form.Item>
                                <Form.Item
                                    name="zipCode"
                                    label="ZIP Code"
                                    className="w-full "
                                    rules={[{ required: true, message: 'Please enter your ZIP code!' }]}
                                >
                                    <Input size="large" placeholder="Enter ZIP code" />
                                </Form.Item>


                            </div>
                            <Form.Item
                                name="address"
                                label="Address"
                                className="w-full "
                                rules={[{ required: true, message: 'Please enter your address!' }]}
                            >
                                <TextArea size="large" placeholder="Enter your detail address" />
                            </Form.Item>
                            <Form.Item
                                name="terms"
                                valuePropName="checked"
                                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject('You must agree to the terms and conditions') }]}
                            >
                                <Checkbox>
                                    I have read and agree to the Terms and Conditions.
                                </Checkbox>
                            </Form.Item>
                            {/* <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item> */}

                        </div>

                        {/* Cart Review */}
                        <div>
                            <div className="flex justify-between items-center gap-4 mb-4">

                                <h2 className="text-xl font-semibold ">Review your cart</h2>
                                <BiCart className="text-3xl text-blue-500" />
                            </div>
                            <Divider />
                            <div className="space-y-4">
                                {/* Cart Items */}
                                {
                                    cartItems.map((cartItem: any, idx: number) => (
                                        <div className="flex items-center justify-between" key={idx}>
                                            <div className="flex items-center space-x-4">
                                                <img
                                                    src={cartItem?.product?.images[0]}
                                                    alt="Sofa"
                                                    className="w-16 h-16 object-cover rounded-md"
                                                />
                                                <div>
                                                    <h3 className="font-medium text-gray-800">
                                                        {cartItem?.product.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">{cartItem.quantity}x</p>
                                                </div>
                                            </div>
                                            <p className="font-medium text-gray-800">${cartItem.product.price}</p>
                                        </div>
                                    ))}

                                <Divider />
                                {/* discount coupon */}
                                <div className="">
                                    <label className="block text-gray-700 font-medium">
                                        Discount Coupon
                                    </label>
                                    <div className="flex justify-between items-center gap-4">

                                        <Input
                                            size="large"
                                            type="text"
                                            name="coupon"
                                            required={false}
                                            className="w-full  rounded-md flex-1"
                                            placeholder="Enter discount coupon"
                                            onChange={(e) => setCoupon(e.target.value)}

                                        />
                                        <Button variant="solid" className=" " size="large" type="primary">Apply</Button>
                                    </div>
                                </div>
                                {/* Summary */}
                                <div className="border-t pt-4">
                                    <div className="flex justify-between">
                                        <p className="text-gray-700">Subtotal</p>
                                        <p className="text-gray-800">${subTotalAmount}.00</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-gray-700">Shipping</p>
                                        <p className="text-gray-800">${shipping}.00</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-gray-700">Discount</p>
                                        <p className="text-gray-800">-${discount}.00</p>
                                    </div>
                                    <div className="flex justify-between font-semibold">
                                        <p className="text-gray-800">Total</p>
                                        <p className="text-gray-800">${totalAmount}.00</p>
                                    </div>
                                </div>
                                <Button
                                    loading={orderIsPlacing}
                                    htmlType="submit"
                                    className="w-full py-2 bg-blue-600 text-white font-medium rounded-md"
                                    // disabled={!form.isFieldsTouched(true)  || form.getFieldsError().filter(({ errors }) => errors.length).length > 0}
                                    disabled={
                                        // !form.isFieldsTouched(true) || // Check if any fields are touched
                                        form.getFieldsError()
                                            .filter(
                                                ({ name, errors }) =>
                                                    errors.length > 0 && name[0] !== "coupon" // Ignore validation errors for "coupon"
                                            ).length > 0
                                    }
                                >
                                    Place Order
                                </Button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Checkout;
