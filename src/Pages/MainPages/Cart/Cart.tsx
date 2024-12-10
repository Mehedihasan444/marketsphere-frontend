import React from "react";
import { Button, Drawer, Tooltip } from "antd";
import { IoCartOutline } from "react-icons/io5";
import CartCard from "./CartCard";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useGetCartItemsQuery } from "../../../Redux/Features/Cart/cartApi";
// const allProducts = [
//   {
//     id: "1",
//     name: "Smartphone Pro Max",
//     description:
//       "Latest Pro Max smartphone with cutting-edge technology and exceptional performance.",
//     price: 999.99,
//     images: [
//       "https://demo-uminex.myshopify.com/cdn/shop/products/products_9_2.jpg?v=1670907530&width=360",
//       "https://example.com/images/smartphone1-side.jpg",
//     ],
//     discount: 10.0,
//     quantity: 100,
//     categoryId: "cat1",
//     flashSaleId: "sale1",
//     shopId: "shop1",
//     rating: 4.5,

//     isDeleted: false,
//     createdAt: "2024-12-06T00:00:00.000Z",
//     updatedAt: "2024-12-06T00:00:00.000Z",
//   },
//   {
//     id: "2",
//     name: "Gaming Laptop X9",
//     description:
//       "High-performance gaming laptop designed for immersive gaming experiences.",
//     price: 1499.99,
//     images: [
//       "https://demo-uminex.myshopify.com/cdn/shop/products/products_19_2.jpg?v=1672303733&width=360",
//       "https://example.com/images/laptop1-open.jpg",
//     ],
//     discount: 15.0,
//     quantity: 50,
//     categoryId: "cat2",
//     flashSaleId: "sale2",
//     shopId: "shop2",
//     rating: 5,
//     isDeleted: false,
//     createdAt: "2024-12-06T00:00:00.000Z",
//     updatedAt: "2024-12-06T00:00:00.000Z",
//   },
//   {
//     id: "3",
//     name: "Noise-Cancelling Headphones",
//     description:
//       "Premium over-ear headphones with active noise cancellation and superior sound quality.",
//     price: 299.99,
//     images: [
//       "https://demo-uminex.myshopify.com/cdn/shop/products/products_23_2.jpg?v=1672305892&width=360",
//       "https://example.com/images/headphones1-side.jpg",
//     ],
//     discount: 5.0,
//     quantity: 200,
//     categoryId: "cat3",
//     flashSaleId: "sale3",
//     shopId: "shop3",
//     rating: 4.5,
//     isDeleted: false,
//     createdAt: "2024-12-06T00:00:00.000Z",
//     updatedAt: "2024-12-06T00:00:00.000Z",
//   },
//   {
//     id: "4",
//     name: "4K Drone Camera",
//     description:
//       "Compact drone with 4K UHD camera for stunning aerial photography.",
//     price: 599.99,
//     images: [
//       "https://demo-uminex.myshopify.com/cdn/shop/products/products_23_2.jpg?v=1672305892&width=360",
//       "https://example.com/images/drone1-flight.jpg",
//     ],
//     discount: 20.0,
//     quantity: 0,
//     categoryId: "cat4",
//     flashSaleId: "sale4",
//     shopId: "shop4",
//     rating: 4,
//     isDeleted: false,
//     createdAt: "2024-12-06T00:00:00.000Z",
//     updatedAt: "2024-12-06T00:00:00.000Z",
//   },
//   {
//     id: "5",
//     name: "VR Headset Ultimate",
//     description:
//       "Experience next-level virtual reality gaming with this lightweight and immersive VR headset.",
//     price: 399.99,
//     images: [
//       "https://demo-uminex.myshopify.com/cdn/shop/products/products_23_2.jpg?v=1672305892&width=360",
//       "https://example.com/images/vr1-side.jpg",
//     ],
//     discount: 12.0,
//     quantity: 120,
//     categoryId: "cat5",
//     flashSaleId: "sale5",
//     shopId: "shop5",
//     rating: 4.5,
//     isDeleted: false,
//     createdAt: "2024-12-06T00:00:00.000Z",
//     updatedAt: "2024-12-06T00:00:00.000Z",
//   },
// ];
const Cart: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const { data = {},isLoading,error } = useGetCartItemsQuery("");
  const { data: cartItems = [] } = data || {};


  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="relative">
      <div className="relative cursor-pointer" onClick={showLoading}>
        <IoCartOutline size={30} className="hover:text-blue-500" />
        <div className="absolute -top-2 -right-2 p-1 h-4  w-4 flex items-center justify-center bg-red-500 rounded-full text-white text-xs">
          <span>0</span>
        </div>
      </div>
      <Drawer
        closable
        destroyOnClose
        title={<p>Cart Items</p>}
        placement="right"
        open={open}
        loading={loading}
        onClose={() => setOpen(false)}
      >
        <div className="mb-28">
          {cartItems.map((product:any, idx:number) => (
            <div className="relative" key={idx}>
              <CartCard product={product.product} />
              <div className="absolute top-0 right-0 cursor-pointer">
                <Tooltip title={"Delete"}>
                  <DeleteOutlined className="hover:text-blue-500" />
                </Tooltip>
              </div>
            </div>
          ))}
        </div>

        {/* <Button
          type="primary"
          style={{ marginBottom: 16 }}
          onClick={showLoading}
        >
          Reload
        </Button> */}

        <div className="bg-neutral-100 p-6 absolute bottom-0 right-0 left-0 space-y-3">
          <div className="flex justify-between items-center gap-5">
            <span className="font-semibold">SUBTOTAL:</span>
            <span className="text-red-500 font-bold">$65456</span>
          </div>
          <Link to={"/cart"}>
            <Button
              shape={"round"}
              className="w-full"
              onClick={() => setOpen(false)}
            >
              VIEW CART
            </Button>
          </Link>
          <Button shape="round" type="primary" className="w-full">
            CHECK OUT
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default Cart;
