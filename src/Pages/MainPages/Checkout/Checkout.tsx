import { Alert, Button, Divider, Input, Spin } from "antd";
import { useGetCartItemsQuery } from "../../../Redux/Features/Cart/cartApi";
import { useEffect, useState } from "react";
import { TCartItem } from "../../../Interface";

const Checkout = () => {
    const [totalAmount, setTotalAmount] = useState<number>(0)
    const { data = {}, isLoading, error } = useGetCartItemsQuery("");
    const { data: cartItems = [] } = data || {};

    useEffect(() => {
        const total = cartItems?.reduce((acc: number, item: TCartItem) => acc + item.product.price * item.quantity, 0)
        setTotalAmount(total)
      }, [cartItems])
    
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
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
                {/* Header */}
                <div className="flex justify-between items-center pb-6 border-b">
                    <h1 className="text-2xl font-semibold text-blue-600">Chechout</h1>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <span className="text-blue-500 font-medium">Cart</span>
                            <span className="mx-2 text-gray-400">→</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-blue-500 font-medium">Review</span>
                            <span className="mx-2 text-gray-400">→</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-blue-500 font-medium">Checkout</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    {/* Shipping Information */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

                        {/* Shipping Options */}
                        <div className="flex items-center space-x-4 mb-4">
                            <button className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-center font-medium">
                                Delivery
                            </button>
                            <button className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-center font-medium">
                                Pick up
                            </button>
                        </div>

                        {/* Form */}
                        <form className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-medium">
                                    Full name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                    placeholder="Enter full name"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">
                                    Email address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                    placeholder="Enter email address"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">
                                    Phone number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                    placeholder="Enter phone number"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">
                                    Country <span className="text-red-500">*</span>
                                </label>
                                <select
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Choose state
                                    </option>
                                    <option>USA</option>
                                    <option>Canada</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-medium">City</label>
                                    <input
                                        type="text"
                                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                        placeholder="Enter city"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">State</label>
                                    <input
                                        type="text"
                                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                        placeholder="Enter state"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">ZIP Code</label>
                                    <input
                                        type="text"
                                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                        placeholder="Enter ZIP code"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <label className="text-gray-700">
                                    I have read and agree to the Terms and Conditions.
                                </label>
                            </div>
                        </form>
                    </div>

                    {/* Cart Review */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Review your cart</h2>
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
                                        type="text"
                                        className="w-full  rounded-md flex-1"
                                        placeholder="Enter discount coupon"
                                        size="large"

                                    />
                                    <Button variant="solid" className=" " size="large" type="primary">Apply</Button>
                                </div>
                            </div>
                            {/* Summary */}
                            <div className="border-t pt-4">
                                <div className="flex justify-between">
                                    <p className="text-gray-700">Subtotal</p>
                                    <p className="text-gray-800">${totalAmount}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-gray-700">Shipping</p>
                                    <p className="text-gray-800">$5.00</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-gray-700">Discount</p>
                                    <p className="text-gray-800">-$10.00</p>
                                </div>
                                <div className="flex justify-between font-semibold">
                                    <p className="text-gray-800">Total</p>
                                    <p className="text-gray-800">$40.00</p>
                                </div>
                            </div>
                            <button className="w-full py-2 bg-blue-600 text-white font-medium rounded-md">
                                Pay Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
