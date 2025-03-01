import { Routes, Route, Navigate , useLocation} from "react-router-dom";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Navbar from "./components/Navbar";
import Category from "./Pages/Category/Category";
import Home from "./Pages/Home/Home";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProfile } from "./features/userSlice";


const Layout = () => {
  const location = useLocation();
   const hideNavbarFooter =
    location.pathname === "/login" ||
    location.pathname === "/signup";
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);
  return (
    <>
      {!hideNavbarFooter && <Navbar />}

      <Routes>
        
        <Route path="/category" element={<Category />} />
        <Route path="/" element={<Home />} />
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/signup" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
      {!hideNavbarFooter && <Footer />}
    </>
  );
}

export default Layout
