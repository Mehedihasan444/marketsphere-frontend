import { FloatButton } from "antd";
import Banner from "./Banner/Banner";
import PersonalizedProducts from "./PersonalizedProducts/PersonalizedProducts";
import { BiSolidUpArrowSquare } from "react-icons/bi";
import FlashSale from "./FlashSale/FlashSale";

const Home = () => {
  return (
    <div className="max-w-8xl mx-auto bg-neutral-100 min-h-screen">
      <Banner />
      <FlashSale />
      <PersonalizedProducts />

      {/* Scroll-to-top button */}
      <FloatButton
        shape="square"
        type="primary"
        style={{ insetInlineEnd: 24 }}
        icon={<BiSolidUpArrowSquare />}
      />
    </div>
  );
};

export default Home;
