import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { loginImg } from "../../assets/assets";
import { signin } from "../../features/userSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { KEY_ACCESS_TOKEN, setItem } from "../../utils/localStorageManager";
import locales from "../../locales/login.local.json";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(signin({ email, password }));
      if (result.payload?.success) {
        setItem(KEY_ACCESS_TOKEN, result.payload?.message?.token);
        setItem("city", "Vallabh Vidyanagar");
        setItem("language", "English");
        setItem("category", "All");
        toast.success("Login Successfully");
        navigate("/");
      } else {
        toast.error(result.payload?.message);
      }
    } catch (error) {
      toast.error(error);
      console.log("Invalid email or password. Please try again.");
    }
  };




const { language } = useSelector((state) => state.user);
const t = locales[language];

return (
  <div className="flex min-h-screen items-center justify-center bg-[#FAF6F3] p-4">
    <div className="flex w-full max-w-4xl bg-white shadow-xl rounded-3xl overflow-hidden relative">
      {/* Left Side (Form) */}
      <div className="flex-1 p-12">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
          {t.welcome_back}
        </h2>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-700 mb-2">{t.email}</label>
            <div className="relative">
              <input
                type="email"
                placeholder={t.email_placeholder}
                className="w-full p-4 pl-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="absolute left-4 top-5 text-xl text-gray-500">
                <MdEmail />
              </span>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">{t.password}</label>
            <div className="relative">
              <input
                type="password"
                placeholder={t.enter_password}
                className="w-full p-4 pl-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="absolute left-4 top-4 text-gray-500 text-xl">
                <FaLock />
              </span>
            </div>
          </div>

          <div className="text-right text-gray-600 text-sm">
            <a href="#" className="hover:underline">
              {t.forgot_password}
            </a>
          </div>

          <button className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition">
            {t.login}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          {t.dont_have_account}{" "}
          <Link to="/signup" className="text-orange-600 font-bold hover:underline">
            {t.sign_up}
          </Link>
        </p>
      </div>

      <div className="hidden md:flex flex-1 items-center justify-center p-12 relative">
        <div className="absolute w-80 h-full bg-[#fbe2cf] rounded-t-full top-20 left-40 right-0 mx-auto z-0"></div>
        <img src={loginImg} alt="Laptop Boy" className="w-72 h-auto object-cover relative z-10" />
      </div>
    </div>
  </div>
);

}
