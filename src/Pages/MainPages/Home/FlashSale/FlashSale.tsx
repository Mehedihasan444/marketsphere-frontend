
import { Alert, Button, Progress, Skeleton } from "antd";
import ProductCard from "../../../../Components/Shared/ProductCard";
import { TProduct } from "../../../../Interface";
import Countdown from "react-countdown";
import { useGetFlashSaleProductsQuery, } from "../../../../Redux/Features/FlashSale/flashSaleApi";
import { useNavigate } from "react-router-dom";

const FlashSale = () => {
  const navigate = useNavigate();
  const { data = {}, isLoading, error } = useGetFlashSaleProductsQuery("");
  const products = data?.data || [];



  // Loading State
  if (isLoading) {
    return (
      <div className="bg-gray-50 mx-3 lg:mx-16 p-6 rounded-lg shadow mt-6">
        <div className="flex justify-between items-center mb-6">
          <Skeleton.Input style={{ width: 200 }} active />
          <Skeleton.Button style={{ width: 150 }} active />
        </div>
        <div className="flex flex-col lg:flex-row gap-2">
          <div className="w-full lg:w-1/3 bg-white p-4 rounded-lg border border-red-200">
            <Skeleton.Image style={{ width: '100%', height: 400 }} active />
            <Skeleton.Input style={{ width: 100, marginTop: 10 }} active />
            <Skeleton.Input style={{ width: 150, marginTop: 10 }} active />
            <Skeleton.Input style={{ width: 100, marginTop: 10 }} active />
            <Skeleton.Input style={{ width: 200, marginTop: 10 }} active />
          </div>
          <div className="w-full lg:w-2/3 grid-rows-2 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {Array(8).fill(0).map((_, index) => (
              <Skeleton key={index} active />
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
    <div className="bg-gray-50 mx-3 lg:mx-16 p-6 rounded-lg shadow mt-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">🔥 {highlightedProduct?.flashSale?.name}</h2>
        <Button
          variant="outlined"
          size="middle"
          className=""
          onClick={() => navigate("/flash-sale")}
        >
          Shop All Products
        </Button>
      </div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row gap-2">
        {/* Left Section: Today's Offer */}
        <div className="w-full lg:w-1/3 bg-white p-4 rounded-lg  border border-red-200">
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{highlightedProduct?.discount}%
          </span>
          <img
            src={highlightedProduct?.product.images[0]}
            alt={highlightedProduct?.product.name}
            className="w-full object-cover mt-2 mb-4 rounded"
          />
          <h3 className="text-gray-800 text-lg font-semibold">
            {highlightedProduct?.product.name}
          </h3>
          <div className="flex gap-2 items-center mt-2">
            <span className="text-red-600 text-xl font-bold">
              ${highlightedProduct?.product.price - ((highlightedProduct?.product.price * highlightedProduct?.discount) / 100)}.00
            </span>
            <span className="text-gray-400 line-through text-sm">
              ${highlightedProduct?.product.price}.00
            </span>
          </div>
          <p className="text-gray-600 text-sm mt-2">
            Hurry up! Offer ends in:
          </p>

          {/* Countdown Timer */}
          <div className="flex justify-center mt-4">
            <div className="flex justify-center items-center w-full p-3 bg-gray-800 text-white rounded-lg">

              <Countdown
                date={new Date(highlightedProduct?.flashSale?.endDateTime || Date.now())}
                renderer={({ days, hours, minutes, seconds }) => (
                  <div className="flex gap-2">
                    <span className="countdown-item bg-red-500 p-3 rounded-lg font-bold text-white text-lg">
                      {days} D
                    </span>
                    <span className="countdown-item flex items-center  rounded-lg font-bold text-white text-lg">
                      :
                    </span>
                    <span className="countdown-item bg-red-500 p-3 rounded-lg font-bold text-white text-lg">
                      {hours < 10 ? `0${hours}` : hours} H
                    </span>
                    <span className="countdown-item flex items-center  rounded-lg font-bold text-white text-lg">

                      :
                    </span>
                    <span className="countdown-item bg-red-500 p-3 rounded-lg font-bold text-white text-lg">
                      {minutes < 10 ? `0${minutes}` : minutes} M
                    </span>   <span className="countdown-item flex items-center  rounded-lg font-bold text-white text-lg">

                      :
                    </span>
                    <span className="countdown-item bg-red-500 p-3 rounded-lg font-bold text-white text-lg">
                      {seconds < 10 ? `0${seconds}` : seconds} S
                    </span>
                  </div>
                )}
                onComplete={() => {
                  // Optional: Handle countdown completion
                  console.log('Countdown completed');
                }}
              />

            </div>
          </div>
          <Progress
            percent={((highlightedProduct.product.quantity - 20) / highlightedProduct.product.quantity) * 100}
            status="active"
            strokeColor="#f5222d"
            showInfo={false}
            className="mt-4"
          />
          <p className="text-gray-600 text-xs mt-1">
            Sold: {(highlightedProduct.product.quantity - 20)}/{(highlightedProduct.product.quantity)}

          </p>

        </div>

        {/* Right Section: Product Grid */}
        <div className="w-full lg:w-2/3 grid-rows-2 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {products.slice(0, 8).map((product: any, index: number) => (
            <ProductCard product={product.product} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};


export default FlashSale;