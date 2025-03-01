import mongoose from "mongoose";
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

export const getOwnBusiness = async (req, res) => {
  try {
    const user = req.user;

    if (!user?._id) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    const business = await Business.aggregate([
      {
        $match: {
          seller: user._id,
          isDelete: { $ne: true }, // Ensure isDelete is not true
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "reviews",
          foreignField: "_id",
          as: "reviews",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "seller",
          foreignField: "_id",
          as: "seller",
        },
      },
      { $unwind: { path: "$seller", preserveNullAndEmptyArrays: true } },

      // Exclude password from the seller
      {
        $project: {
          "seller.password": 0, // Exclude password field
        },
      },
    ]);

    if (!business.length) {
      return res
        .status(404)
        .json({ message: "Business not found", success: false });
    }

    return res.status(200).json({ business: business[0], success: true });
  } catch (error) {
    console.error("Error fetching business:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const getBusiness = async (req, res) => {
  try {
    const { businessId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(businessId)) {
      return res
        .status(400)
        .json({ message: "Invalid Business ID", success: false });
    }

    const business = await Business.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(businessId),
          isDelete: { $ne: true }, // Ensure isDelete is not true
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "reviews",
          foreignField: "_id",
          as: "reviews",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "seller",
          foreignField: "_id",
          as: "seller",
        },
      },
      { $unwind: { path: "$seller", preserveNullAndEmptyArrays: true } },

      {
        $project: {
          "seller.password": 0,
        },
      },
    ]);

    if (!business.length) {
      return res
        .status(404)
        .json({ message: "Business not found", success: false });
    }

    return res.status(200).json({ business: business[0], success: true });
  } catch (error) {
    console.error("Error fetching business:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const updateBusiness = async (req, res) => {
  try {
    const { businessId } = req.params;
    const { businessName, city, categoryOfBusiness, description } = req.body;

    let updatedFields = {
      businessName,
      city,
      description,
      categoryOfBusiness,
    };

    const updatedBusiness = await Business.findOneAndUpdate(
      { _id: businessId, isDeleted: false },
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedBusiness) {
      return res
        .status(404)
        .json({ message: "Business not found or deleted", success: false });
    }

    res.status(200).json({ business: updatedBusiness, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const deleteBusiness = async (req, res) => {
  try {
    const { businessId } = req.params;

    const business = await Business.findById(businessId).populate("seller");

    if (!business) {
      return res
        .status(404)
        .json({ message: "Business not found", success: false });
    }

    if (business.seller) {
      business.seller.role = "user";
      await business.seller.save();
    }

    await business.save();

    await Product.updateMany(
      { owner: businessId },
      { $set: { isDeleted: true } }
    );

    res.status(200).json({
      message: "Business and related products soft deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting business:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
