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
app.use("/admin/api", useAdminRouter);


//server start
app.listen(PORT, () => {
  connectDB();
  connectCloudinary();
  console.log(`Server running on port ${PORT}`);
});
