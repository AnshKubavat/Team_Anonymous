import "dotenv/config";
import express from "express";
const app = express();
import axios from "axios";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./DB/connectDB.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/user.route.js";
import useCityRouter from "./routes/useCity.route.js";
import businessRouter from "./routes/business.route.js";
import useAdminRouter from "./routes/admin.route.js";
import serviceRouter from "./routes/service.route.js";
import useLocationRouter from "./routes/location.route.js";
import translateRouter from "./routes/translate.route.js";
import recommendRouter from "./routes/recommend.route.js";
import useReviewRouter from "./routes/review.route.js";

import { authUser } from "./middlewares/auth.middleware.js";
import Review from "./models/Review.js";

const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//All routes
app.use("/user", userRouter);
app.use("/api", useCityRouter);
app.use("/business", authUser, businessRouter);
app.use("/admin/api", useAdminRouter);

app.use("/service", authUser, serviceRouter);
app.use("/location", useLocationRouter);
// 🔹 Google Translate API Route
app.use("/translate", translateRouter);
app.use("/review", useReviewRouter);
app.get("/review/get/:id", async (req, res) => {
  const { id } = req.params;
  const reviews = await Review.find({ businessId: id });
  res.json({ success: true, reviews });
});

// 🔹 Flask Recommendation API Route
app.use("/recommend", recommendRouter);

//server start
app.listen(PORT, () => {
  connectDB();
  connectCloudinary();
  console.log(`Server running on port ${PORT}`);
});
