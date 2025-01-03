import { Button, Divider, message, Rate, Select } from "antd";
import { useState } from "react";
import { TProduct } from "../../../../Interface";
import { FacebookOutlined, TwitterOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../../../Redux/hook";
import { useAddToCartMutation } from "../../../../Redux/Features/Cart/cartApi";
import { useAddToWishlistMutation } from "../../../../Redux/Features/Wishlist/wishlistApi";

const ProductInfo = ({ product }: { product: TProduct & { colors: string[], sizes: string[] } }) => {
  const [quantity, setQuantity] = useState(1);
  const user = useAppSelector((state) => state.auth.user);
  const [addToCart] = useAddToCartMutation();
    const [addToWishlist]=useAddToWishlistMutation()
  // Increase quantity
  const increaseQuantity = () => {
    if (product.quantity < quantity) {
      message.error("Quantity exceeds stock");
      return;

    }
    setQuantity(quantity + 1);
  };

  // Decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleAddToCart = async (productId: string) => {
    if (!user) {
      message.info("Please login to add product to cart");
    }else{

      try {
        const res = await addToCart({ userEmail: user?.email, productId, quantity });
  
        if (res?.data?.success) {
          message.success("Product added to cart");
        } else if (res.error) {
          if ('data' in res.error) {
            // For FetchBaseQueryError, safely access the `data` property
            const errorMessage = (res.error.data as { message?: string })?.message || "Add to cart error occurred.";
            message.error(errorMessage);
        } else if ('message' in res.error) {
            // For SerializedError, handle the `message` property
            message.error(res.error.message || "Add to cart error occurred.");
        } else {
            // Handle unknown error types
            message.error("An unknown error occurred.");
        }
        }
      } catch (error) {
        console.log(error);
        message.error("Failed to add product to cart");
      }
    }
  };
  // Add to wishlist
  const handleAddToWishlist =async (productId: string) => {
    if (!user) {
      message.info("Please login to add product to wishlist");
    }else{

      try {
        const res = await addToWishlist({ userEmail: user?.email, productId });
  
        if (res?.data?.success) {
          message.success("Product added to wishlist");
        } else if (res.error) {
          if ('data' in res.error) {
            // For FetchBaseQueryError, safely access the `data` property
            const errorMessage = (res.error.data as { message?: string })?.message || "Product add to wishlist error occurred.";
            message.error(errorMessage);
          } else if ('message' in res.error) {
            // For SerializedError, handle the `message` property
            message.error(res.error.message || "Product add to wishlist error occurred.");
          } else {
            // Handle unknown error types
            message.error("An unknown error occurred.");
          }
        }
      } catch (error) {
        console.log(error);
        message.error("Failed to add product to wishlist");
      }
    }
  };



  return (
    <div>
      <h3 className="text-blue-400 italic">{product?.category?.name as string}</h3>
      <h2 className="text-3xl font-bold mb-2 mt-3">{product.name}</h2>
      <div className="flex items-center space-x-2">
        <Rate allowHalf defaultValue={product.rating} disabled className="text-2xl" />
        <span className="text-gray-600">
          ({product.reviews?.reviewItems?.length || 0} reviews)
        </span>
      </div>
      <p className="text-3xl font-semibold mt-4 text-blue-500">${product.price}</p>
      {/* features */}
      <div className="mt-4 text-gray-600 ">
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
          <Button onClick={increaseQuantity} icon="+" size="large" />
        </div>

        {/* Add to Cart Button */}
        <div className="mt-6 flex gap-5 flex-1">
          <Button onClick={() => handleAddToWishlist(product?.id)} type="default" variant="outlined" size="large" className="flex-1">
            Add to Wishlist
          </Button>
          <Button onClick={() => handleAddToCart(product?.id)} type="primary" size="large" color="primary" className="flex-1">
            Add to cart
          </Button>
        </div>
      </div>
      <Divider />
      <div className="">

        <p className="text-gray-500 mt-2">Free delivery on orders over $30.00</p>
        {/* Share Options */}
        <div className="mt-6 flex space-x-4">
          <Button icon={<FacebookOutlined />} />
          <Button icon={<TwitterOutlined />} />
          <Button icon={<WhatsAppOutlined />} />
        </div>
      </div>

      
    </div>
  );
};

export default ProductInfo;
