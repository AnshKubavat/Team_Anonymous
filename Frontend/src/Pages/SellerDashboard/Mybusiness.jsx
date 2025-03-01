import { useState, useRef, useEffect } from "react";
import {useSelector } from "react-redux";
import { toast } from "react-toastify";
import Webcam from "react-webcam";
import axiosClient from "../../utils/axiosClient";

const SellerDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("profile");
  const [showImageModal, setShowImageModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const webcamRef = useRef(null);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Laptop",
      price: 1200,
      description: "High-performance laptop",
      image: "/images/laptop.jpg",
      reviews: [{ user: "John", rating: 4.5, comment: "Great product!" }],
    },
    {
      id: 2,
      name: "Phone",
      price: 800,
      description: "Latest smartphone",
      image: "/images/phone.jpg",
      reviews: [{ user: "Sarah", rating: 4, comment: "Good quality!" }],
    },
    {
      id: 2,
      name: "Phone",
      price: 800,
      description: "Latest smartphone",
      image: "/images/phone.jpg",
      reviews: [{ user: "Sarah", rating: 4, comment: "Good quality!" }],
    },
    {
      id: 2,
      name: "Phone",
      price: 800,
      description: "Latest smartphone",
      image: "/images/phone.jpg",
      reviews: [{ user: "Sarah", rating: 4, comment: "Good quality!" }],
    },
    {
      id: 2,
      name: "Phone",
      price: 800,
      description: "Latest smartphone",
      image: "/images/phone.jpg",
      reviews: [{ user: "Sarah", rating: 4, comment: "Good quality!" }],
    },
    {
      id: 2,
      name: "Phone",
      price: 800,
      description: "Latest smartphone",
      image: "/images/phone.jpg",
      reviews: [{ user: "Sarah", rating: 4, comment: "Good quality!" }],
    },
    {
      id: 2,
      name: "Phone",
      price: 800,
      description: "Latest smartphone",
      image: "/images/phone.jpg",
      reviews: [{ user: "Sarah", rating: 4, comment: "Good quality!" }],
    },{
      id: 2,
      name: "Phone",
      price: 800,
      description: "Latest smartphone",
      image: "/images/phone.jpg",
      reviews: [{ user: "Sarah", rating: 4, comment: "Good quality!" }],
    },{
      id: 2,
      name: "Phone",
      price: 800,
      description: "Latest smartphone",
      image: "/images/phone.jpg",
      reviews: [{ user: "Sarah", rating: 4, comment: "Good quality!" }],
    },{
      id: 2,
      name: "Phone",
      price: 800,
      description: "Latest smartphone",
      image: "/images/phone.jpg",
      reviews: [{ user: "Sarah", rating: 4, comment: "Good quality!" }],
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  const [editingProduct, setEditingProduct] = useState(null);
  const API_KEY = import.meta.env.VITE_HUGGING_FACE_API_KEY;
  const API_URL =
    "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image";

  const openImageModal = () => setShowImageModal(true);
  const closeImageModal = () => setShowImageModal(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct({ ...newProduct, image: URL.createObjectURL(file) });
    }
  };

 const handleInputChange = (e) => {
  const { name, value } = e.target;

  if (editingProduct) {
      setEditingProduct({ ...editingProduct, [name]: value });
  } else {
    setNewProduct({ ...newProduct, [name]: value });
  }
};


  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    setProducts([...products, { ...newProduct, id: Date.now(), reviews: [] }]);
    setNewProduct({ name: "", price: "", description: "", image: null });
  };

  const handleGenerateAIImage = async () => {
    if (!newProduct.name) {
      alert("Please enter a product name first.");
      return;
    }
    setLoading(true);
    try {
      const uniquePrompt = `${newProduct.name} ${Math.random()
        .toString(36)
        .substring(7)}`;
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: uniquePrompt }), 
      });
      const blob = await response.blob();
      setNewProduct({ ...newProduct, image: URL.createObjectURL(blob) });
    } catch (error) {
      console.error("Image generation failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    setProducts(
      products.map((product) =>
        product.id === editingProduct.id ? editingProduct : product
      )
    );
    setEditingProduct(null);
    setSelectedSection("viewProducts");
  };

  const openCamera = () => {
    setIsCameraOpen(true);
    setCapturedImage(null);
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setNewProduct({ ...newProduct, image: imageSrc });
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  const fileInputRef = useRef(null);
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  const menuItems = [
    { name: "🏪My Shop", key: "profile"},
    { name: "➕ Add New Product", key: "addProduct" },
    { name: "📦 View All Products", key: "viewProducts" },
    { name: "⭐ Reviews & Ratings", key: "reviews" },
  ];

  
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };


  const { user } = useSelector((state) => state.user);
  const [business, setBusiness] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBusiness, setEditedBusiness] = useState({
    businessName: "",
    categoryOfBusiness: "",
    description: "",
    city: "",
  });

  useEffect(() => {
  if (user?._id) {
    fetchBusinessDetails();
  }
}, [user?._id]); 

