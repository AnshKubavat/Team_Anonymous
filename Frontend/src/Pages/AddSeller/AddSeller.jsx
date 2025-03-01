import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Select from "react-select";
import {
  FaMapMarkerAlt,
  FaBuilding,
  FaListAlt,
  FaInfoCircle,
  FaImage,
} from "react-icons/fa";
import axiosClient from "../../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import { categories, cities } from "../../assets/assets";

export default function AddSeller() {
  const [businessName, setBusinessName] = useState("");
  const [city, setCity] = useState(null); // Initialize as null for react-select
  const [description, setDescription] = useState("");
  const [categoryOfBusiness, setCategoryOfBusiness] = useState(null); // Initialize as null for react-select
  const [facility, setFacility] = useState(null); // Initialize as null for react-select
  const [image, setImage] = useState(null); // Initialize as null for file upload
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const navigate = useNavigate();

  const facilities = [
    { value: "service", label: "Service" },
    { value: "product", label: "Product" },
  ];

  const fetchLocation = () => {
    setIsFetchingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          toast.success("Location fetched successfully!");
          setIsFetchingLocation(false);
        },
        (error) => {
          toast.error("Unable to fetch location.");
          console.error(error);
          setIsFetchingLocation(false);
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
      setIsFetchingLocation(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();

      // Append all fields to FormData
      formdata.append("businessName", businessName);
      if (city) formdata.append("city", city.value); // Append city value
      formdata.append("description", description);
      if (categoryOfBusiness)
        formdata.append("categoryOfBusiness", categoryOfBusiness.value); // Append category value
      if (facility) formdata.append("facility", facility.value); // Append facility value
      if (location.latitude && location.longitude) {
        formdata.append("latitude", location.latitude);
        formdata.append("longitude", location.longitude);
      }
      if (image) {
        formdata.append("image", image); // Append image file
      }

      console.log(formdata);

      // Debugging: Log FormData entries
      for (let [key, value] of formdata.entries()) {
        console.log(key, value);
      }

      const { data } = await axiosClient.post("/business", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (data.success) {
        toast.success("Seller created successfully!");
        navigate("/sellerdashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center py-10 items-center min-h-screen bg-gradient-to-r from-[#FEF6EF] to-[#FCE2CE]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl mx-4"
      >
        <div className="p-8 rounded-sm bg-[#FEF6EF]">
          <div>
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
              Create Business
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block pl-1 text-sm font-medium text-gray-700 mb-2">
                    <FaBuilding className="inline-block mr-2" />
                    Business Name
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    placeholder="Enter Your Business"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block pl-1 text-sm font-medium text-gray-700 mb-2">
                    <FaMapMarkerAlt className="inline-block mr-2" />
                    City
                  </label>
                  <Select
                    options={cities}
                    onChange={(selectedOption) => setCity(selectedOption)}
                    placeholder="Select City"
                    value={city}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>
                <div>
                  <label className="block pl-1 text-sm font-medium text-gray-700 mb-2">
                    <FaListAlt className="inline-block mr-2" />
                    Facility
                  </label>
                  <Select
                    options={facilities}
                    onChange={(selectedOption) => setFacility(selectedOption)}
                    placeholder="Select Facility"
                    value={facility}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>
                <div>
                  <label className="block pl-1 text-sm font-medium text-gray-700 mb-2">
                    <FaListAlt className="inline-block mr-2" />
                    Category
                  </label>
                  <Select
                    options={categories}
                    onChange={(selectedOption) =>
                      setCategoryOfBusiness(selectedOption)
                    }
                    placeholder="Select Category"
                    value={categoryOfBusiness}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    isClearable // Allows clearing selection
                    isSearchable // Enables search inside select
                  />
                </div>
              </div>
              <div>
                <label className="block pl-1 text-sm font-medium text-gray-700 mb-2">
                  <FaInfoCircle className="inline-block mr-2" />
                  Description of the Business
                </label>
                <textarea
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  placeholder="Enter a description of the business"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                />
              </div>
              <div>
                <label className="block pl-1 text-sm font-medium text-gray-700 mb-2">
                  <FaImage className="inline-block mr-2" />
                  Upload Image
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="image/*"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block pl-1 text-sm font-medium text-gray-700 mb-2">
                  <FaMapMarkerAlt className="inline-block mr-2" />
                  Location
                </label>
                <button
                  type="button"
                  onClick={fetchLocation}
                  disabled={isFetchingLocation}
                  className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 mb-4 flex items-center justify-center"
                >
                  {isFetchingLocation ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    "Fetch Location"
                  )}
                </button>
                {location.latitude && location.longitude && (
                  <div className="mt-2 text-sm text-gray-600">
                    Latitude: {location.latitude}, Longitude:{" "}
                    {location.longitude}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
