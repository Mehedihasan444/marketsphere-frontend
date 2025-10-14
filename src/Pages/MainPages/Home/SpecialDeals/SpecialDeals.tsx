const SpecialDeals = () => {
  return (
    <section className="my-16 px-4 ">
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl overflow-hidden shadow-lg">
          <div className="grid lg:grid-cols-2 items-center">
            {/* Left Content */}
            <div className="p-12 lg:p-16 text-white">
              <p className="text-sm uppercase tracking-wider text-gray-400 mb-4">
                Special Offer
              </p>
              
              <h2 className="text-4xl lg:text-5xl font-light mb-6 leading-tight">
                Free Delivery
                <br />
                <span className="font-semibold">on orders over $100</span>
              </h2>
              
              <p className="text-gray-300 mb-8 text-lg">
                Shop your favorite products with complimentary shipping.
              </p>
              
              <button className="bg-white text-slate-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300">
                Shop Now
              </button>
            </div>
            
            {/* Right Image */}
            <div className="h-full min-h-[400px] relative">
              <img
                src="https://cdn.prod.website-files.com/5ef27cb65411b70949a151e9/5fa67de01a8f78f5d9392f2e_Free%20shipping%20(2).png"
                alt="Premium Shopping"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialDeals;