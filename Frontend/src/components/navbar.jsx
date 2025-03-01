import { useState } from "react";
import { Menu, Search, ChevronDown, MapPin, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCity, setCategory, setLanguage } from "../features/userSlice.js";
import { getItem , setItem} from "../utils/localStorageManager.js";
import { cities, categories, logo } from "../assets/assets.js";
import {motion} from "framer-motion";

const Navbar = ({isAuthenticated}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [cityDropdown, setCityDropdown] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const dispatch = useDispatch();
  const selectedCity = getItem("city");
  const language = getItem("language");
  const [selectLanguage, setSelectLanguage] = useState(language || "English");
  const selectedCategory = getItem("category");
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const languages = ["English", "Hindi", "Gujarati"];
  const handleLanguageChange = (lang) => {
    setSelectLanguage(lang);
    setItem("language", lang);
  };

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(categorySearch.toLowerCase())
  );
  return (
    <nav className="bg-[#FEF6EF] p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-gray-600 text-xl font-bold flex items-center gap-2">
          <img
            src={logo}
            alt="NearbyGo Logo"
            onClick={() => navigate("/")}
            className="h-10 w-auto rounded-2xl ml-2"
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden xl:flex space-x-6 text-gray-600 text-md font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-black font-semibold" : "hover:text-gray-800"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category"
              className={({ isActive }) =>
                isActive ? "text-black font-semibold" : "hover:text-gray-800"
              }
            >
              Category
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-black font-semibold" : "hover:text-gray-800"
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-black font-semibold" : "hover:text-gray-800"
              }
            >
              Contact Us
            </NavLink>
          </li>
          {user !== null && user.role === "seller" && (
            <li>
              <NavLink
                to="/myBusiness"
                className={({ isActive }) =>
                  isActive ? "text-black font-semibold" : "hover:text-gray-800"
                }
              >
                My Business
              </NavLink>
            </li>
          )}
        </ul>

        {/* Language Selector */}
        <div className="relative  ">
          <button
            className="flex items-center text-gray-700 font-medium px-3 py-1 border border-gray-300 rounded-sm bg-white gap-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {language} <ChevronDown size={18} className="ml-2" />
          </button>
          {isOpen && (
            <div className="absolute bg-white shadow-md rounded-sm mt-2 w-32 p-2 z-10">
              <ul>
                {languages.map((lang, index) => (
                  <li
                    key={index}
                    className="p-2 flex  items-center gap-2 hover:bg-[#FCE2CE] cursor-pointer text-gray-700"
                    onClick={() => {
                      handleLanguageChange(lang);
                      dispatch(setLanguage(lang));
                      setIsOpen(false);
                    }}
                  >
                    {lang}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* City Dropdown */}

        <div className="relative hidden  md:flex">
          <button
            className="flex md:w-54 items-center text-gray-700 font-medium px-3 py-1 border border-gray-300 rounded-sm bg-white gap-2"
            onClick={() => setCityDropdown(!cityDropdown)}
          >
            <MapPin size={18} className="text-gray-600" />
            {selectedCity}
            <ChevronDown size={18} className="absolute right-3" />
          </button>
          {cityDropdown && (
            <div className="absolute  mt-10 bg-white shadow-md rounded-sm  w-full p-2 z-10">
              <input
                type="text"
                placeholder="Search City"
                className="w-full p-1 mb-2 border rounded text-gray-700"
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                autoFocus
              />
              <ul>
                {filteredCities.map((city, index) => (
                  <li
                    key={index}
                    className="p-2 flex  items-center gap-2 hover:bg-[#FCE2CE] cursor-pointer text-gray-700"
                    onClick={() => {
                      dispatch(setCity(city));
                      setCityDropdown(false);
                      setCitySearch("");
                    }}
                  >
                    <MapPin size={16} className="text-black" /> {city}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Category Dropdown */}

        <div className="relative hidden  md:flex">
          <button
            placeholder="Search"
            className="flex items-center min-h-8 text-gray-700 font-medium px-3 py-1 border border-gray-300 rounded-sm bg-white gap-2 md:w-64"
            onClick={() => setCategoryDropdown(!categoryDropdown)}
          >
            {/* <MapPin size={18} className="text-gray-600" /> */}
            {selectedCategory}
            <ChevronDown size={18} className="absolute right-3" />
          </button>
          {categoryDropdown && (
            <div className="absolute max-h-64 overflow-y-auto  bg-white shadow-md rounded-sm mt-10 p-2 z-10">
              <input
                type="text"
                placeholder="Search Category..."
                className="w-full md:w-60 p-1 mb-2 border rounded text-gray-700"
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                autoFocus
              />
              <ul>
                {filteredCategories.map((category, index) => (
                  <li
                    key={index}
                    className="p-2 flex items-center gap-2 hover:bg-[#FCE2CE] cursor-pointer text-gray-700"
                    onClick={() => {
                      dispatch(setCategory(category));
                      setCategoryDropdown(false);
                      setCategorySearch("");
                    }}
                  >
                    {/* <MapPin size={16} className="text-black" /> */}
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Profile or Login Button */}
        <div className="lg:flex">
          {isAuthenticated ? (
            <User
              onClick={() => navigate("/profile")}
              className="text-gray-600 cursor-pointer mr-2"
              size={32}
            />
          ) : (
            <NavLink to="/login">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-600    bg-gray-300 font-bold px-4 mr-1 py-2 rounded-md transition-all"
              >
                Login
              </motion.button>
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="xl:hidden text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={32} />
        </button>
      </div>

      {/* Mobile Search Bar */}
      {/* {showSearch && (
        <div className="lg:hidden mt-2 p-3">
          <div className="flex items-center bg-white px-4 py-2 rounded-sm border-1 border-gray-400">
            <Search className="text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search By Category"
              className="ml-3 outline-none w-full text-lg"
            />
          </div>
        </div>
      )} */}



      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden bg-[#FAF6F3] text-center text-gray-600 p-6 space-y-6 rounded-lg shadow-lg mt-2">
          <ul className="space-y-4 text-lg font-medium">
            <li>
              <NavLink
                to="/"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive ? "text-black font-semibold" : "hover:text-gray-800"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/category"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive ? "text-black font-semibold" : "hover:text-gray-800"
                }
              >
                Category
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive ? "text-black font-semibold" : "hover:text-gray-800"
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive ? "text-black font-semibold" : "hover:text-gray-800"
                }
              >
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/myBusiness"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive ? "text-black font-semibold" : "hover:text-gray-800"
                }
              >
                My Business
              </NavLink>
            </li>
          </ul>

          {/* Mobile Category Dropdown */}
          <button
            className="md:hidden flex items-center text-gray-700 font-medium p-2 border border-gray-300 rounded-lg bg-white gap-2 w-full"
            onClick={() => setCategoryDropdown(!categoryDropdown)}
          >
            {/* <MapPin size={18} /> */}
            {selectedCategory} <ChevronDown size={18} className="ml-auto" />
          </button>

          {categoryDropdown && (
            <div className="bg-white rounded-sm mt-1 w-full p-2 z-10">
              {/* Search Bar inside the dropdown */}
              <input
                type="text"
                placeholder="Search Category..."
                className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                autoFocus
              />

              <ul className="mt-2 max-h-40 overflow-y-auto">
                {filteredCategories.map((category, index) => (
                  <li
                    key={index}
                    className="p-2 flex items-center gap-2 hover:bg-gray-200 cursor-pointer text-gray-700"
                    onClick={() => {
                      dispatch(setCategory(category));
                      setCategoryDropdown(false);
                      setCategorySearch("");
                      // setIsOpen(false);
                    }}
                  >
                    {/* <MapPin size={16} className="text-black" />  */}
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Mobile City Dropdown */}
          <button
            className="md:hidden flex items-center text-gray-700 font-medium p-2 border border-gray-300 rounded-lg bg-white gap-2 w-full"
            onClick={() => setCityDropdown(!cityDropdown)}
          >
            <MapPin size={18} /> {selectedCity}{" "}
            <ChevronDown size={18} className="ml-auto" />
          </button>

          {cityDropdown && (
            <div className="bg-white rounded-sm mt-1 w-full p-2 z-10">
              {/* Search Bar inside the dropdown */}
              <input
                type="text"
                placeholder="Search City"
                className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                autoFocus
              />

              <ul className="mt-2 max-h-40 overflow-y-auto">
                {filteredCities.map((city, index) => (
                  <li
                    key={index}
                    className="p-2 flex items-center gap-2 hover:bg-gray-200 cursor-pointer text-gray-700"
                    onClick={() => {
                      dispatch(setCity(city));
                      setCityDropdown(false);
                      setCitySearch("");
                      // setIsOpen(false);
                    }}
                  >
                    <MapPin size={16} className="text-black" /> {city}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Login Button (Mobile) */}
          {/* <div className="text-center flex justify-center">
            {isAuthenticated ? (
              <User
                className="text-gray-600 md:hidden  cursor-pointer"
                size={32}
              />
            ) : (
              <NavLink to="/login">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-600 md:hidden bg-gray-300 font-bold px-4 py-2 rounded-md transition-all"
                >
                  Login
                </motion.button>
              </NavLink>
            )}
          </div> */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
