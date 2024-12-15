import { Col, Row } from "antd";
import BannerCarousal from "./BannerCarousal";
import BannerCategoryMenu from "./BannerCategoryMenu";
import { useNavigate } from "react-router-dom";



const items = [
  {
    src: "https://demo-uminex.myshopify.com/cdn/shop/files/col_3_1.png?v=1681548716&width=2000",
    alt: "Tablets/Ipad",
    title: "Tablet",
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
  const navigate = useNavigate();
  return (

    <div className="max-w-8xl lg:mx-16 mx-auto ">
      <Row gutter={16} >
        {/* Left Side Category Bar (Full Height, 1 Column) */}
        <Col span={4} >
          <div style={{ background: '#f0f2f5', height: '100%', }}>
            <BannerCategoryMenu />
          </div>
        </Col>

        {/* Middle Content (Carousel + Small Categories) */}
        <Col span={16}>
          <div className="flex flex-col gap-4 ">
            {/* Carousel (takes 4/5 of the width) */}
            <Row gutter={10}>
              <Col span={48}>
                <BannerCarousal />
              </Col>
            </Row>

            {/* Small Categories (takes 1/5 of the width) */}
            <Row gutter={6}>
              <Col span={24}>
                <div className="flex gap-4">
                  <div className="col-span-5 row-span-1 flex justify-center items-center gap-4 w-full">
                    {items?.map((item, index) => (
                      <div key={index} className="bg-white h-full p-4 cursor-pointer" style={{ width: '100%' }} onClick={() => navigate(`/products?category=${item.title}`)}>
                        <img src={item.src} alt={item.alt} className="w-32 h-auto mb-2" />
                        <h3 className="font-semibold text-sm text-center">{item.title}</h3>
                      </div>
                    ))}
                  </div>
                </div></Col>
            </Row>
          </div>
        </Col>

        {/* Right Side Promotional Card (1 Column) */}
        <Col span={4}>
          <div className="flex flex-col gap-4 h-full flex-grow">

            <Row gutter={5} className="h-full">
              <Col span={24}>

                <div
                  className="p-8 flex flex-col justify-between h-full"
                  style={{
                    background: '#fff', borderRadius: '8px', backgroundImage:
                      "url(https://demo-uminex.myshopify.com/cdn/shop/files/3_1.jpg?v=1681466981&width=2000)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "rgba(0,0,0,0.5)",
                  }}
                >
                  <h3 className="font-semibold text-xl">Over-Ear <br /> Headphones</h3>
                  <p className="text-sm">20 Days Return Products</p>
                </div>
              </Col>      </Row>
            <Row gutter={5} className="h-full" >
              <Col span={24}>
                <div
                  className="p-8 flex flex-col justify-between h-full"
                  style={{
                    background: '#fff', borderRadius: '8px', backgroundImage:
                      "url(https://demo-uminex.myshopify.com/cdn/shop/files/3_2.jpg?v=1681466999&width=2000)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "rgba(0,0,0,0.5)",
                  }}
                >
                  <h3 className="font-semibold text-xl">AirPods <br /> Save 20% Off</h3>
                  <p className="text-sm">20 Days Return Products</p>
                </div>
              </Col>      </Row>
            <Row gutter={6} className="h-full">
              <Col span={24} className="h-full">

                <div
                  className="p-8 flex flex-col justify-between h-full"
                  style={{
                    background: '#fff', borderRadius: ' 8px', backgroundImage:
                      "url(https://demo-uminex.myshopify.com/cdn/shop/files/3_3.jpg?v=1681467017&width=2000)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "rgba(0,0,0,0.5)",
                  }}
                >
                  <h3 className="font-semibold text-xl">Gamepad <br /> Optional Skins</h3>
                  <p className="text-sm">20 Days Return Products</p>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>

  );
};

export default Banner;





