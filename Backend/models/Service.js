import mongoose, { Schema } from "mongoose";

const serviceSchema = new Schema(
  {
    business: {
      type: Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "progress", "completed", "rejected"],
      default: "pending",
    },
    isDeleted: {
      type: Boolean,
      default: false, // Soft delete flag
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Auto-expiry in 30 days
      index: { expires: "30d" }, // Auto-delete after 30 days
    },
  },
  { timestamps: true }
);

// Middleware: Exclude soft-deleted services from queries
serviceSchema.pre(/^find/, function (next) {
  this.where({ isDeleted: false });
  next();
});

const Service = mongoose.model("Service", serviceSchema);
export default Service;
