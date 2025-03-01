import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Contact from "./Pages/Contact/Contact";
import AdminDashboard from "./Pages/AdminDashboard";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Navbar from "./components/NavBar";
import Home from "./Pages/Home/Home";
import Footer from "./components/Footer";
// import PrivateRoute from "./components/PrivateRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "./features/userSlice";
import BusinessAuth from "./Pages/SellerLogin/SellerLogin";
import AboutUs from "./Pages/About/About";
import Category from "./Pages/Category/Category";
import CategoryPage from "./components/CategoryPage";
import ProfilePage from "./Pages/SellerProfile/Profile";
import SellerDashboard from "./Pages/SellerDashboard/SellerDashBoard";
import BusinessPage from "./Pages/Business/Business";

export default function Layout() {
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
      {!hideNavbarFooter && <Navbar isAuthenticated={isAuthenticated} />}
      <Routes>
        {/* <Route element={<PrivateRoute />}> */}
        {/* <Route path="/AdminDashboard" element={<AdminDashboard />} /> */}
        {/* </Route> */}

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/myBusiness" element={<SellerDashboard/>}/>
        <Route path="/business/:id" element={<BusinessPage/>}/>

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

        {isAuthenticated ? (
          <Route path="/sellersignup" element={<BusinessAuth />} />
        ) : (
          <Route path="/sellersignup" element={<Login />} />
        )}

        <Route path="/contact" element={<Contact />} />
      </Routes>
      {!hideNavbarFooter && <Footer />}
    </>
  );
}
