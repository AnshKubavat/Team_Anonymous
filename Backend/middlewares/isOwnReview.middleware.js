import User from "../models/User.js";

export const isOwnReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const user = await User.findById(req.user._id);

    const review = user.reviews.find(
      (review) => review._id.toString() === reviewId
    );

    if (!review) {
      return res
        .status(404)
        .json({ message: "Review not found", success: false });
    }

    return next();
  } catch (error) {
    console.error("Error in isOwnReview middleware:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
