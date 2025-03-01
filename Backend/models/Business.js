import mongoose, { Schema } from "mongoose";

const businessSchema = new Schema({
  businessName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  city: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  categoryOfBusiness: {
    type: String,
    enums: [
      "restaurants",
      "stationary shop",
      "cobbler",
      "milkman",
      "carpenter",
      "blacksmith",
      "flower Shop",
      "laundry",
      "electrician",
      "plumber",
      "salon & barber",
      "grocery store",
      "bakery",
      "tailor",
      "mechanic",
    ],
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  services: [
    {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
  address: {
    type: String,
  },
  businessLocation: {
    latitude: {
      type: Number,
      // required: true,
    },
    longitude: {
      type: Number,
      // required: true
    },
  },
  facility: {
    type: String,
    enum: ["product", "service"],
    default: "service",
    required: true,
  },
  isDeleted: { type: Boolean, default: false },
  isActive: {
    type: Boolean,
    default: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Business = mongoose.model("Business", businessSchema);
export default Business;
