import Business from "../models/Business.js";
import Review from "../models/Review.js";
import User from "../models/User.js";

export const addReview = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    console.log(req.body);

    const { businessId } = req.params;
    const user = req.user;

    const business = await Business.findById(businessId);
    if (!business) {
      return res
        .status(404)
        .json({ message: "Business not found", success: false });
    }
    const existingReview = await Review.aggregate([
      {
        $match: {
          author: user._id,
          business: business._id,
        },
      },
      { $limit: 1 },
    ]);

    if (existingReview.length > 0) {
      return res.status(400).json({
        message: "You have already reviewed this business",
        success: false,
      });
    }

    const review = new Review({
      comment,
      rating,
      business: businessId,
      author: user._id,
    });

    await review.save();

    await User.findByIdAndUpdate(user._id, { $push: { reviews: review._id } });
    await Business.findByIdAndUpdate(business._id, {
      $push: { reviews: review._id },
    });

    return res
      .status(201)
      .json({ message: "Review added successfully", review, success: true });
  } catch (error) {
    console.error("Error adding review:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const user = req.user;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res
        .status(404)
        .json({ message: "Review not found", success: false });
    }

    if (review.author.toString() !== user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized to delete this review",
        success: false,
      });
    }

    await Business.findByIdAndUpdate(review.business, {
      $pull: { reviews: reviewId },
    });

    await User.findByIdAndUpdate(user._id, { $pull: { reviews: reviewId } });

    await Review.findByIdAndDelete(reviewId);

    return res
      .status(200)
      .json({ message: "Review deleted successfully", success: true });
  } catch (error) {
    console.error("Error deleting review:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const getReview = async (req, res) => {
  const { id } = req.params;
  const reviews = await Review.find({ businessId: id });
  res.json({ success: true, reviews });
};
