import React, { useState } from "react";

const BusinessProfile = ({ business, user, handleBusinessEdit, handleSaveBusinessChanges }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBusiness, setEditedBusiness] = useState({ ...business });

  const handleBusinessChange = (e) => {
    setEditedBusiness({ ...editedBusiness, [e.target.name]: e.target.value });
  };

  return (
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
              onClick={() => setIsEditing(true)}
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
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-100">
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
                onClick={() => {
                  handleSaveBusinessChanges(editedBusiness);
                  setIsEditing(false);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessProfile;
