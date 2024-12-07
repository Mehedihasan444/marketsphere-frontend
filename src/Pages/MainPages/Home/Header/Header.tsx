import Navbar from "./Navbar";
import TopHeader from "./TopHeader";

const Header = () => {
    return (
        <div className="pb-2 space-y-2  bg-neutral-100 ">
            <TopHeader/>
            <Navbar/>
        </div>
    );
};

export default Header;