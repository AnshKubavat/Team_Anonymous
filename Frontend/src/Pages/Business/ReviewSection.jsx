import { useState } from 'react';
import { motion } from 'framer-motion';

const ReviewSection = ({ reviews, onAddReview }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 0, comment: '' });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim() || newReview.rating === 0) return;
    onAddReview({ id: Date.now(), ...newReview });
    setNewReview({ name: '', rating: 0, comment: '' });
    setShowReviewForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Reviews</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setShowReviewForm(!showReviewForm)}
        >
          {showReviewForm ? 'Cancel' : 'Add Review'}
        </motion.button>
      </div>

      {showReviewForm && (
        <form onSubmit={handleSubmitReview} className="mb-4">
          <div className="mb-2">
            <label className="block text-gray-700">Rating</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  className={`text-5xl cursor-pointer ${num <= newReview.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  onClick={() => setNewReview({ ...newReview, rating: num })}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Comment</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit Review
          </motion.button>
        </form>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <div className=''>
                <h3 className="font-bold">{"Name Of Reviwer"}</h3>
                </div>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-2xl ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-700">{review.comment}</p>
                <span>{"Date of Review"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;