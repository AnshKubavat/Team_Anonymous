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

import { authUser } from "./middlewares/auth.middleware.js";


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



//server start
app.listen(PORT, () => {
  connectDB();
  connectCloudinary();
  console.log(`Server running on port ${PORT}`);
});

app.post("/recommend", async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: "User ID is required" });
    }
    console.log(`User ${user_id}`)

    // 🔹 Call Flask API (Flask runs on port 3001)
    const response = await axios.post(`${process.env.FLASK_URL}/recommend`, { user_id }, { headers: { "Content-Type": "application/json" } });
    console.log(response.data);
    return res.json(response.data); // Send Flask response to frontend
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to fetch recommendations" });
  }
});