import { Input } from "antd";
import { CiUser } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";

const { Search } = Input;
const TopHeader = () => {
  return (
    <div className="bg-white lg:mx-16 px-4 py-2">
      <div className="grid  grid-cols-5 gap-4 justify-between items-center ">
        <div className="col-span-1 flex items-center">
            <img src="/src/assets/logo.webp" alt="logo" className="w-10 rounded-full h-auto" />
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
          <div className="flex justify-between items-center gap-2">
            <CiUser size={30} />
            <div className="">
              <h4 className="text-xs">Login</h4>
              <h4 className="text-sm font-semibold">Account</h4>
            </div>
          </div>
          <div className="flex justify-between items-center gap-2">
            <div className="relative">
              <FaRegHeart size={25} />
              <div className="absolute -top-2 -right-2 p-1 h-4  w-4 flex items-center justify-center bg-red-500 rounded-full text-white text-xs">
                <span>0</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center gap-2">
            <div className="relative">
              <IoCartOutline size={30} />
              <div className="absolute -top-2 -right-2 p-1 h-4  w-4 flex items-center justify-center bg-red-500 rounded-full text-white text-xs">
                <span>0</span>
              </div>
            </div>
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
