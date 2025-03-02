import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { signupLogo } from "../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../features/userSlice";
import { setItem, KEY_ACCESS_TOKEN } from "../../utils/localStorageManager";
import { toast } from "react-toastify";
import locales from "../../locales/signup.local.json";
export default function Signup() {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(
        signup({
          username,
          email,
          password,
        })
      );
      console.log(result);

      if (result?.payload?.success) {
        navigate("/");
        setItem(KEY_ACCESS_TOKEN, result.payload?.message?.token);
        setItem("city", "Vallabh Vidyanagar");
        setItem("language", "English");
        setItem("category", "All");
        toast.success("Registered Successfully");
      } else {
        const errorMessage =
          result.payload?.message || "Signup failed. Please try again.";
        setError(errorMessage);
        toast.error(errorMessage); // ✅ Pass error message directly
      }
    } catch (e) {
      console.error("Error in signup submit", e);
      const errorMessage =
        e?.response?.data?.message || "Failed to sign up. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage); // ✅ Ensure proper error message
    }
  };
  const { language } = useSelector((state) => state.user);
  const t = locales[language];

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fdf5ee] p-6">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden p-10">
        <div className="hidden md:flex flex-1 items-center justify-center relative">
          <div className="absolute w-80 h-full bg-[#fbe2cf] rounded-t-full top-0 left-0 right-0 mx-auto z-0"></div>
          {/* Illustration */}
          <img src={signupLogo} alt="Illustration" className="relative w-72 h-auto z-10" />
        </div>
  
        {/* Right Side (Form) */}
        <div className="flex-1 p-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.create_account}</h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-600 mb-2">{t.username}</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder={t.enter_name}
                  className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  required
                />
                <span className="absolute left-3 top-4 text-xl text-gray-400">
                  <FaUser />
                </span>
              </div>
            </div>
  
            <div>
              <label className="block text-gray-600 mb-2">{t.email}</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder={t.email_placeholder}
                  className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <span className="absolute left-3 top-4 text-xl text-gray-400">
                  <MdEmail />
                </span>
              </div>
            </div>
  
            <div>
              <label className="block text-gray-600 mb-2">{t.password}</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder={t.enter_password}
                  className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="absolute left-3 top-4 text-xl text-gray-400">
                  <FaLock />
                </span>
              </div>
            </div>
  
            <button className="w-full bg-orange-400 text-white py-3 rounded-lg font-semibold hover:bg-orange-500 transition">
              {t.create_account_button}
            </button>
          </form>
  
          <p className="text-center text-gray-500 mt-5">
            {t.already_have_account}{" "}
            <Link to="/login" className="text-orange-500 hover:underline font-semibold">
              {t.sign_in}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
  
}
