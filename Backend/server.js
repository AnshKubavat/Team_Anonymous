import "dotenv/config";
import express from "express";
const app = express();
import axios from "axios";
import cookieParser from "cookie-parser";
import connectDB from "./DB/connectDB.js";
import connectCloudinary from "./config/cloudinary.js";


const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser())

// app.use("/user", userRouter);



app.listen(PORT, () => {
    connectDB();
    connectCloudinary();
    console.log(`Server running on port ${PORT}`);
  });