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
import Navbar from "./components/Navbar";
import BusinessPage from "./Pages/Business/BusinessPage";
import Mybusiness from "./Pages/SellerDashboard/MyBusiness";
// import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./Pages/AdminDashboard";
import CategoryPage from "./components/CategoryPage";

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
        <Route path="/category/:categoryName" element={<CategoryPage />} />

        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/becomeaseller" element={<AddSeller />}/> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/business/:id" element={<BusinessPage/>}/>
        <Route path="/myBusiness" element={<Mybusiness />} />
         <Route path="/admin/*" element={<AdminDashboard />} />
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
          <Route path="/becomeaseller" element={<AddSeller />} />
        ) : (
          <Route path="/becomeaseller" element={<Login />} />
        )}

        <Route path="/contact" element={<Contact />} />
      </Routes>
      {!hideNavbarFooter && <Footer />}
    </>
  );
};

export default Layout;
