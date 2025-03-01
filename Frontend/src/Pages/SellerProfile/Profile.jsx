import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProfile, logout, updateProfile } from "../../features/userSlice";
import { toast } from "react-toastify";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";
const ProfilePage = () => {
  const { user, isLoading } = useSelector((state) => state.user);
  const [profileImage, setProfileImage] = useState(false);
  const [tempName, setTempName] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState("reviews");

  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setName(user.username);
      setEmail(user.email);
      setTempEmail(user.email);
      setTempName(user.username);
      setRole(user.role);
    }
  }, [user]);

  useEffect(() => {
  dispatch(fetchProfile());
}, [dispatch]);


  const [reviews] = useState([
    {
      id: 1,
      title: "Great Product!",
      content: "I loved using this product. Highly recommended!",
      date: "2023-10-01",
    },
    {
      id: 2,
      title: "Amazing Service",
      content: "The customer service was excellent.",
      date: "2023-09-25",
    },
    {
      id: 3,
      title: "Amazing Service",
      content: "The customer service was excellent.",
      date: "2023-09-25",
    },
    {
      id: 4,
      title: "Amazing Service",
      content: "The customer service was excellent.",
      date: "2023-09-25",
    },
  ]);

  const becomeaSeller = () => {
    navigate("/becomeaseller");
  };

  const handleUpdateProfile = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("username", tempName);
      formData.append("image", profileImage);
      const result = await dispatch(updateProfile(formData));
      if (result.payload?.success) {
        dispatch(fetchProfile());
        toast.success("Profile updated successfully !");
        setIsEditing(false);
        setProfileImage(false);
      } else {
        toast.error(result.payload?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  console.log(user.services.length);
  

  const handleLogout = async () => {
    try {
      const result = await dispatch(logout());
      if (result.payload?.success) {
        toast.success(result.payload?.message);
        removeItem("city");
        removeItem("language");
        removeItem("category");
        removeItem(KEY_ACCESS_TOKEN)
        navigate("/login");
      } else {
        toast.error("Please try again");
      }
    } catch (error) {
      toast.error(error);
    }
  };


  return (
    <div className="min-h-screen px-2 py-10 flex justify-center items-center">
      <div className="w-full max-w-3xl bg-white rounded-sm border border-gray-200 overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-[#FEF6EF] to-[#FCE2CE] p-6 text-center relative">
          <div className="relative mt-16 md:mt-0 w-28 h-28 mx-auto rounded-full border-4 border-white overflow-hidden">
            <img
              src={
                profileImage ? URL.createObjectURL(profileImage) : user?.image
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />

            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <span className="text-white text-sm">Upload</span>
              </div>
            )}
          </div>

          <h1 className="text-2xl font-bold text-gray-700 mt-4">{name}</h1>
          <p className="text-gray-700">{email}</p>

          {/* Buttons Row */}
          {role !== "seller" && (
            <div className="absolute top-5 left-5 flex gap-4">
              {/* Become a Seller Button */}
              <button
                className="bg-[#f0b485] text-gray-700 px-4 py-2 cursor-pointer rounded-md font-semibold shadow-md hover:bg-[#a67f60] hover:text-amber-50 transition"
                onClick={becomeaSeller}
              >
                Become a Seller
              </button>
            </div>
          )}

          <div className="absolute top-5 right-5">
            {/* Edit/Save Button */}
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-white text-blue-600 px-4 py-2 rounded-md cursor-pointer font-semibold shadow-md hover:bg-gray-200 transition"
              >
                Edit Profile
              </button>
            ) : (
              <button
                onClick={handleUpdateProfile}
                className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:bg-green-600 transition"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Edit Profile
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                {
                  <input
                    type="email"
                    value={tempEmail}
                    onChange={(e) => setTempEmail(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled
                  />
                }
              </div>
            </div>
          </div>

          <div className="text-center w-full">
            <button
              onClick={handleLogout}
              className="bg-red-400 text-white px-4 py-2 cursor-pointer rounded-sm shadow-md hover:bg-red-600 transition md:text-base"
            >
              Logout
            </button>
          </div>

          {/* Reviews Section */}
          <div className="flex justify-around mb-4">
            <button onClick={() => setActiveTab("reviews")} className={`px-4 cursor-pointer py-2 text-black text-lg ${activeTab === "reviews" ? "  font-semibold" : "  font-regular"}`}>My Reviews</button>
            <button onClick={() => setActiveTab("bookings")} className={`px-4 py-2 text-lg cursor-pointer text-black ${activeTab === "bookings" ? "font-semibold " : " font-regular"}`}>My Bookings</button>
          </div>
          {activeTab === "reviews" && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Your Reviews</h2>
              {reviews.length > 0 ? reviews.map((review) => (
                <div key={review.id} className="p-4 bg-white rounded-lg shadow-md mb-3">
                  <h3 className="text-lg font-semibold">{review.title}</h3>
                  <p>{review.content}</p>
                  <p className="text-sm text-gray-500">Reviewed on: {review.date}</p>
                </div>
              )) : <p>No reviews yet.</p>}
            </div>
          )}
          {activeTab === "bookings" && (
            <div>
              <h2 className="text-xl  font-semibold mb-3">Your Bookings</h2>
             {isLoading ? (
  <p>Loading your bookings...</p>
) : user?.services?.length > 0 ? (
  user.services.map((service) => (
    <div key={service._id} className="p-4 bg-white rounded-lg shadow-md mb-3">
      <h3 className="text-lg font-semibold">
        {service?.bussiness?.businessName || "Unknown Business"}
      </h3>
      <p>{service?.status || "Unknown Status"}</p>
      <p className="text-sm text-gray-500">
        Requested on: {service?.createdAt ? new Date(service.createdAt).toLocaleDateString() : "N/A"}
      </p>
    </div>
  ))
) : (
  <p>No bookings yet.</p>
)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
