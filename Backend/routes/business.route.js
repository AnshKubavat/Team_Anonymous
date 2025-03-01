import express from "express";
const router = express.Router();
import upload from "../middlewares/multer.middleware.js";
import { createBusiness } from "../controllers/business.controller.js";

router.post("/", upload.single("image"), createBusiness);

export default router;
