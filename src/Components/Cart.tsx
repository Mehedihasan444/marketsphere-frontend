import React from "react";
import { Button, Drawer } from "antd";
import { IoCartOutline } from "react-icons/io5";

const Cart: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <div className="relative cursor-pointer" onClick={showLoading}>
        <IoCartOutline size={30} className="hover:text-blue-500"/>
        <div className="absolute -top-2 -right-2 p-1 h-4  w-4 flex items-center justify-center bg-red-500 rounded-full text-white text-xs">
          <span>0</span>
        </div>
      </div>
      <Drawer
        closable
        destroyOnClose
        title={<p>Loading Cart Items</p>}
        placement="right"
        open={open}
        loading={loading}
        onClose={() => setOpen(false)}
      >
        <Button
          type="primary"
          style={{ marginBottom: 16 }}
          onClick={showLoading}
        >
          Reload
        </Button>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default Cart;
