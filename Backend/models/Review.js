import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
  description: {
    type: String,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  business: {
    type: Schema.Types.ObjectId,
    ref: "Business",
  },
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
