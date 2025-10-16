import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import ProductCard from '../../../../Components/Shared/ProductCard';
import { useGetProductsQuery } from '../../../../Redux/Features/Product/productApi';
import { TProduct } from '../../../../Interface';
import { Skeleton } from 'antd';

const TrendingProducts = () => {
  const [currentTrendingIndex, setCurrentTrendingIndex] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState<TProduct[]>([]);
  const { data = {}, isLoading } = useGetProductsQuery({});
  const { data: trendingProducts = [] } = data?.data || [];
  
  // Number of products to show at once based on screen size
  const [productsToShow, setProductsToShow] = useState(4);

  // Update products to show based on window size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setProductsToShow(1);
      } else if (window.innerWidth < 768) {
        setProductsToShow(2);
      } else if (window.innerWidth < 1024) {
        setProductsToShow(3);
      } else {
        setProductsToShow(4);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update visible products when trending products or current index changes
  useEffect(() => {
    if (trendingProducts && trendingProducts.length > 0) {
      const endIndex = Math.min(currentTrendingIndex + productsToShow, trendingProducts.length);
      setVisibleProducts(trendingProducts.slice(currentTrendingIndex, endIndex));
    }
  }, [trendingProducts, currentTrendingIndex, productsToShow]);

  // Handle navigation
  const handlePrevious = () => {
    setCurrentTrendingIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentTrendingIndex(prev => 
      Math.min(prev + 1, Math.max(0, trendingProducts.length - productsToShow))
    );
  };

  // Skeleton loader component
  const ProductSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Skeleton.Image className="w-full h-48" active />
      <div className="p-4">
        <Skeleton.Input active size="small" className="mb-2 w-3/4" />
        <Skeleton active paragraph={{ rows: 1 }} />
        <div className="flex justify-between mt-2">
          <Skeleton.Input active size="small" className="w-1/4" />
          <Skeleton.Button active size="small" className="w-1/4" />
        </div>
      </div>
    </div>
  );

  // Render skeleton loaders during loading state
  if (isLoading) {
    return (
      <section className="py-16 bg-white lg:px-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <Skeleton.Input active size="large" className="w-1/4" />
            <div className="flex space-x-2">
              <Skeleton.Button active shape="circle" />
              <Skeleton.Button active shape="circle" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array(productsToShow).fill(null).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!trendingProducts || trendingProducts.length === 0) {
    return <div className="py-16 text-center">No trending products available</div>;
  }

  return (
    <section className="py-16 bg-white ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Trending Now</h2>
          <div className="flex space-x-2">
            <button
              onClick={handlePrevious}
              disabled={currentTrendingIndex === 0}
              className={`p-2 rounded-full transition-colors duration-300 ${
                currentTrendingIndex === 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-100 hover:bg-indigo-100 text-gray-600'
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentTrendingIndex >= trendingProducts.length - productsToShow}
              className={`p-2 rounded-full transition-colors duration-300 ${
                currentTrendingIndex >= trendingProducts.length - productsToShow
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-100 hover:bg-indigo-100 text-gray-600'
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {visibleProducts.map((product: TProduct, index: number) => (
            <div 
              key={product.id || index} 
              className="transition-all duration-300 transform hover:scale-105"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;