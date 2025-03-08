import { Send } from "lucide-react"

const Newsletter =()=>{

    return(  <section className="py-16 mt-6 bg-gradient-to-r from-blue-700 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated with MarketSphere</h2>
            <p className="text-indigo-100 mb-8">
              Subscribe to our newsletter and get exclusive deals, new product alerts, and tech news delivered to your inbox.
            </p>
            <div className="flex space-x-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-all duration-300 flex items-center space-x-2">
                <span>Subscribe</span>
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>)
}

export default Newsletter