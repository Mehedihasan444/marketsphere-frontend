import { Button, Divider, Input, message } from "antd";
import { TProduct } from "../../../Interface";
import { useUpdateQuantityMutation } from "../../../Redux/Features/Cart/cartApi";

const CartCard = ({ product, quantity, id, refetch }: { product: TProduct, quantity: number, id: string, refetch: any }) => {
  const { name, price, images } = product;

  const [updateQuantity,] = useUpdateQuantityMutation()
  // Increase quantity
  const increaseQuantity = async () => {
    try {
      if (product.quantity < quantity) {
        message.error("Quantity exceeds stock")
        return
        
      }
      const res = await updateQuantity({ id: id, quantity: quantity +1})
      if (res?.data?.success) {
        message.success("Quantity updated")
        refetch()
      }
      else if (res.error) message.error(res?.error?.data.message)
    } catch (error) {
      console.log(error)
      message.error("Failed to update quantity")
    }
  };

  // Decrease quantity
  const decreaseQuantity = async () => {

    if (quantity > 1) {
      try {

        const res = await updateQuantity({ id: id, quantity: quantity-1 })
        if (res?.data?.success) {
          message.success("Quantity updated")
          refetch()
        }
        else if (res.error) message.error(res?.error?.data.message)
      } catch (error) {
        console.log(error)
        message.error("Failed to update quantity")
      }
    } else {
      message.error("Quantity cannot be less than 1")
    }
  };

  return (
    <div className="">
      <div className="flex justify-between gap-5">
        <div className="">
          <img
            src={images![0]}
            alt={name}
            className="h-32 w-32 object-contain"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{name}</h3>
          <h4 className="text-sm text-gray-400">Color: Blue</h4>
          <h3 className="text-blue-500 font-semibold">${price}</h3>
          {/* Quantity Control */}
          <div className="mt-4 flex items-center space-x-4">
            <Button
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
              icon="-"
              size="small"
            />
            <Input
              className="w-10 bg-neutral-100 text-center"
              value={quantity}
              size="small"
              readOnly
            />
            <Button onClick={increaseQuantity} icon="+" size="small" />
          </div>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default CartCard;
