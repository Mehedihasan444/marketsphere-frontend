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
        // width: 240,
        position: "relative",
        overflow: "hidden",
      }}
      cover={
        <div className="relative flex justify-center items-center">
          <div className="flex justify-center items-center">

            <img
              alt={product.name}
              src={product.images[0]}
              style={{ height: 200, objectFit: "cover" }}
            />
          </div>
          {/* Discount Badge */}
          {product.discount > 0 && (
            <div
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                backgroundColor: "#ff4d4f", // Red badge
                color: "white",
                padding: "4px 8px",
                borderRadius: "12px",
                fontWeight: "bold",
                fontSize: "12px",
              }}
            >
              {`-${product.discount}%`}
            </div>
          )}
        </div>
      }
      onClick={() => handleAddRecentViewProduct(product.id)}
      className="shadow  hover:shadow-lg"
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

        <Meta title={product.name} style={{
          color: "#1890ff",
        }}/>
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
          <span className="text-blue-600">

            ${(Number(product.price.toFixed(2)) - product.discount).toFixed(2)}
          </span>

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
    //     <Card
    //   hoverable
    //   style={{
    //     position: "relative",
    //     overflow: "hidden",
    //     borderRadius: "12px", // Rounded corners for a modern look
    //     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
    //     transition: "transform 0.3s, box-shadow 0.3s", // Smooth hover animation
    //   }}
    //   className="hover:scale-105 hover:shadow-lg " // Tailwind for hover effects
    //   cover={
    //     <div style={{ position: "relative" }}>
    //       {/* Product Image */}
    //       <img
    //         alt={product.name}
    //         src={product.images[0]}
    //         style={{
    //           // height: 200,
    //           objectFit: "cover",
    //           borderRadius: "12px 12px 0 0", // Top rounded corners
    //           padding: "16px", // Add some padding for image
    //         }}
    //       />
    //       {/* Discount Badge */}
    //       {product.discount > 0 && (
    //         <div
    //           style={{
    //             position: "absolute",
    //             top: 10,
    //             left: 10,
    //             backgroundColor: "#ff4d4f", // Red badge
    //             color: "white",
    //             padding: "4px 8px",
    //             borderRadius: "12px",
    //             fontWeight: "bold",
    //             fontSize: "12px",
    //           }}
    //         >
    //           {`-${product.discount}%`}
    //         </div>
    //       )}
    //     </div>
    //   }
    //   onClick={() => handleAddRecentViewProduct(product.id)}
    // >
    //   {/* Hover Icons */}
    //   <div
    //     style={{
    //       position: "absolute",
    //       top: 10,
    //       right: 10,
    //       display: "flex",
    //       flexDirection: "column",
    //       gap: 8,
    //       transition: "opacity 0.3s",
    //     }}
    //     className=" opacity-0 hover:opacity-100" // Hover to reveal icons
    //   >
    //     <Tooltip title="Add to Wishlist">
    //       <FaRegHeart
    //         onClick={() => handleAddToWishlist(product.id)}
    //         style={{
    //           fontSize: 18,
    //           color: "#1890ff",
    //           cursor: "pointer",
    //         }}
    //         className="hover:text-red-500 cursor-pointer "
    //       />
    //     </Tooltip>
    //     <Tooltip title="View Details">
    //       <Link to={`/products/${product.id}`} style={{ color: "#1890ff" }}>
    //         <IoEyeOutline style={{ fontSize: 18 }} />
    //       </Link>
    //     </Tooltip>
    //     <Tooltip title="Compare">
    //       <IoLayersOutline
    //         onClick={addToCompare}
    //         style={{
    //           fontSize: 18,
    //           color: "#1890ff",
    //           cursor: "pointer",
    //         }}
    //       />
    //     </Tooltip>
    //     <Tooltip title="Add to Cart">
    //       <IoCartOutline
    //         onClick={() => handleAddToCart(product.id)}
    //         style={{
    //           fontSize: 18,
    //           color: "#1890ff",
    //           cursor: "pointer",
    //         }}
    //       />
    //     </Tooltip>
    //   </div>

    //   {/* Product Details */}
    //   <div className="pt-0">
    //     {/* Product Title */}
    //     <Meta
    //       title={
    //         <span className="text-lg font-semibold text-gray-800">
    //           {product.name}
    //         </span>
    //       }
    //       description={
    //         <Text type="secondary" style={{ fontSize: "14px" }}>
    //           {product.category?.name}
    //         </Text>
    //       }
    //     />

    //     {/* Rating and Reviews */}
    //     <div className="mt-2 flex items-center gap-2">
    //       <Rate disabled defaultValue={product.rating} style={{ fontSize: 14 }} />
    //       <Text type="secondary" style={{ fontSize: "12px" }}>
    //         {product.reviews?.reviewItems?.length || 0} review
    //         {product.reviews?.reviewItems?.length > 1 ? "s" : ""}
    //       </Text>
    //     </div>

    //     {/* Pricing Section */}
    //     <div className="mt-2">
    //       <Text strong className="text-lg text-blue-600">
    //         ${(
    //           Number(product.price.toFixed(2)) - product.discount
    //         ).toFixed(2)}
    //       </Text>
    //       {product.discount > 0 && (
    //         <span
    //           className="ml-2 text-gray-400 line-through"
    //           style={{ fontSize: "14px" }}
    //         >
    //           {`$${product.price.toFixed(2)}`}
    //         </span>
    //       )}
    //     </div>

    //     {/* Stock Status */}
    //     <div className="mt-2">
    //       {product.quantity > 0 ? (
    //         <Text type="success">
    //           <CheckCircleOutlined /> In Stock
    //         </Text>
    //       ) : (
    //         <Text type="danger">
    //           <CloseCircleOutlined /> Out of Stock
    //         </Text>
    //       )}
    //     </div>
    //   </div>
    // </Card>

  );
};

export default ProductCard;
