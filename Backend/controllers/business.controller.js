import { v2 as cloudinary } from "cloudinary";
import Business from "../models/Business.js";

export const createBusiness = async (req, res) => {
  try {
    const {
      businessName,
      city,
      categoryOfBusiness,
      description,
      latitude,
      longitude,
      facility,
    } = req.body;
    let image = req.file;
    const user = req.user;

    if (image) {
      const imageUpload = await cloudinary.uploader.upload(image.path, {
        folder: "NearByGo",
        resource_type: "auto",
      });

      image = imageUpload.secure_url;
    }

    if (user.role === "seller") {
      return res
        .status(200)
        .json({ message: "Bussiness already exists", success: false });
    }
    if (
      !businessName ||
      !city ||
      !categoryOfBusiness ||
      !description ||
      !latitude ||
      !longitude ||
      !facility
    ) {
      return res
        .status(404)
        .json({ message: "Please provide all details", success: false });
    }

    const newBusiness = new Business({
      businessName,
      city,
      description,
      seller: user._id,
      categoryOfBusiness,
      businessLocation: { latitude, longitude },
      facility,
      image,
    });

    user.role = "seller";
    await user.save();

    await newBusiness.save();

    res
      .status(201)
      .json({ messasge: { business: newBusiness }, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, success: false });
  }
};
