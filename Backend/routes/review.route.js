import express from "express";
import {
  addReview,
  deleteReview,
  getReview,
} from "../controllers/review.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { isOwnReview } from "../middlewares/isOwnReview.middleware.js";
const router = express.Router();

router.post("/:businessId/add", authUser, addReview);
router.delete("/:businessId/:reviewId", authUser, isOwnReview, deleteReview);
router.get("/get/:id", getReview);

export default router;
