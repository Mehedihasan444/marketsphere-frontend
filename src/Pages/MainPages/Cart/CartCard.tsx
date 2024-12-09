import { Button, Divider, Input } from "antd";
import { useState } from "react";
import { TProduct } from "../../../Interface";

const CartCard = ({ product }:{product:TProduct}) => {
  const { name, price, images } = product;
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
