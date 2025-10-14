import Navbar from "./Navbar";
import TopHeader from "./TopHeader";

const Header = () => {
    return (
        <div className="pb-2">
            <TopHeader/>
            <Navbar/>
        </div>
    );
};

export default Header;