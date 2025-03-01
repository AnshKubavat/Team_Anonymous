import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Category from "./Pages/Category/Category";
import About from "./Pages/About/About";
import Home from "./Pages/Home/Home";
import Footer from "./components/Footer";
import Contact from "./Pages/Contact/Contact";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProfile } from "./features/userSlice";
import ProfilePage from "./Pages/SellerProfile/Profile";
import AddSeller from "./Pages/AddSeller/AddSeller";
import Navbar from "./components/NavBar";
import BusinessPage from "./Pages/Business/BusinessPage";
// import PrivateRoute from "./components/PrivateRoute";

const Layout = () => {
  const location = useLocation();
  const hideNavbarFooter =
    location.pathname === "/login" || location.pathname === "/signup";
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);
  return (
    <>
      {!hideNavbarFooter && <Navbar isAuthenticated={isAuthenticated} />}

      <Routes>
      {/* <Route element={<PrivateRoute adminOnly={true} />}>
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Route> */}
        <Route path="/category" element={<Category />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/becomeaseller" element={<AddSeller />}/>
        <Route path="/contact" element={<Contact />} />
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
      </Routes>
      {!hideNavbarFooter && <Footer />}
    </>
  );
};

export default Layout;
