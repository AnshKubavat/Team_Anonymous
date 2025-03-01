import express from "express";
const router = express.Router();
import upload from "../middlewares/multer.middleware.js";
import {
  createBusiness,
  getOwnBusiness,
  getBusiness
} from "../controllers/business.controller.js";
import { isSeller } from "../middlewares/isSeller.middleware.js";

router.post("/", upload.single("image"), createBusiness);
router.get("/seller", isSeller, getOwnBusiness);
router.get("/:businessId", getBusiness);

export default router;
