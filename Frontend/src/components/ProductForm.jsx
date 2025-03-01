import React, { useState, useRef } from "react";
import Webcam from "react-webcam";

const ProductForm = ({
  editingProduct,
  newProduct,
  handleInputChange,
  handleAddProduct,
  handleUpdateProduct,
  openImageModal,
  showImageModal,
  handleUploadClick,
  handleFileChange,
  handleGenerateAIImage,
  openCamera,
  isCameraOpen,
  webcamRef,
  capturePhoto,
  capturedImage,
  closeCamera,
  closeImageModal,
  loading,
}) => {
  return (
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
            editingProduct ? editingProduct.description : newProduct.description
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

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-100 ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Select Image Source</h2>

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
    </div>
  );
};

export default ProductForm;