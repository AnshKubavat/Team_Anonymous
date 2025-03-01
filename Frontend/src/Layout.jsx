import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Navbar from "./components/Navbar";
import Category from "./Pages/Category/Category";


const Layout = () => {
  return (
    <>

      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/category" element={<Category />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default Layout