const fetchBusinessDetails = async () => {
  try {
    const { data } = await axiosClient.get(`/business/seller`);
    console.log("Fetched Business Data:", data); 
    
    if (data.success && data.business) {
      setBusiness(data.business);
    } else {
      toast.error(data.message || "Business details not found.");
    }
  } catch (error) {
    console.error("Error fetching business details:", error);
    toast.error("Failed to load business details.");
  }
};






  const handleBusinessEdit = () => {
    if (business) {
      setEditedBusiness({
        businessName: business.businessName || "",
        categoryOfBusiness: business.categoryOfBusiness || "",
        description: business.description || "",
        city: business.city || "",
      });
      setIsEditing(true);
    }
  };

  const handleBusinessChange = (e) => {
    setEditedBusiness({ ...editedBusiness, [e.target.name]: e.target.value });
  };

  const handleSaveBusinessChanges = async () => {
    try {
      const { data } = await axiosClient.put(`/business/${business._id}`, editedBusiness);
      if (data.success) {
        toast.success("Business details updated successfully!");
        setBusiness(data.updatedBusiness);
        setIsEditing(false);
      } else {
        toast.error(data.message || "Update failed.");
      }
    } catch (error) {
      console.error("Error updating business details:", error);
      toast.error("Failed to update business details.");
    }
  };
  const style1 = "left-[165px]  text-white text-2xl md:top-[88px] md:left-[215px]";
  const style2 = " text-black text-2xl p-[6px]";
  const btnStyle = isOpen ? style1 : style2;

  return (
    <div className="flex">
      <div className="w-0 lg:w-64 z-50">
        <div>
          {/* Hamburger Button for Mobile */}
          <button
            onClick={toggleSidebar}
            className={`lg:hidden absolute  md:left-5  top-20 z-50  rounded-full ${btnStyle}`}
          >
            ☰
          </button>

          {/* Sidebar */}
          <div
            className={`min-h-screen max-h-full z-50 inset-y-0 left-0 md:p-3 md:text-xl md:w-64 w-48 bg-gray-800 text-white transform ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 transition-transform duration-200 ease-in-out`}
          >
            <div className="p-4 pt-12 md:pt-0">
              <h2 className="text-3xl font-bold">Dashboard</h2>
              <ul className="mt-7 ">
                {menuItems.map((item) => (
                  <li
                    key={item.key}
                    className="cursor-pointer hover:text-blue-400 mt-3 text-xl"
                    onClick={() => {
                      setSelectedSection(item.key);
                      setEditingProduct(null);
                      closeSidebar();
                    }}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-h-screen mx-auto mt-10  lg:mx-0 md:mt-5  lg:mt-0 p-6">
        {/* Profile */}
       {selectedSection === "profile" && (
      <div className="max-h-full flex justify-center items-center p-4">
        <div className="w-full text-center max-w-4xl bg-white rounded-lg border border-gray-200 overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-orange-100 to-orange-300 p-6 text-center relative">
                <div className="relative w-28 h-28 mx-auto rounded-full border-4 border-white overflow-hidden">
              <img src={business?.image} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-2xl font-bold text-gray-700">{business?.businessName}</h1>
            <p className="text-gray-700">{user?.email}</p>
            <div className="mt-4">
              <button
                onClick={handleBusinessEdit}
                className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition"
              >
                Edit Business Details
              </button>
            </div>
          </div>

          {/* Business Details */}
          {business === null ? (
            <p className="text-center text-gray-500 p-6">Loading business details...</p>
          ) : business ? (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Business Details</h2>
              <p className="text-gray-700"><strong>Category:</strong> {business?.categoryOfBusiness || "N/A"}</p>
              <p className="text-gray-700"><strong>Location:</strong> {business?.city || "N/A"}</p>
              <p className="text-gray-700"><strong>Description:</strong> {business?.description || "N/A"}</p>
            </div>
          ) : (
            <p className="text-center text-gray-500 p-6">No business details found.</p>
          )}
        </div>

        {/* Business Update Modal */}
        {isEditing && (
          <div className="fixed inset-0 flex items-center justify-center  bg-opacity-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Edit Business Details</h2>

              <input
                type="text"
                name="businessName"
                value={editedBusiness.businessName}
                onChange={handleBusinessChange}
                placeholder="Business Name"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="text"
                name="categoryOfBusiness"
                value={editedBusiness.categoryOfBusiness}
                onChange={handleBusinessChange}
                placeholder="Category"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="text"
                name="city"
                value={editedBusiness.city}
                onChange={handleBusinessChange}
                placeholder="Location"
                className="w-full p-2 border rounded mb-2"
              />
              <textarea
                name="description"
                value={editedBusiness.description}
                onChange={handleBusinessChange}
                placeholder="Description"
                className="w-full p-2 border rounded mb-2"
              />

              <div className="flex justify-end">
                <button
                  onClick={() => setIsEditing(false)}
                  className="mr-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveBusinessChanges}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
)}


        {/* Add or Update Product Form */}
        {selectedSection === "addProduct" && (
          <div className="text-center md:mt-10 ">
            <h2 className="text-2xl font-bold mb-4">
              {editingProduct ? "✏ Update Product" : "➕ Add New Product"}
            </h2>
            <form
              className="grid grid-cols-1 max-w-2xl mx-auto gap-4 bg-gray-100 p-6 rounded-lg shadow-md"
              onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
            >
              <input
                type="text"
                name="name"
                value={editingProduct ? editingProduct.name : newProduct.name}
                onChange={handleInputChange}
                placeholder="Product Name"
                className="p-2 border rounded"
                required
              />
              <input
                type="number"
                name="price"
                value={editingProduct ? editingProduct.price : newProduct.price}
                onChange={handleInputChange}
                placeholder="Price"
                className="p-2 border rounded"
                required
              />

              <button
                type="button"
                onClick={openImageModal}
                className="p-2 border rounded bg-gray-300"
              >
                Upload Image
              </button>
              <input
                type="text"
                name="description"
                value={
                  editingProduct
                    ? editingProduct.description
                    : newProduct.description
                }
                onChange={handleInputChange}
                placeholder="Description (Optional)"
                className="p-2 border rounded"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                {editingProduct ? "Update Product" : "Add Product"}
              </button>
            </form>
          </div>
        )}
        {/* Image Modal */}
        {showImageModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-100 ">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">
                Select Image Source
              </h2>

              {/* Show the product image */}
              {newProduct.image && (
                <div className="mt-4">
                  <img
                    src={newProduct.image}
                    alt="Product Preview"
                    className="w-40 h-40 object-cover rounded-md mx-auto mb-10"
                  />
                </div>
              )}

              {/* Conditional Rendering for Camera */}
              {!isCameraOpen ? (
                <>
                  <button
                    onClick={handleUploadClick}
                    className="block w-full p-2 bg-gray-300 rounded mb-2"
                  >
                    📂 Upload Image
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="hidden"
                  />

                  <button
                    onClick={handleGenerateAIImage}
                    className="block w-full p-2 bg-gray-200 rounded"
                  >
                    🤖 Generate Using AI
                  </button>

                  <button
                    onClick={openCamera}
                    className="block w-full p-2 bg-blue-500 text-white rounded mt-2"
                  >
                    📸 Capture Image
                  </button>

                  {loading && <p className="text-center">Generating...</p>}
                </>
              ) : (
                <div className="flex flex-col items-center">
                  {!capturedImage ? (
                    <>
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        className="w-full h-auto rounded-lg"
                      />
                      <button
                        onClick={capturePhoto}
                        className="bg-blue-500 text-white p-2 mt-4 rounded"
                      >
                        📸 Capture
                      </button>
                    </>
                  ) : (
                    <>
                      <img
                        src={capturedImage}
                        alt="Captured"
                        className="w-full h-auto rounded-lg"
                      />
                      <div className="flex space-x-4 mt-4">
                        <button
                          onClick={closeCamera}
                          className="bg-gray-500 text-white p-2 rounded"
                        >
                          🔄 Back
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Footer Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={closeImageModal}
                  className="text-red-500 cursor-pointer"
                >
                  ✖ Close
                </button>
                <button
                  onClick={closeImageModal}
                  className=" text-green-400 cursor-pointer"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Products Section */}
        {selectedSection === "viewProducts" && (
          <div className="max-h-full px-5 overflow-y-auto  ">
            <h2 className="text-2xl text-center  font-bold mb-4">📦 All Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.length > 0 ? (
                products.map((product) => (
                  <div
                    key={product.id}
                    className="border rounded-2xl shadow-lg p-4 bg-white"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-36 object-cover rounded-md mb-4"
                    />
                    <h2 className="text-xl font-semibold">{product.name}</h2>
                    <p className="text-gray-600">{product.description}</p>
                    <p className="text-lg font-bold text-green-600 mt-2">
                      ${product.price}
                    </p>
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => {
                          setEditingProduct(product);
                          setSelectedSection("addProduct");
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      >
                        Update
                      </button>
                      <button
                        onClick={() =>
                          setProducts(
                            products.filter((p) => p.id !== product.id)
                          )
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-full">
                  No products available.
                </p>
              )}
            </div>
          </div>
        )}
        
        {/* Reviews Section */}
        {selectedSection === "reviews" && (
          <div className="mx-auto px-5 max-h-full overflow-y-auto max-w-4xl">
            <h2 className="text-2xl text-center font-bold mb-4">
              ⭐ Reviews & Ratings
            </h2>
            {products.some((product) => product.reviews.length > 0) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map(
                  (product) =>
                    product.reviews.length > 0 && (
                      <div
                        key={product.id}
                        className="border rounded-lg p-4 bg-white shadow-md"
                      >
                        <h3 className="text-xl font-semibold">
                          {product.name}
                        </h3>
                        {product.reviews.map((review, index) => (
                          <div key={index} className="mt-2">
                            <p>
                              <strong>{review.user}</strong>: {review.comment}
                            </p>
                            <p className="text-yellow-500">
                              ⭐ {review.rating}/5
                            </p>
                          </div>
                        ))}
                      </div>
                    )
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-center">No reviews available.</p>
            )}
          </div>
        )}
      </div>
      </div>

  );
};

export default SellerDashboard;