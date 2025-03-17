
import { Alert, Button, Progress, Skeleton } from "antd";
import ProductCard from "../../../../Components/Shared/ProductCard";
import { TProduct } from "../../../../Interface";
import Countdown from "react-countdown";
import { useGetFlashSaleProductsQuery } from "../../../../Redux/Features/FlashSale/flashSaleApi";
import { useNavigate } from "react-router-dom";
import { FaFire, FaShoppingCart, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const FlashSale = () => {
  const navigate = useNavigate();
  const { data = {}, isLoading, error } = useGetFlashSaleProductsQuery("");
  const products = data?.data || [];

  // Loading State
  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-red-50 to-orange-50 mx-3 lg:mx-16 p-8 rounded-2xl shadow-lg mt-10">
        <div className="flex justify-between items-center mb-8">
          <Skeleton.Input style={{ width: 250 }} active />
          <Skeleton.Button style={{ width: 180 }} active />
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-md">
            <Skeleton.Image style={{ width: '100%', height: 400 }} active />
            <Skeleton.Input style={{ width: 120, marginTop: 16 }} active />
            <Skeleton.Input style={{ width: 180, marginTop: 12 }} active />
            <Skeleton.Input style={{ width: 150, marginTop: 12 }} active />
            <Skeleton.Input style={{ width: 250, marginTop: 16 }} active />
          </div>
          <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array(8).fill(0).map((_, index) => (
              <Skeleton key={index} active className="h-64" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Alert
          message="Error Loading Products"
          description="We encountered an issue while loading Flash Sale products. Please try again later."
          type="error"
          showIcon
        />
      </div>
    );
  }

  // Highlighted Product: Product with the highest discount
  const highlightedProduct = products.find((product: any): boolean =>
    product.discount >= Math.max(...products.map((p: TProduct): number => p.discount))
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white  lg:px-16 p-8  mt-10"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <motion.h2 
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="text-3xl font-bold text-gray-800 flex items-center mb-4 md:mb-0"
        >
          <FaFire className="text-blue-500 mr-3 animate-pulse" /> 
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
            {highlightedProduct?.flashSale?.name || "Flash Sale"}
          </span>
        </motion.h2>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            type="primary"
            size="large"
            icon={<FaShoppingCart className="mr-2" />}
            onClick={() => navigate("/flash-sale")}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 border-0 hover:from-blue-600 hover:to-indigo-600 font-semibold"
          >
            Shop All Flash Sale Products
          </Button>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section: Today's Offer */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500"
        >
          <div className="relative">
            <span className="absolute top-4 left-4 bg-blue-500 text-white text-sm font-bold px-3 py-1 rounded-full z-10 shadow-md">
              -{highlightedProduct?.discount}% OFF
            </span>
            <div className="overflow-hidden rounded-lg">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                src={highlightedProduct?.product.images[0]}
                alt={highlightedProduct?.product.name}
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
          </div>
          
          <h3 className="text-gray-800 text-xl font-bold mt-6 line-clamp-2">
            {highlightedProduct?.product.name}
          </h3>
          
          <div className="flex gap-3 items-center mt-3">
            <span className="text-blue-600 text-2xl font-bold">
              ${(highlightedProduct?.product.price - ((highlightedProduct?.product.price * highlightedProduct?.discount) / 100)).toFixed(2)}
            </span>
            <span className="text-gray-400 line-through text-lg">
              ${highlightedProduct?.product.price.toFixed(2)}
            </span>
          </div>
          
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 font-medium mb-3 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              Hurry up! Offer ends in:
            </p>

            {/* Countdown Timer */}
            <div className="mt-2">
              <Countdown
                date={new Date(highlightedProduct?.flashSale?.endDateTime || Date.now())}
                renderer={({ days, hours, minutes, seconds }) => (
                  <div className="grid grid-cols-4 gap-2">
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-800 w-full py-3 rounded-lg text-center font-bold text-white text-xl shadow-md">
                        {days}
                      </div>
                      <span className="text-xs mt-1 text-gray-600">Days</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-800 w-full py-3 rounded-lg text-center font-bold text-white text-xl shadow-md">
                        {hours < 10 ? `0${hours}` : hours}
                      </div>
                      <span className="text-xs mt-1 text-gray-600">Hours</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-800 w-full py-3 rounded-lg text-center font-bold text-white text-xl shadow-md">
                        {minutes < 10 ? `0${minutes}` : minutes}
                      </div>
                      <span className="text-xs mt-1 text-gray-600">Minutes</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-800 w-full py-3 rounded-lg font-bold text-center text-white text-xl shadow-md">
                        {seconds < 10 ? `0${seconds}` : seconds}
                      </div>
                      <span className="text-xs mt-1 text-gray-600">Seconds</span>
                    </div>
                  </div>
                )}
                onComplete={() => {
                  console.log('Countdown completed');
                }}
              />
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Selling Fast!</span>
              <span>{(highlightedProduct.product.quantity - 20)}/{(highlightedProduct.product.quantity)} sold</span>
            </div>
            <Progress
              percent={((highlightedProduct.product.quantity - 20) / highlightedProduct.product.quantity) * 100}
              status="active"
              strokeColor={{ from: '#1890ff', to: '#4c51bf' }}
              showInfo={false}
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full mt-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center"
            onClick={() => navigate(`/product/${highlightedProduct.product.id}`)}
          >
            Shop Now <FaArrowRight className="ml-2" />
          </motion.button>
        </motion.div>

        {/* Right Section: Product Grid */}
        <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.slice(0, 8).map((product: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <ProductCard product={product.product} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FlashSale;