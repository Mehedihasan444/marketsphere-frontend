import { useState, useEffect } from "react";
import { FloatButton, Skeleton } from "antd";
import Banner from "./Banner/Banner";
import PersonalizedProducts from "./PersonalizedProducts/PersonalizedProducts";
import { BiSolidUpArrowSquare } from "react-icons/bi";
import FlashSale from "./FlashSale/FlashSale";
import UnAuthorizedUserProducts from "./UnAuthorizedUserProducts/UnAuthorizedUserProducts";
import { useAppSelector } from "../../../Redux/hook";
import TrendingProducts from "./TrendingProducts/TrendingProducts";
import Features from "./Features/Features";
import PopularCategories from "./PopularCategories/PopularCategories";
import SpecialDeals from "./SpecialDeals/SpecialDeals";



const Home = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto min-h-screen">
        {/* Banner Skeleton */}
        <div className="mt-4 px-4 ">
          <Skeleton.Input
            active
            block
            style={{ height: '400px', borderRadius: '12px' }}
          />
        </div>

        {/* Features Skeleton */}
        <div className="px-4 lg:px-16 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg">
                <Skeleton active avatar paragraph={{ rows: 2 }} />
              </div>
            ))}
          </div>
        </div>

        {/* Popular Categories Skeleton */}
        <div className="px-4 lg:px-16 mt-12">
          <Skeleton.Input active style={{ width: '250px', marginBottom: '24px' }} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-100 rounded-lg p-6">
                <Skeleton active paragraph={{ rows: 2 }} />
              </div>
            ))}
          </div>
        </div>

        {/* Trending Products Skeleton */}
        <div className="px-4 lg:px-16 mt-12">
          <Skeleton.Input active style={{ width: '250px', marginBottom: '24px' }} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow">
                <Skeleton.Image active style={{ width: '100%', height: '200px' }} />
                <div className="p-4">
                  <Skeleton active paragraph={{ rows: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flash Sale Skeleton */}
        <div className="px-4 lg:px-16 mt-12">
          <Skeleton.Input active style={{ width: '250px', marginBottom: '24px' }} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow">
                <Skeleton.Image active style={{ width: '100%', height: '200px' }} />
                <div className="p-4">
                  <Skeleton active paragraph={{ rows: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Deals Skeleton */}
        <div className="px-4 lg:px-16 mt-12">
          <div className="bg-gray-200 rounded-2xl overflow-hidden" style={{ height: '400px' }}>
            <div className="grid lg:grid-cols-2 h-full">
              <div className="p-12">
                <Skeleton active paragraph={{ rows: 4 }} />
              </div>
              <div className="bg-gray-300"></div>
            </div>
          </div>
        </div>

        {/* Products Skeleton */}
        <div className="px-4 lg:px-16 mt-12 mb-12">
          <Skeleton.Input active style={{ width: '250px', marginBottom: '24px' }} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow">
                <Skeleton.Image active style={{ width: '100%', height: '200px' }} />
                <div className="p-4">
                  <Skeleton active paragraph={{ rows: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto  min-h-screen">
      {/*banner section  */}
      <Banner />

      {/* Features with hover animations */}
      <Features />

      {/* categories section */}
      <PopularCategories />

      {/* Trending Products Carousel */}
      <TrendingProducts />

      {/* flash sale */}
      <FlashSale />
      {/* special deal section */}
      <SpecialDeals />
      {/* user based products */}
      {
        user ?
          <PersonalizedProducts /> :
          <UnAuthorizedUserProducts />
      }

      {/* Scroll-to-top button */}
      <FloatButton
        shape="square"
        type="primary"
        style={{ insetInlineEnd: 24 }}
        icon={<BiSolidUpArrowSquare />}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
    </div>
  );
};

export default Home;
