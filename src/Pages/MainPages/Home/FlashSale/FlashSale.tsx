// import { Alert, Button, Spin } from "antd";
// import ProductCard from "../../../../Components/Shared/ProductCard";
// import { TProduct } from "../../../../Interface";
// import { useGetProductsQuery } from "../../../../Redux/Features/Product/productApi";

// const FlashSale = () => {
//   const { data = {}, isLoading, error } = useGetProductsQuery({ brand: "", category: "", page: 1, limit: 10, searchTerm: "" });
//   const { data: products } = data?.data || {};

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen w-full">
//         <Spin tip="Loading..." />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <Alert
//         message="Error"
//         description="Failed to load products."
//         type="error"
//         showIcon
//       />
//     );
//   }

//   return (
//     <div className="bg-white lg:mx-16 p-4 mt-4">
//       {/* title */}
//       <div className="py-4 ">
//         <div className="flex justify-between items-center pb-2">
//           <h2 className="text-xl font-semibold ">Flash Sale</h2>
//           <Button
//             color="primary"
//             // size="large"
//             type="primary"
//             variant="outlined"
//             shape="default"
//             className="border-blue-500"
//           >
//             SHOP ALL PRODUCTS
//           </Button>
//         </div>
//         <hr />
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-2 items-center">
//         {/* product list */}
//         {products.slice(0,6).map((product:TProduct, index:number) => (
//           <ProductCard product={product} key={index} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FlashSale;
import { Alert, Button, Progress, Spin } from "antd";
import ProductCard from "../../../../Components/Shared/ProductCard";
import { TProduct } from "../../../../Interface";
import { useGetProductsQuery } from "../../../../Redux/Features/Product/productApi";
import Countdown from "react-countdown";

const FlashSale = () => {
  const { data = {}, isLoading, error } = useGetProductsQuery({
    brand: "",
    category: "",
    page: 1,
    limit: 8,
    searchTerm: "",
  });
  const { data: products } = data?.data || {};

  // Simulated "Today's Offer" Product
  const featuredProduct = {
    name: "Samsung Galaxy S21 Ultra 128GB - Black",
    price: 1200,
    originalPrice: 1500,
    discount: 200,
    sold: 85,
    total: 100,
    countdown: "02:02:50",
    imageUrl:
      "https://demo-uminex.myshopify.com/cdn/shop/products/products_6_2.jpg?v=1670906329&width=360", // Replace with actual image URL
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh] w-full">
        <Spin tip="Loading Flash Sale..." size="large" />
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

  return (
    <div className="bg-gray-50 lg:mx-16 p-6 rounded-lg shadow-md mt-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">🔥 Flash Sale</h2>
        <Button
          type="primary"
          size="large"
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Shop All Products
        </Button>
      </div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section: Today's Offer */}
        <div className="w-full lg:w-1/3 bg-white p-4 rounded-lg shadow-md border border-red-200">
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{featuredProduct.discount}%
          </span>
          <img
            src={featuredProduct.imageUrl}
            alt={featuredProduct.name}
            className="w-full object-cover mt-2 mb-4 rounded"
          />
          <h3 className="text-gray-800 text-lg font-semibold">
            {featuredProduct.name}
          </h3>
          <div className="flex gap-2 items-center mt-2">
            <span className="text-red-600 text-xl font-bold">
              ${featuredProduct.price}.00
            </span>
            <span className="text-gray-400 line-through text-sm">
              ${featuredProduct.originalPrice}.00
            </span>
          </div>
          <p className="text-gray-600 text-sm mt-2">
            Hurry up! Offer ends in:
          </p>

          {/* Countdown Timer */}
          <div className="flex justify-center mt-4">
            <div className="flex justify-between items-center w-full p-3 bg-gray-800 text-white rounded-lg">
              <div className="flex flex-col items-center mx-4">
                <span className="text-3xl font-bold">
                  <Countdown
                    date={Date.now() + (30 * 24 * 60 * 60 * 1000)}
                    renderer={({ hours }) => (
                      <span>{hours < 10 ? `0${hours}` : hours}</span>
                    )}
                  />
                </span>
                <span className="text-xs">HOURS</span>
              </div>
              :
              <div className="flex flex-col items-center mx-4">
                <span className="text-3xl font-bold">
                  <Countdown
                    date={Date.now() + (30 * 24 * 60 * 60 * 1000)}
                    renderer={({ minutes }) => (
                      <span>{minutes < 10 ? `0${minutes}` : minutes}</span>
                    )}
                  />
                </span>
                <span className="text-xs">MINUTES</span>
              </div>
              :
              <div className="flex flex-col items-center mx-4">
                <span className="text-3xl font-bold">
                  <Countdown
                    date={Date.now() + (30 * 24 * 60 * 60 * 1000)}
                    renderer={({ seconds }) => (
                      <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
                    )}
                  />
                </span>
                <span className="text-xs">SECONDS</span>
              </div>
            </div>
          </div>
          <Progress
            percent={(featuredProduct.sold / featuredProduct.total) * 100}
            status="active"
            strokeColor="#f5222d"
            showInfo={false}
            className="mt-4"
          />
          <p className="text-gray-600 text-xs mt-1">
            Sold: {featuredProduct.sold}/{featuredProduct.total}
          </p>
        </div>

        {/* Right Section: Product Grid */}
        <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map((product: TProduct, index: number) => (
            <div
              key={index}
              className="p-4 border rounded-lg bg-white hover:scale-105 transform transition-transform duration-300"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashSale;
