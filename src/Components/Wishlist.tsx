import React from "react";
import { Button, Divider, Drawer, Empty, message, Tooltip } from "antd";
import { useClearWishlistMutation, useGetWishlistItemsQuery, useRemoveFromWishlistMutation } from "../Redux/Features/Wishlist/wishlistApi";
import { TWishlistItem } from "../Interface";
import { DeleteOutlined } from "@ant-design/icons";
import { Heart } from "lucide-react";
const Wishlist: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const { data = {}, isLoading, } = useGetWishlistItemsQuery("");
  const { data: wishlistItems = [] } = data || {};
  const [removeFromWishlist] = useRemoveFromWishlistMutation()
  const [clearWishlist] = useClearWishlistMutation()

  const handleDelete = async (id: string) => {
    try {
      const res = await removeFromWishlist(id)
      if (res?.data?.success) message.success("Item deleted")
      else if (res?.error) {
        if ('data' in res.error) {
          // For FetchBaseQueryError, safely access the `data` property
          const errorMessage = (res.error.data as { message?: string })?.message || "Item delete error occurred.";
          message.error(errorMessage);
        } else if ('message' in res.error) {
          // For SerializedError, handle the `message` property
          message.error(res.error.message || "Item delete error occurred.");
        } else {
          // Handle unknown error types
          message.error("An unknown error occurred.");
        }
      }
    } catch (error) {
      console.log(error)
      message.error("Failed to delete item")
    }
  }

  const handleClearWishlist = async (wishlistId: string) => {
    try {
      const res = await clearWishlist(wishlistId)
      if (res?.data?.success) message.success("Wishlist cleared")
      else if (res?.error) {
        if ('data' in res.error) {
          // For FetchBaseQueryError, safely access the `data` property
          const errorMessage = (res.error.data as { message?: string })?.message || "Wishlist clear error occurred.";
          message.error(errorMessage);
        } else if ('message' in res.error) {
          // For SerializedError, handle the `message` property
          message.error(res.error.message || "Wishlist clear error occurred.");
        } else {
          // Handle unknown error types
          message.error("An unknown error occurred.");
        }
      }
    } catch (error) {
      console.log(error)
      message.error("Failed to clear wishlist")
    }
  }
  return (
    <>
      <div className="relative cursor-pointer" onClick={() => setOpen(true)}>
        <button className="text-gray-600 hover:text-blue-600 transition-transform duration-300 hover:scale-110" >
          <Heart size={24} />
        </button>
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
          {wishlistItems?.length || 0}
        </span>
        {/* <FaRegHeart size={25} className="hover:text-blue-500" /> */}
        {/* <div className="absolute -top-2 -right-2 p-1 h-4  w-4 flex items-center justify-center bg-red-500 rounded-full text-white text-xs">
          <span>{wishlistItems?.length || 0}</span>
        </div> */}
      </div>
      <Drawer
        closable
        destroyOnClose
        title={<div className="flex justify-between items-center gap-4"> <p>Cart Items</p> <Button disabled={wishlistItems.length == 0} onClick={() => handleClearWishlist(wishlistItems[0]?.wishlistId)} variant="outlined">Clear wishlist</Button></div>}
        placement="right"
        open={open}
        loading={isLoading}
        onClose={() => setOpen(false)}
      >
        <div className="mb-28">
          {wishlistItems.length > 0 ? wishlistItems?.map((wishlistItem: TWishlistItem, idx: number) => (
            <div className="relative" key={idx}>
              <div className="">
                <div className="flex justify-between gap-5">
                  <div className="">
                    <img
                      src={wishlistItem?.product?.images![0]}
                      alt={wishlistItem?.product?.name}
                      className="h-32 w-32 object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{wishlistItem?.product?.name}</h3>
                    <h4 className="text-sm text-gray-400">Color: Blue</h4>
                    <h3 className="text-blue-500 font-semibold">${wishlistItem?.product?.price}</h3>

                  </div>
                </div>
                <Divider />
              </div>
              <div className="absolute top-0 right-0 cursor-pointer">
                <Tooltip title={"Delete"}>
                  <DeleteOutlined onClick={() => handleDelete(wishlistItem.id)} className="hover:text-blue-500" />
                </Tooltip>
              </div>
            </div>
          )) : <div className="h-[70vh] flex flex-col justify-center items-center"><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"Wishlist is empty"} /></div>}
        </div>

      </Drawer>
    </>
  );
};

export default Wishlist;
