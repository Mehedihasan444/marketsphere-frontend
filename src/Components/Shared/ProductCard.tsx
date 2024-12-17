import React from "react";
import { Card, Rate, Typography, Tooltip, message } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline, IoEyeOutline, IoLayersOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { TProduct } from "../../Interface";
import { useAddToCartMutation } from "../../Redux/Features/Cart/cartApi";
import { useAppSelector } from "../../Redux/hook";
import { useAddToWishlistMutation } from "../../Redux/Features/Wishlist/wishlistApi";
import { useAddRecentViewProductMutation } from "../../Redux/Features/RecentViewProducts/recentViewProductsApi";

const { Meta } = Card;
const { Text } = Typography;

const ProductCard: React.FC<{ product: TProduct }> = ({ product }) => {
  const user = useAppSelector((state) => state.auth.user);
  const [addToCart] = useAddToCartMutation();
  const [addToWishlist] = useAddToWishlistMutation()
  const navigate = useNavigate();
  const [addRecentViewProduct] = useAddRecentViewProductMutation()

  // handle add to cart
  const handleAddToCart = async (productId: string) => {
    if (!user) {
      message.info("Please login to add product to cart");
    } else {

      try {
        const res = await addToCart({ userEmail: user?.email, productId });

        if (res?.data?.success) {
          message.success("Product added to cart");
        } else if (res.error) {
          if ('data' in res.error) {
            // For FetchBaseQueryError, safely access the `data` property
            const errorMessage = (res.error.data as { message?: string })?.message || "Product add to cart error occurred.";
            message.error(errorMessage);
          } else if ('message' in res.error) {
            // For SerializedError, handle the `message` property
            message.error(res.error.message || "Product add to cart error occurred.");
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
  const handleAddToWishlist = async (productId: string) => {
    if (!user) {
      message.info("Please login to add product to wishlist");
    } else {

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

  // Add to compare
  const addToCompare = () => {
    navigate(`/compare-products/${product.id}`);
  };

  // add recent view product
  const handleAddRecentViewProduct = async (productId: string) => {
    try {

      await addRecentViewProduct({ productId });

    } catch (error) {
      console.log(error);
      message.error("Failed to add product to recent view product");
    }

  }
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
      onClick={() => handleAddRecentViewProduct(product.id)}
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

          <FaRegHeart onClick={() => handleAddToWishlist(product.id)} className="" style={{ fontSize: 16, color: "#1890ff" }} />
        </Tooltip>
        <Tooltip title="View Details">
          <Link to={`/products/${product.id}`} style={{ color: "#1890ff" }}>
            <IoEyeOutline style={{ fontSize: 18, color: "#1890ff" }} />
          </Link>
        </Tooltip>
        <Tooltip title="Compare">
          <IoLayersOutline style={{ fontSize: 18, color: "#1890ff" }} onClick={addToCompare} />
        </Tooltip>
        <Tooltip title="Cart">
          <IoCartOutline
            onClick={() => handleAddToCart(product.id)}
            style={{ fontSize: 18, color: "#1890ff" }}
          />
        </Tooltip>
      </div>

      <div className="" onClick={() => navigate(`/products/${product.id}`)}>

        <Meta title={product.name} />
        <div style={{ marginTop: 10 }}>
          {/* Rating and Reviews */}
          <Rate disabled defaultValue={product.rating} style={{ fontSize: 14 }} />
          <Text type="secondary" style={{ marginLeft: 8 }}>
            {product.reviews?.reviewItems?.length || 0} review
            {product.reviews?.reviewItems?.length > 1 ? "s" : ""}
          </Text>
        </div>
        {/* Price */}
        <Text strong style={{ display: "block", marginTop: 8, fontSize: 16 }}>
          ${(Number(product.price.toFixed(2)) - product.discount).toFixed(2)}
          {product.discount > 0 && <span className="ml-2" style={{ textDecoration: "line-through", color: "gray" }}>{`$${product.price.toFixed(2)}`}</span>}
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
      </div>


    </Card>
  );
};

export default ProductCard;
