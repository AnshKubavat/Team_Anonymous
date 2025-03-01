import React from "react";

const ServicesList = ({ business }) => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🔧 Services Offered</h1>
      {business?.services.length === 0 ? (
        <p className="text-center text-gray-500">No services available.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {business?.services.map((service) => (
            <div
              key={service._id}
              className="bg-white p-4 shadow-lg rounded-lg border border-gray-200"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={service.owner?.image || "https://via.placeholder.com/50"}
                  alt={service.owner?.username || "User"}
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <div>
                  <h2 className="text-lg font-semibold">{service.owner?.username || "Unknown Owner"}</h2>
                  <p className="text-gray-600 text-sm">{service.owner?.email || "No Email"}</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-gray-700"><strong>Status:</strong> {service.status}</p>
                <p className="text-gray-600 text-sm"><strong>Created At:</strong> {new Date(service.createdAt).toDateString()}</p>
                <p className="text-gray-600 text-sm"><strong>Expires At:</strong> {new Date(service.expiresAt).toDateString()}</p>
              </div>

              <div className="mt-4 flex justify-between">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
                  View Details
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesList;
