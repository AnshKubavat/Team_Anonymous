<<<<<<< HEAD
import React from 'react'

const Layout = () => {
  return (
    <div>Layout</div>
  )
}

export default Layout
=======
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Navbar from "./components/Navbar";
import Category from "./Pages/Category/Category";
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
        
        <Route path="/category" element={<Category />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      {!hideNavbarFooter && <Footer />}
    </>
  );
}

export default Layout
>>>>>>> b63356f186e5fab08a4091977206cad380cea179
