import { Select, Input, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const CartPage = () => {
  return (
    <div className="bg-neutral-100 min-h-screen p4-10">
      <div className="max-w-8xl lg:mx-16 mx-auto bg-white p-6 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-500 mb-6">
          Home / <span className="text-black">Your Cart</span>
        </p>

        {/* Cart Items Table */}
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Left Section */}
          <div className="flex-1">
            <div className="border rounded-md overflow-hidden mb-6">
              <table className="w-full border-collapse text-left">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-3">PRODUCT</th>
                    <th className="px-4 py-3">QUANTITY</th>
                    <th className="px-4 py-3">SUBTOTAL</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3 flex gap-4">
                      <img
                        src="https://via.placeholder.com/80"
                        alt="Product"
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div>
                        <h2 className="font-semibold">
                          Apple Watch Aluminum Case with Sport Loop
                        </h2>
                        <p className="text-gray-500">Color: LightBlue</p>
                        <p className="font-semibold text-gray-800">$49.00</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button>-</Button>
                        <span className="w-8 text-center">1</span>
                        <Button>+</Button>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-center">
                      $49.00
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Button type="link" icon={<DeleteOutlined />} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Button shape="round" type="primary" size="large" className="mb-6">
              Continue Shopping
            </Button>

            <div className="flex items-center gap-4 mb-6">
              <p className="font-semibold">
                Do you want a gift wrap? Only $2.00
              </p>
              <Button shape="round">Add a Gift Wrap</Button>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Add Order Note</h3>
              <Input.TextArea placeholder="How can we help you?" rows={5}/>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/3">
            <div className="border p-4 rounded-md">
              <p className="text-red-500 font-semibold mb-2">
                Spend $451.00 more and get Free Shipping!
              </p>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">CART TOTALS</h3>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>$49.00</span>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">ESTIMATE SHIPPING RATES:</h3>
                <div className="mb-2">
                  <Select placeholder="Country" className="w-full">
                    <Select.Option value="united-states">United States</Select.Option>
                  </Select>
                </div>
                <div className="mb-2">
                  <Select placeholder="State" className="w-full">
                    <Select.Option value="alabama">Alabama</Select.Option>
                  </Select>
                </div>
                <Input placeholder="Zip/Postal Code" className="mb-2" />
                <Button shape="round" type="primary" size="large" className="w-full">
                  Calculate Shipping Rates
                </Button>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">COUPON</h3>
                <Input placeholder="Coupon code" className="mb-2" />
                <p className="text-gray-500">Coupon code will work on checkout page.</p>
              </div>

              <div className="flex justify-between mb-4">
                <span>Order Totals</span>
                <span className="font-bold">$49.00</span>
              </div>

              <Button shape="round" type="primary" size="large" className="w-full">
                Check Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
