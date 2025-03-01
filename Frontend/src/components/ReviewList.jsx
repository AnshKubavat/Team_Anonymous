import React from "react";

const ReviewsList = ({ products }) => {
  return (
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
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  {product.reviews.map((review, index) => (
                    <div key={index} className="mt-2">
                      <p>
                        <strong>{review.user}</strong>: {review.comment}
                      </p>
                      <p className="text-yellow-500">⭐ {review.rating}/5</p>
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
  );
};

export default ReviewsList;
