import BannerCarousal from "./BannerCarousal";
import BannerCategoryMenu from "./BannerCategoryMenu";


const Style1 = {
  backgroundImage:
    "url(https://demo-uminex.myshopify.com/cdn/shop/files/3_1.jpg?v=1681466981&width=2000)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundColor: "rgba(0,0,0,0.5)",
};
const Style2 = {
  backgroundImage:
    "url(https://demo-uminex.myshopify.com/cdn/shop/files/3_2.jpg?v=1681466999&width=2000)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundColor: "rgba(0,0,0,0.5)",
};
const Style3 = {
  backgroundImage:
    "url(https://demo-uminex.myshopify.com/cdn/shop/files/3_3.jpg?v=1681467017&width=2000)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundColor: "rgba(0,0,0,0.5)",
};
const items = [
  {
    src: "https://demo-uminex.myshopify.com/cdn/shop/files/col_3_1.png?v=1681548716&width=2000",
    alt: "Tablets/Ipad",
    title: "Tablets/Ipad",
  },
  {
    src: "https://demo-uminex.myshopify.com/cdn/shop/files/col_3_2.png?v=1681548716&width=2000",
    alt: "Smart Phone",
    title: "Smart Phone",
  },
  {
    src: "https://demo-uminex.myshopify.com/cdn/shop/files/col_3_3.png?v=1681548716&width=2000",
    alt: "Camera",
    title: "Camera",
  },
  {
    src: "https://demo-uminex.myshopify.com/cdn/shop/files/col_3_4.png?v=1681548715&width=2000",
    alt: "Gamepad",
    title: "Gamepad",
  },
  {
    src: "https://demo-uminex.myshopify.com/cdn/shop/files/col_3_5.png?v=1681548716&width=2000",
    alt: "Cooler",
    title: "Cooler",
  },
  {
    src: "https://demo-uminex.myshopify.com/cdn/shop/products/products_33_2.jpg?v=1678075353&width=360",
    alt: "Smart Watch",
    title: "Smart Watch",
  },
];
const Banner = () => {
  return (
    <div className="grid grid-cols-5 grid-rows-3 gap-4 lg:mx-16 h-[75vh]">
      {/* Vertical Menu */}
      <div className="col-span-1 row-span-3">
        <BannerCategoryMenu />
      </div>

      {/* Slider */}
      <div className="col-span-3 row-span-2">
        <BannerCarousal />
      </div>

      {/* Offer and Category Section */}
      <div className="col-span-1 row-span-3 flex flex-col space-y-4">
        <div
          className="p-8 flex flex-col justify-between h-full"
          style={Style1}
        >
          <h3 className="font-semibold text-xl">
            Over-Ear <br />
            Headphones
          </h3>
          <p className="text-sm">20 Days Return Products</p>
        </div>
        <div
          className="p-8 flex flex-col justify-between h-full"
          style={Style2}
        >
          <h3 className="font-semibold text-xl">
            AirPods <br />
            Save 20% Off
          </h3>
          <p className="text-sm">20 Days Return Products</p>
        </div>
        <div
          className="p-8 flex flex-col justify-between h-full"
          style={Style3}
        >
          <h3 className="font-semibold text-xl">
            Gamepad <br />
            Optional Skins
          </h3>
          <p className="text-sm">20 Days Return Products</p>
        </div>
      </div>

      {/* Featured Section */}
      <div className="col-span-3 row-span-1 flex justify-center items-center gap-4">
        {items.map((item, index) => (
          <div key={index} className="text-center bg-white p-2">
            <img src={item.src} alt={item.alt} className="w-32 h-auto mb-2" />
            <h3 className="font-semibold text-sm">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
