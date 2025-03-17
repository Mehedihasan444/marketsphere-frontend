const SpecialDeals=()=>{
    return (
        <section className="relative bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20 px-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=1200&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center justify-between">
            <div className="max-w-xl">
              <h2 className="text-5xl font-bold mb-4 animate-fade-in">12.12 Special Deal</h2>
              <p className="text-xl mb-8 text-blue-100 animate-fade-in-delayed">
                Discover amazing deals on the latest tech products. Limited time offers you can't miss!
              </p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                Shop Now
              </button>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=500&q=80"
                alt="Tech Devices"
                className="rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
                width="500"
              />
            </div>
          </div>
        </div>
      </section>
    )
};

export default SpecialDeals;