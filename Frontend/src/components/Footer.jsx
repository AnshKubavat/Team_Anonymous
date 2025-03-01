import { NavLink } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#FEF6EF] text-gray-700 py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold">NearByGo</h2>
          <p className="my-4 text-base">
            Connecting local businesses with customers efficiently, know about
            the deals and sellers near you.
          </p>
          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-2xl hover:text-pink-500" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="text-2xl hover:text-blue-500" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="text-2xl hover:text-red-500" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <NavLink to="/" className="hover:underline">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/category" className="hover:underline">
                Category
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:underline">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact-us" className="hover:underline">
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-xl font-bold mb-3">
            Subscribe to our Newsletter
          </h2>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 rounded-sm text-gray-700 border border-gray-300"
          />
          <button className="bg-gray-400 text-white px-4 py-2 mt-2 rounded-sm hover:bg-gray-500">
            Subscribe
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
