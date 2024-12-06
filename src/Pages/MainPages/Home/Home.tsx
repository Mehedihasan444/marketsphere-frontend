import Banner from "./Banner/Banner";
import Header from "./Header/Header";

const Home = () => {
  return (
    <div className="max-w-8xl mx-auto bg-neutral-100 min-h-screen">
      <Header />
      <Banner />
    </div>
  );
};

export default Home;
