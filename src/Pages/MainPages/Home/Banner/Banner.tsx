import { Col, Row } from "antd";
import BannerCarousal from "./BannerCarousal";
import { useNavigate } from "react-router-dom";

const items = [
  {
    src: "https://demo-uminex.myshopify.com/cdn/shop/files/col_3_1.png?v=1681548716&width=2000",
    alt: "Tablets/Ipad",
    title: "Tablets",
  },
  {
    src: "https://demo-uminex.myshopify.com/cdn/shop/files/col_3_2.png?v=1681548716&width=2000",
    alt: "Smartphones",
    title: "Smartphones",
  },
  {
    src: "https://demo-uminex.myshopify.com/cdn/shop/files/col_3_3.png?v=1681548716&width=2000",
    alt: "Cameras",
    title: "Cameras",
  },
  {
    src: "https://demo-uminex.myshopify.com/cdn/shop/files/col_3_4.png?v=1681548715&width=2000",
    alt: "Consoles",
    title: "Consoles",
  },
  {
    src: "https://demo-uminex.myshopify.com/cdn/shop/files/col_3_5.png?v=1681548716&width=2000",
    alt: "Coolers",
    title: "Coolers",
  },
  {
    src: "https://demo-uminex.myshopify.com/cdn/shop/products/products_33_2.jpg?v=1678075353&width=360",
    alt: "Smartwatches",
    title: "Smartwatches",
  },
];

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full py-4">
      <Row gutter={[16, 16]} align="stretch">
        {/* Main Banner */}
        <Col xs={24} sm={24} lg={20}>
          <div className="flex flex-col gap-4 h-full">
            {/* Carousel */}
            <div className="overflow-hidden sm:rounded-lg shadow h-full">
              <BannerCarousal />
            </div>

            {/* Categories Grid */}
            <Row gutter={[16, 16]} className="">
              {items.map((item, index) => (
                <Col
                  key={index}
                  xs={8}
                  sm={8}
                  lg={4}
                  onClick={() => navigate(`/products?category=${item.title}`)}
                  className="cursor-pointer"
                >
                  <div className="bg-white p-4 rounded-lg shadow hover:shadow-md flex flex-col items-center h-full">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-20 object-contain mb-2"
                    />
                    <h3 className="font-semibold text-sm text-center">
                      {item.title}
                    </h3>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Col>

        {/* Right Sidebar */}
        <Col xs={24} sm={6} lg={4} className="hidden lg:block">
          <div className="flex flex-col gap-4 h-full h">
            {[
              {
                title: "Over-Ear Headphones",
                desc: "20 Days Return Products",
                img: "https://demo-uminex.myshopify.com/cdn/shop/files/3_1.jpg?v=1681466981&width=2000",
              },
              {
                title: "AirPods Save 20% Off",
                desc: "20 Days Return Products",
                img: "https://demo-uminex.myshopify.com/cdn/shop/files/3_2.jpg?v=1681466999&width=2000",
              },
              {
                title: "Gamepad Optional Skins",
                desc: "20 Days Return Products",
                img: "https://demo-uminex.myshopify.com/cdn/shop/files/3_3.jpg?v=1681467017&width=2000",
              },
            ].map((promo, index) => (
              <div
                key={index}
                style={{
                  backgroundImage: `url(${promo.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundColor: "rgba(0,0,0,0.5)",
                }}
                className="p-6 flex flex-col justify-between rounded-lg shadow h-full"
              >
                {/* <img
                src={promo.img}
                alt={promo.title}
                className="w-full h-20 object-contain mb-4"
              /> */}
                <h3 className="font-semibold text-xl ">
                  {promo.title}
                </h3>
                <p className="text-sm text-center text-gray-600">
                  {promo.desc}
                </p>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>

  );
};

export default Banner;
