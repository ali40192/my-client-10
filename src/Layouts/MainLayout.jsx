import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-synthwave">
      <Navbar></Navbar>
      {/* Add padding-top to account for fixed navbar with responsive design */}
      <div className="content-with-navbar flex-1">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
