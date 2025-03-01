import { Router } from "express";
import {
  signup,
  login,
  profile,
  logout,
  updateProfile,
  addHistory,
} from "../controllers/user.controller.js";
const route = Router();
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest.js";
import { authUser } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

route.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
  ],
  validateRequest,
  signup
);

route.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  validateRequest,
  login
);

route.get("/profile", authUser, profile);
route.get("/logout", authUser, logout);

route.put("/profile", authUser, upload.single("image"), updateProfile);

route.post("/history", authUser, addHistory);

export default route;
