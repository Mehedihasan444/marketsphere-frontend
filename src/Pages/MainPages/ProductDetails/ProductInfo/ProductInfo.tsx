import { Button, Divider, Rate, Select } from "antd";
import { useState } from "react";
import { TProduct } from "../../../../Interface";
import { FacebookOutlined, TwitterOutlined, WhatsAppOutlined } from "@ant-design/icons";

const ProductInfo = ({ product }: { product: TProduct & { colors: string[], sizes: string[] } }) => {
  const [quantity, setQuantity] = useState(1);
  // Increase quantity
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };


  return (
    <div>
      <h3 className="text-blue-400 italic">{product?.category?.name as string}</h3>
      <h2 className="text-3xl font-bold mb-2 mt-3">{product.name}</h2>
      <div className="flex items-center space-x-2">
        <Rate allowHalf defaultValue={product.rating} disabled className="text-2xl"/>
        <span className="text-gray-600">
          ({product.reviews?.length || 0} reviews)
        </span>
      </div>
      <p className="text-3xl font-semibold mt-4 text-blue-500">${product.price}</p>
      {/* features */}
      <div className="mt-4">
        <p className="text-gray-600 font-medium mb-2">Features:</p>
        <ul className="list-disc list-inside ml-4 ">
          <li>High quality material</li>
          <li>Durable and long-lasting</li>
          <li>Available in multiple colors</li>
          <li>Comfortable fit</li>
          <li>Easy to clean</li>
        </ul>
      </div>
      {/* Color Options */}
      {
        product?.colors &&
        <div className="mt-4">
          <p className="text-gray-600 font-medium mb-2">Color:</p>
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-white border cursor-pointer"></div>
            <div className="w-8 h-8 rounded-full bg-gray-300 border cursor-pointer"></div>
          </div>
        </div>
      }

      {/* Size Options */}
      {
        product?.sizes &&
        <div className="mt-4">
          <p className="text-gray-600 font-medium mb-2">Size:</p>
          <Select
            placeholder="Select size"
            options={[
              { value: 40.5, label: "40.5" },
              { value: 41, label: "41" },
              { value: 42, label: "42" },
              { value: 43.5, label: "43.5" },
              { value: 44, label: "44" },
              { value: 45, label: "45" },
              { value: 46, label: "46" },
            ]}
            style={{ width: "120px" }}
          />
        </div>
      }

      <div className="mt-4 flex gap-5">

      {/* Quantity Control */}
      <div className="mt-4 flex items-center space-x-4">
        <Button onClick={decreaseQuantity} disabled={quantity <= 1} icon="-" size="large" />
        <span className="text-xl">{quantity}</span>
        <Button onClick={increaseQuantity} icon="+"  size="large"/>
      </div>

      {/* Add to Cart Button */}
      <div className="mt-6 flex gap-5 flex-1">
        <Button type="default" variant="outlined" size="large" className="flex-1">
          Add to Wishlist
        </Button>
        <Button type="primary" size="large" color="primary" className="flex-1">
          Add to cart
        </Button>
      </div>
      </div>
      <Divider/>
      <div className="">

      <p className="text-gray-500 mt-2">Free delivery on orders over $30.00</p>
      {/* Share Options */}
      <div className="mt-6 flex space-x-4">
              <Button icon={<FacebookOutlined />}  />
              <Button icon={<TwitterOutlined />} />
              <Button icon={<WhatsAppOutlined />} />
            </div>
    </div>
      </div>
  );
};

export default ProductInfo;
