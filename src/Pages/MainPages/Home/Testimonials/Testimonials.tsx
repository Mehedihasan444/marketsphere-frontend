import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Testimonial data
const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Regular Customer',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      text: 'MarketSphere has completely changed how I shop online. The quality of products and customer service is outstanding!',
      rating: 5,
      date: 'May 15, 2023',
      purchased: 'Smart Watch X3'
    },
    {
      name: 'Michael Chen',
      role: 'Tech Enthusiast',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      text: 'I\'ve been shopping here for electronics for over a year. The prices are competitive and shipping is always fast. Their customer support team resolved my issue within hours!',
      rating: 5,
      date: 'June 22, 2023',
      purchased: 'Wireless Headphones'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Fashion Blogger',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      text: 'As someone who shops for fashion items regularly, I can confidently say that MarketSphere offers the best selection and quality. The return process is also seamless.',
      rating: 4,
      date: 'April 3, 2023',
      purchased: 'Designer Handbag'
    },
    {
      name: 'David Wilson',
      role: 'Home Decorator',
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
      text: 'The home decor items I purchased exceeded my expectations. The quality is excellent and the prices are reasonable. Will definitely shop here again!',
      rating: 5,
      date: 'July 10, 2023',
      purchased: 'Decorative Lamps'
    },
    {
      name: 'Sophia Martinez',
      role: 'Student',
      image: 'https://randomuser.me/api/portraits/women/90.jpg',
      text: 'As a student on a budget, I appreciate the affordable options without compromising on quality. The student discounts are a great bonus!',
      rating: 4,
      date: 'August 5, 2023',
      purchased: 'Laptop Backpack'
    }
  ];
// Testimonial Slider Component
const TestimonialSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);
  
    // For mobile swipe functionality
    const handleTouchStart = (e: React.TouchEvent) => {
      setTouchStart(e.targetTouches[0].clientX);
    };
  
    const handleTouchMove = (e: React.TouchEvent) => {
      setTouchEnd(e.targetTouches[0].clientX);
    };
  
    const handleTouchEnd = () => {
      if (touchStart - touchEnd > 100) {
        // Swipe left
        handleNext();
      }
  
      if (touchStart - touchEnd < -100) {
        // Swipe right
        handlePrev();
      }
    };
  
    const handlePrev = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
    };
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    };
  
    // Auto-scroll functionality
    useEffect(() => {
      const interval = setInterval(() => {
        handleNext();
      }, 5000); // Change slide every 5 seconds
  
      return () => clearInterval(interval);
    }, [currentIndex]);
  
    // Calculate visible testimonials based on screen size
    const getVisibleCount = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1024) return 2;
        return 3;
      }
      return 3;
    };
  
    const visibleCount = getVisibleCount();
  
    // Get visible testimonials
    const getVisibleTestimonials = () => {
      const result = [];
      for (let i = 0; i < visibleCount; i++) {
        const index = (currentIndex + i) % testimonials.length;
        result.push(testimonials[index]);
      }
      return result;
    };
  
    return (
      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white p-3 rounded-full shadow-md hover:bg-blue-50 transition-colors duration-300 focus:outline-none md:flex hidden"
        >
          <FaChevronLeft className="text-blue-600" />
        </button>
  
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-white p-3 rounded-full shadow-md hover:bg-blue-50 transition-colors duration-300 focus:outline-none md:flex hidden"
        >
          <FaChevronRight className="text-blue-600" />
        </button>
  
        {/* Testimonial Cards */}
        <div
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`px-4 min-w-full md:min-w-[50%] lg:min-w-[33.333%] transition-opacity duration-300 ${index >= currentIndex && index < currentIndex + visibleCount ? 'opacity-100' : 'opacity-0 hidden md:block'
                }`}
            >
              <div className="bg-white p-6 rounded-xl shadow-lg h-full">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
                  />
                  <div className="ml-4">
                    <h3 className="font-bold text-lg text-gray-800">{testimonial.name}</h3>
                    <p className="text-sm text-blue-600">{testimonial.role}</p>
                  </div>
                </div>
  
                <div className="mb-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xl">
                      {i < testimonial.rating ? "★" : "☆"}
                    </span>
                  ))}
                </div>
  
                <p className="text-gray-700 mb-4 italic leading-relaxed">"{testimonial.text}"</p>
  
                <div className="pt-4 border-t border-gray-100 mt-auto">
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Purchased: {testimonial.purchased}</span>
                    <span>{testimonial.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
  
        {/* Dots Indicator */}
        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 mx-1 rounded-full transition-colors duration-300 ${index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  };
const Testimonials = ()=>{

    return (
        <section className=" py-16 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
        <div className="lg:mx-16  mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">What Our Customers Say</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover why thousands of customers trust MarketSphere for their shopping needs</p>
          </div>

          {/* Testimonial Slider */}
          <TestimonialSlider />


        </div>
      </section>
    )
}
export default Testimonials;