import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { signupLogo } from "../../assets/assets";
import { useDispatch } from "react-redux";
import { signup } from "../../features/userSlice";
import { setItem } from "../../utils/localStorageManager";

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

      if (result.payload?.success) {
        setItem(KEY_ACCESS_TOKEN, result.payload?.message?.token);
        setItem("city", "Vallabh Vidyanagar");
        setItem("language", "English");
        setItem("category", "All");
        toast.success("Registerd Successfully");
        navigate("/");
      } else {
        setError(result.payload?.message || "Signup failed. Please try again.");
        toast.error(error);
      }
    } catch (error) {
      console.log("Error in signup submit", e);
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fdf5ee] p-6">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden p-10">
        <div className="hidden md:flex flex-1 items-center justify-center relative">
          <div className="absolute w-80 h-full bg-[#fbe2cf] rounded-t-full top-0 left-0 right-0 mx-auto z-0"></div>
          {/* Illustration */}
          <img
            src={signupLogo}
            alt="Illustration"
            className="relative w-72 h-auto z-10"
          />
        </div>

        {/* Right Side (Form) */}
        <div className="flex-1 p-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Create Account
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-600 mb-2">Username</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your Name"
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
              <label className="block text-gray-600 mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="email@gmail.com"
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
              <label className="block text-gray-600 mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your password"
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
              Create Account
            </button>
          </form>

          <p className="text-center text-gray-500 mt-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-500 hover:underline font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
