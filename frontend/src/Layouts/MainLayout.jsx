import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import "./CSS/Layout.css";
function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="outlet">
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default MainLayout;
