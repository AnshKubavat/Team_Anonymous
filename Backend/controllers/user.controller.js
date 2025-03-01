import BlacklistToken from "../models/BlackListToken.model.js";
import User from "../models/User.js";
import { createUser } from "../Services/user.service.js";
import { v2 as cloudinary } from "cloudinary";

export const signup = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const existsUser = await User.findOne({ email });
    if (existsUser) {
      return res
        .status(409)
        .json({ message: "User already exists", success: false });
    }

    const hashedPassword = await User.hashPassword(password);

    const user = await createUser({
      username,
      email,
      password: hashedPassword,
    });

    const token = user.setToken();
    res.cookie("token", token);

    return res.status(201).json({ message: { user, token }, success: true });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e, success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }
    const validUser = await user.comparePassword(password);
    if (!validUser) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }

    const token = user.setToken();
    res.cookie("token", token);
    return res.status(200).json({ message: { user, token }, success: true });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e, success: false });
  }
};

export const profile = async (req, res) => {
  try {
    return res.status(200).json({ message: { user: req.user }, success: true });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e, success: false });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await BlacklistToken.create({ token });
    return res.status(200).json({ message: "Logged Out", success: true });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e, success: false });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = req.user;
    const { username } = req.body;
    if (req.file) {
      const imageUpload = await cloudinary.uploader.upload(req.file.path, {
        folder: "NearByGo",
        resource_type: "auto",
      });

      user.image = imageUpload.secure_url;
    }
    if (username) {
      user.username = username;
    }
    await user.save();
    return res.status(200).json({ message: { user }, success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
export const addHistory = async (req, res) => {
  try {
    const { user } = req;
    const { category } = req.body;

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (category) {
      // Ensure the history array does not exceed 20 entries
      if (user.history.length >= 20) {
        user.history.shift(); 
      }

      user.history.push(category); // Add the new category
    }

    await user.save();

    return res.status(200).json({ message: "History updated", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};
