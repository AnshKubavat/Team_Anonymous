import { NavLink } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import locales from "../locales/local.json";
import { useSelector } from "react-redux";

const Footer = () => {
  const { language } = useSelector((state) => state.user);
  const t = locales[language];

  return (
    <footer className="bg-[#3B2E2E] text-[#FFFFFF] py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold">{t.companyName}</h2>
          <p className="my-4 text-base">{t.companyDescription}</p>
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
          <h2 className="text-xl font-bold mb-3">{t.quickLinks}</h2>
          <ul className="space-y-2">
            <li>
              <NavLink to="/" className="hover:underline">
                {t.home}
              </NavLink>
            </li>
            <li>
              <NavLink to="/category" className="hover:underline">
                {t.category}
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:underline">
                {t.about}
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact-us" className="hover:underline">
                {t.contactUs}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-xl font-bold mb-3">{t.subscribe}</h2>
          <input
            type="email"
            placeholder={t.enterEmail}
            className="w-full p-2 rounded-sm text-white border-gray-100 border"
          />
          <button className="bg-gray-400 text-white px-4 py-2 mt-5 rounded-sm hover:bg-gray-500">
            {t.subscribeButton}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
