import { FloatButton, Skeleton } from "antd";
import Banner from "./Banner/Banner";
import PersonalizedProducts from "./PersonalizedProducts/PersonalizedProducts";
import { BiSolidUpArrowSquare } from "react-icons/bi";
import FlashSale from "./FlashSale/FlashSale";
import UnAuthorizedUserProducts from "./UnAuthorizedUserProducts/UnAuthorizedUserProducts";
import { useAppSelector } from "../../../Redux/hook";
import TrendingProducts from "./TrendingProducts/TrendingProducts";
import Newsletter from "./Newsletter/Newsletter";
import Features from "./Features/Features";
import SpecialDeals from "./SpecialDeals/SpecialDeals";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Testimonials from "./Testimonials/Testimonials";




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
      <div className="max-w-8xl lg:px-16 mx-auto bg-neutral-100 min-h-screen p-4">
        <Skeleton.Input active style={{ width: '100%', height: '400px' }} />

        <div className="mt-8">
          <Skeleton.Input active style={{ width: '200px', marginBottom: '20px' }} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} active avatar paragraph={{ rows: 3 }} />
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Skeleton.Input active style={{ width: '200px', marginBottom: '20px' }} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} active paragraph={{ rows: 4 }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-8xl mx-auto bg-neutral-100 min-h-screen">
      <Banner />



      {/* Features with hover animations */}
      <Features />

      {/* Trending Products Carousel */}
      <TrendingProducts />

      {/* SpecialDeals */}
      <SpecialDeals />

      {/* flash sale */}
      <FlashSale />

      {/* Featured categories section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Shop by Category</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore our wide range of products across popular categories</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'Electronics', icon: '💻', color: 'bg-blue-100', textColor: 'text-blue-700', borderColor: 'border-blue-300', hoverBg: 'hover:bg-blue-50' },
              { name: 'Fashion', icon: '👕', color: 'bg-purple-100', textColor: 'text-purple-700', borderColor: 'border-purple-300', hoverBg: 'hover:bg-purple-50' },
              { name: 'Home & Garden', icon: '🏡', color: 'bg-green-100', textColor: 'text-green-700', borderColor: 'border-green-300', hoverBg: 'hover:bg-green-50' },
              { name: 'Beauty', icon: '💄', color: 'bg-pink-100', textColor: 'text-pink-700', borderColor: 'border-pink-300', hoverBg: 'hover:bg-pink-50' },
              { name: 'Sports', icon: '⚽', color: 'bg-orange-100', textColor: 'text-orange-700', borderColor: 'border-orange-300', hoverBg: 'hover:bg-orange-50' },
              { name: 'Toys', icon: '🧸', color: 'bg-yellow-100', textColor: 'text-yellow-700', borderColor: 'border-yellow-300', hoverBg: 'hover:bg-yellow-50' }
            ].map((category, index) => (
              <Link to={`/products?category=${category.name}`} key={index} className="group">
                <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg border-b-4 ${category.borderColor} ${category.hoverBg}`}>
                  <div className={`h-36 ${category.color} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute -top-6 -right-6 w-12 h-12 bg-white opacity-10 rounded-full"></div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 bg-white opacity-10 rounded-full"></div>
                    <span className="text-6xl transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">{category.icon}</span>
                  </div>
                  <div className="p-5 text-center">
                    <h3 className={`font-semibold text-lg ${category.textColor}`}>{category.name}</h3>
                    <div className="mt-3 flex items-center justify-center">
                      <span className="text-sm text-blue-600 font-medium">Shop Now</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-blue-600 transform group-hover:translate-x-2 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products" className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg">
              View All Categories
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />

      {/* Testimonials section */}
      <Testimonials />

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
