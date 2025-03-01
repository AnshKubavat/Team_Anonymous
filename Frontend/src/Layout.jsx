import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home/Home";
import Footer from "./components/Footer";


const Layout = () => {
   const hideNavbarFooter =
    location.pathname === "/login" ||
    location.pathname === "/signup";
  return (
    <>
      {!hideNavbarFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      {!hideNavbarFooter && <Footer />}
    </>
  );
}

export default Layout
