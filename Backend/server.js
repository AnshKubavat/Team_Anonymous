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



app.post("/recommend", async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      
      return res.status(400).json({ error: "User ID is required" });
    }
    // Forward request to Flask server
    const response = await axios.post(
      `${process.env.FLASK_URL}/recommend`,
      { user_id },
      { headers: { "Content-Type": "application/json" } }
    );

  
    return res.json(response.data);
  } catch (error) {
  
    return res.status(500).json({ error: "Failed to fetch recommendations" });
  }
});
//server start
app.listen(PORT, () => {
  connectDB();
  connectCloudinary();
  console.log(`Server running on port ${PORT}`);
});
