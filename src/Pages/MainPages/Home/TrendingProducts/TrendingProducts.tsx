import { Clock, Truck, Shield, HeadphonesIcon as HeadphoneIcon, Send, ChevronRight, ArrowRight, ChevronLeft } from 'lucide-react';
import { useState } from 'react';

// fake data

const trendingProducts = [
    {
      id: 1,
      name: "MacBook Pro M2",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
      price: 1299,
      discount: 15
    },
    {
      id: 2,
      name: "Sony WH-1000XM5",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
      price: 399,
      discount: 20
    },
    {
      id: 3,
      name: "iPhone 15 Pro",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&q=80",
      price: 999,
      discount: 10
    }
  ];
  
const TrendingProducts = () => {
  const [currentTrendingIndex, setCurrentTrendingIndex] = useState(0);

  return (
    <section className="py-16 bg-white lg:px-16">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Trending Now</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentTrendingIndex(prev => (prev > 0 ? prev - 1 : trendingProducts.length - 1))}
            className="p-2 rounded-full bg-gray-100 hover:bg-indigo-100 transition-colors duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={() => setCurrentTrendingIndex(prev => (prev < trendingProducts.length - 1 ? prev + 1 : 0))}
            className="p-2 rounded-full bg-gray-100 hover:bg-indigo-100 transition-colors duration-300"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {trendingProducts.map((product, index) => (
          <div
            key={product.id}
            className={`bg-gray-50 rounded-2xl overflow-hidden transition-all duration-500 ${index === currentTrendingIndex ? 'scale-105 shadow-xl' : 'scale-95 opacity-50'
              }`}
          >
            <div className="aspect-[4/3] relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {product.discount}% OFF
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-indigo-600">${product.price}</p>
                <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                  <span>Buy Now</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default TrendingProducts;