import Navbar from "./Navbar";
import TopHeader from "./TopHeader";

const Header = () => {
    return (
        <div className="mb-4 space-y-2  ">
            <TopHeader/>
            <Navbar/>
        </div>
    );
};

export default Header;