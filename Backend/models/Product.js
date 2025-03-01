import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Business",
  },
  description: {
    type: String,
  },
  isDeleted: { type: Boolean, default: false },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
