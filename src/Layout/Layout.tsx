import { Outlet } from "react-router-dom";
import Header from "../Pages/MainPages/Home/Header/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
