import { Button, Rate, Select } from "antd";
import { useState } from "react";

const ProductInfo = ({product}) => {
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

//   // Share options functions
//   const shareOnFacebook = () => {
//     const url =
//       "https://www.facebook.com/sharer/sharer.php?u=" + window.location.href;
//     window.open(url, "_blank");
//   };

//   const shareOnTwitter = () => {
//     const url = "https://twitter.com/intent/tweet?url=" + window.location.href;
//     window.open(url, "_blank");
//   };

//   const shareOnWhatsApp = () => {
//     const url =
//       "https://wa.me/?text=" + encodeURIComponent(window.location.href);
//     window.open(url, "_blank");
//   };
    return (
        <div>
                <h3 className="">Category</h3>
            <h2 className="text-2xl font-bold mb-2 mt-3">
              Shoes Reebok Zig Kinetica 3
            </h2>
            <div className="flex items-center space-x-2">
              <Rate allowHalf defaultValue={4.8} disabled />
              <span className="text-gray-600">(42 reviews)</span>
            </div>
            <p className="text-3xl font-semibold mt-4">$199.00</p>

            {/* Color Options */}
            <div className="mt-4">
              <p className="text-gray-600 font-medium mb-2">Color:</p>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-white border cursor-pointer"></div>
                <div className="w-8 h-8 rounded-full bg-gray-300 border cursor-pointer"></div>
              </div>
            </div>

            {/* Size Options */}
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
            {/* Quantity Control */}
            <div className="mt-4 flex items-center space-x-4">
              <Button
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                icon="-"
              />
              <span className="text-xl">{quantity}</span>
              <Button onClick={increaseQuantity} icon="+" />
            </div>

            {/* Add to Cart Button */}
            <div className="mt-6 flex gap-5">
           <Button type="primary" size="large" color="primary" className="flex-1">Add to cart</Button>
              <Button type="primary" danger size="large" className="flex-1">Add to Wishlist</Button>
            </div>
            <div className="">
              
            </div>
            <p className="text-gray-500 mt-2">
              Free delivery on orders over $30.00
            </p>
            {/* Share Options */}
            {/* <div className="mt-6 flex space-x-4">
              <Button icon={<FacebookOutlined />} onClick={shareOnFacebook} />
              <Button icon={<TwitterOutlined />} onClick={shareOnTwitter} />
              <Button icon={<WhatsAppOutlined />} onClick={shareOnWhatsApp} />
            </div> */}
        </div>
    );
};

export default ProductInfo;