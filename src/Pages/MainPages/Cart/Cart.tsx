import React from "react";
import { Button, Drawer, message, Tooltip } from "antd";
import { IoCartOutline } from "react-icons/io5";
import CartCard from "./CartCard";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useClearCartMutation, useGetCartItemsQuery, useRemoveFromCartMutation } from "../../../Redux/Features/Cart/cartApi";
import { TCartItem } from "../../../Interface";


const Cart: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const { data = {}, isLoading, error } = useGetCartItemsQuery("");
  const { data: cartItems = [] } = data || {};
  const [removeFromCart] = useRemoveFromCartMutation()
  const [clearCart]=useClearCartMutation()
  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  const handleDelete = async (id: string) => {
    try {
      const res = await removeFromCart(id)
      if (res?.data?.success) message.success("Item deleted")
      else if (res?.error) message.error(res?.error?.data.message)
    } catch (error) {
      console.log(error)
      message.error("Failed to delete item")
    }
  }

  const handleClearCart = async (cartId:string) => {
    try {
      const res = await clearCart(cartId)
      if (res?.data?.success) message.success("Cart cleared")
      else if (res?.error) message.error(res?.error?.data.message)
    } catch (error) {
      console.log(error)
      message.error("Failed to clear cart")
    }
  }
  return (
    <div className="relative">
      <div className="relative cursor-pointer" onClick={showLoading}>
        <IoCartOutline size={30} className="hover:text-blue-500" />
        <div className="absolute -top-2 -right-2 p-1 h-4  w-4 flex items-center justify-center bg-red-500 rounded-full text-white text-xs">
          <span>{cartItems.length}</span>
        </div>
      </div>
      <Drawer
        closable
        destroyOnClose
        title={ <div className="flex justify-between items-center gap-4"> <p>Cart Items</p> <Button onClick={()=>handleClearCart(cartItems[0]?.cartId)} variant="outlined">Clear cart</Button></div>}
        placement="right"
        open={open}
        loading={loading}
        onClose={() => setOpen(false)}
      >
        <div className="mb-28">
          {cartItems?.map((cartItem: TCartItem, idx: number) => (
            <div className="relative" key={idx}>
              <CartCard product={cartItem.product} quantity={cartItem.quantity} id={cartItem.id} />
              <div className="absolute top-0 right-0 cursor-pointer">
                <Tooltip title={"Delete"}>
                  <DeleteOutlined onClick={() => handleDelete(cartItem.id)} className="hover:text-blue-500" />
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
