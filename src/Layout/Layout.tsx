import { Outlet } from "react-router-dom";
import Header from "../Components/Shared/Header/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
