import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import axiosClient from "../utils/axiosClient";
import { toast } from "react-toastify";

const ProductForm = () => {
  const [selectedSection, setSelectedSection] = useState("profile");
  const [showImageModal, setShowImageModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const webcamRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });
  const API_KEY = import.meta.env.VITE_HUGGING_FACE_API_KEY;
  const API_URL = "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image";

  const openImageModal = () => setShowImageModal(true);
  const closeImageModal = () => setShowImageModal(false);
  const openCamera = () => {
    setIsCameraOpen(true);
    setCapturedImage(null);
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct({ ...newProduct, image: file });
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

  const handleGenerateAIImage = async () => {
    if (!newProduct.name) {
      alert("Please enter a product name first.");
      return;
    }
    setLoading(true);
    try {
      const uniquePrompt = `${newProduct.name} ${Math.random().toString(36).substring(7)}`;
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: uniquePrompt }),
      });
      const blob = await response.blob();
      const file = new File([blob], `${newProduct.name}.png`, { type: "image/png" });
      setNewProduct({ ...newProduct, image: file });
    } catch (error) {
      console.error("Image generation failed", error);
    } finally {
      setLoading(false);
    }
  };
  const fileInputRef = useRef(null);

  const handleAddProduct = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("description", newProduct.description);
      if (newProduct.image) {
        formData.append("image", newProduct.image);
      }

      const { data } = await axiosClient.post("/business/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

        if (data.success) {
            toast.success("Product added successfully");
            setNewProduct({ name: "", price: "", description: "", image: null });
        }
          
      else{toast.error("Some error"); } 
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error);
      alert("Failed to add product!");
    }
  };

  const capturePhoto = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    const blob = await fetch(imageSrc).then((res) => res.blob());
    const file = new File([blob], "captured-image.png", { type: "image/png" });
    setNewProduct({ ...newProduct, image: file });
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

  return (
    <div className="text-center md:mt-10 ">
      <h2 className="text-2xl font-bold mb-4">
        {editingProduct ? "✏ Update Product" : "➕ Add New Product"}
      </h2>

      <form
        className="grid grid-cols-1 max-w-2xl mx-auto gap-4 bg-gray-100 p-6 rounded-lg shadow-md"
        onSubmit={editingProduct ? handleUpdateProduct : null}
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
          value={editingProduct ? editingProduct.description : newProduct.description}
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

      {showImageModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-100 ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Select Image Source</h2>

            {newProduct.image && (
              <div className="mt-4">
                <img
                  src={typeof newProduct.image === "string" ? newProduct.image : URL.createObjectURL(newProduct.image)}
                  alt="Product Preview"
                  className="w-40 h-40 object-cover rounded-md mx-auto mb-10"
                />
              </div>
            )}

            {!isCameraOpen ? (
              <>
                <button onClick={handleGenerateAIImage} className="block w-full p-2 bg-gray-200 rounded">Generate Using AI</button>
                <button onClick={openCamera} className="block w-full p-2 bg-blue-500 text-white rounded mt-2">Capture Image</button>
                {loading && <p className="text-center">Generating...</p>}
              </>
            ) : (
              <div className="flex flex-col items-center">
                {!capturedImage ? (
                  <>
                    <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="w-full h-auto rounded-lg" />
                    <button onClick={capturePhoto} className="bg-blue-500 text-white p-2 mt-4 rounded">📸 Capture</button>
                  </>
                ) : (
                  <>
                    <img src={capturedImage} alt="Captured" className="w-full h-auto rounded-lg" />
                    <button onClick={closeCamera} className="bg-gray-500 text-white p-2 rounded">🔄 Back</button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductForm;
