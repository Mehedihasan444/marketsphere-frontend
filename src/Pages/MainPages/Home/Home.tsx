import { FloatButton } from "antd";
import Banner from "./Banner/Banner";
import PersonalizedProducts from "./PersonalizedProducts/PersonalizedProducts";
import { BiSolidUpArrowSquare } from "react-icons/bi";
import FlashSale from "./FlashSale/FlashSale";
import UnAuthorizedUserProducts from "./UnAuthorizedUserProducts/UnAuthorizedUserProducts";
import { useAppSelector } from "../../../Redux/hook";

const Home = () => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <div className="max-w-8xl mx-auto bg-neutral-100 min-h-screen">
      <Banner />
      <FlashSale />
      {
        user ?
          <PersonalizedProducts /> :
          <UnAuthorizedUserProducts />
      }

      {/* Scroll-to-top button */}
      <FloatButton
        shape="square"
        type="primary"
        style={{ insetInlineEnd: 24 }}
        icon={<BiSolidUpArrowSquare />}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
    </div>
  );
};

export default Home;
