import React from "react";
import { Card, Rate, Typography, Tooltip, message } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline, IoEyeOutline, IoLayersOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TProduct } from "../../Interface";
import { useAddToCartMutation } from "../../Redux/Features/Cart/cartApi";
import { useAppSelector } from "../../Redux/hook";

const { Meta } = Card;
const { Text } = Typography;

const ProductCard: React.FC<{ product: TProduct }> = ({ product }) => {
  const user = useAppSelector((state) => state.auth.user);
  const [addToCart] = useAddToCartMutation();

  const handleAddToCart = async (productId: string) => {
    try {
      const res = await addToCart({ userEmail: user?.email, productId });
      console.log(res)
      if (res?.data?.success) {
        message.success("Product added to cart");
      } else if (res.error) {
        message.error(res?.error?.data?.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to add product to cart");
    }
  };

  const addToWishlist = (id: string) => {
    console.log(`Added ${product.name} to wishlist`);
    // Add your logic to add the product to the wishlist
  };

  const addToCompare = () => {
    console.log(`Added ${product.name} to compare`);
    // Add your logic to add the product to the compare list
  };
  return (
    <Card
      hoverable
      style={{
        width: 240,
        position: "relative",
        overflow: "hidden",
      }}
      cover={
        <img
          alt={product.name}
          src={product.images[0]}
          style={{ height: 200, objectFit: "cover" }}
        />
      }
    >
      {/* Hover icons */}
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          // opacity: 0,
          transition: "opacity 0.3s",
        }}
        className="hover:block hidden"
      >
        <Tooltip title="Add to Wishlist">
          <FaRegHeart className="" style={{ fontSize: 16, color: "#1890ff" }} />
        </Tooltip>
        <Tooltip title="View Details">
          <Link to={`/products/${product.id}`} style={{ color: "#1890ff" }}>
            <IoEyeOutline style={{ fontSize: 18, color: "#1890ff" }} />
          </Link>
        </Tooltip>
        <Tooltip title="Compare">
          <IoLayersOutline style={{ fontSize: 18, color: "#1890ff" }} />
        </Tooltip>
        <Tooltip title="Cart">
          <IoCartOutline
            onClick={() => handleAddToCart(product.id)}
            style={{ fontSize: 18, color: "#1890ff" }}
          />
        </Tooltip>
      </div>

      <Meta title={product.name} />
      <div style={{ marginTop: 10 }}>
        {/* Rating and Reviews */}
        <Rate disabled defaultValue={product.rating} style={{ fontSize: 14 }} />
        <Text type="secondary" style={{ marginLeft: 8 }}>
          {product.reviews?.length || 0} review
          {product.reviews?.length > 1 ? "s" : ""}
        </Text>
      </div>
      {/* Price */}
      <Text strong style={{ display: "block", marginTop: 8, fontSize: 16 }}>
        ${product.price.toFixed(2)}
      </Text>
      {/* Stock Status */}
      <div style={{ marginTop: 5 }}>
        {product.quantity > 0 ? (
          <Text type="success">
            <CheckCircleOutlined /> In stock
          </Text>
        ) : (
          <Text type="danger">
            <CloseCircleOutlined /> Out of stock
          </Text>
        )}
      </div>

      {/* <style>
        {`
          .ant-card:hover .hover-icons {
            opacity: 1;
          }
        `}
      </style> */}
    </Card>
  );
};

export default ProductCard;
