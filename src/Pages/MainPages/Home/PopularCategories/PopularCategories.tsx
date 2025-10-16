


import { Link } from "react-router-dom";

const PopularCategories = () => {
    const categories = [
        {
            title: "Smartphones",
            description: "Latest models from top brands with advanced features and sleek designs.",
            icon: "📱",
        },
        {
            title: "Laptops",
            description: "Powerful laptops for work, gaming, and entertainment.",
            icon: "💻",
        },
        {
            title: "Wearables",
            description: "Smartwatches and fitness trackers to keep you connected and healthy.",
            icon: "⌚",
        },
        {
            title: "Audio Devices",
            description: "Headphones, earbuds, and speakers for immersive sound experiences.",
            icon: "🎧",
        },
        {
            title: "Cameras",
            description: "Capture moments with high-quality digital and action cameras.",
            icon: "📷",
        },
        {
            title: "Gaming Consoles",
            description: "Experience next-gen gaming with the latest consoles and accessories.",
            icon: "🎮",
        },
    ];

    return (
        <div className="my-8 max-w-7xl mx-auto ">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold">Popular Categories</h2>
                <Link to="/categories" className="text-sm text-gray-500 hover:text-blue-700 flex items-center gap-1">
                    all categories →
                </Link>
            </div>


            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category, index) => (
                    <Link
                        key={index}
                        to={`/category/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block"
                    >
                        <div className="bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg p-6 flex items-center justify-between cursor-pointer group">
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {category.description}
                                </p>
                            </div>
                            <div className="ml-4 text-5xl opacity-70 group-hover:opacity-100 transition-opacity">
                                {category.icon}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default PopularCategories;