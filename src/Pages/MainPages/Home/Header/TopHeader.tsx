import { Input } from "antd";
import { CiUser } from "react-icons/ci";
import Cart from "../../../../Components/Cart";
import Wishlist from "../../../../Components/Wishlist";
import { Link } from "react-router-dom";

const { Search } = Input;
const TopHeader = () => {
  return (
    <div className="bg-white lg:mx-16 px-4 py-5">
      <div className="grid  grid-cols-5 gap-4 justify-between items-center ">
        <div className="col-span-1 flex items-center">
          <img
            src="/src/assets/logo.webp"
            alt="logo"
            className="w-10 rounded-full h-auto"
          />
          <h1 className="text-3xl font-bold">MarketSphere</h1>
        </div>
        <div className="col-span-3 flex justify-center items-center">
          <Search
            placeholder="input search text"
            enterButton="Search"
            size="large"
            loading
            className="w-2/3"
          />
        </div>
        <div className="col-span-1 flex gap-4 justify-between items-center">
          <Link to="/login">
          <div className="flex justify-between items-center gap-2">
            <CiUser size={30} />
            <div className="">
              <h4 className="text-xs">Login</h4>
              <h4 className="text-sm font-semibold">Account</h4>
            </div>
          </div>
          </Link>
          <div className="flex justify-between items-center gap-2">
       <Wishlist/>
          </div>
          <div className="flex justify-between items-center gap-2">
            <Cart />
            <div className="">
              <h4 className="text-xs">Your Cart</h4>
              <h4 className="text-sm font-semibold">$0.00</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
