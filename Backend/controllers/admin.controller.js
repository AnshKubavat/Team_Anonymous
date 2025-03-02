import { Types } from "mongoose";
import Contact from "../models/Contact.js";
import Business from "../models/Business.js";

export async function createContact(req, res) {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(404).json({ error: "All fields are required" });
    }

    const contact = new Contact({ name, email, message });
    await contact.save();

    res.status(201).json({ message: { contact }, success: true });
  } catch (error) {
    console.error("Error creating contactUs:", error);
    res.status(500).json({
      message: "Server error. Please try again later.",
      success: false,
    });
  }
}

export async function gettingContact(req, res) {
  try {
    const data = await Contact.find({});
    return res
      .status(200)
      .json({ message: Array.isArray(data) ? data : [], success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
}

export async function delettingContact(req, res) {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "Invalid Contact ID", success: false });
    }

    const contact = await Contact.findById(id);
    if (!contact) {
      return res
        .status(404)
        .json({ message: "Contact Not Found", success: false });
    }

    await Contact.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Contact Deleted Successfully", success: true });
  } catch (error) {
    console.error("Error in delete contact: Backend", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
}

export const fetchAllSeller = async (req, res) => {
  try {
    const sellers = await Business.find({});
    res.status(200).json({ message: sellers, success: true });
  } catch (error) {
    console.error("Error in fetchAllSeller: Backend", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
export const fetchAllBusinesses = async (req, res) => {
  try {
    const businesses = await Business.aggregate([
      {
        $match: { isDeleted: false },
      },
      {
        $lookup: {
          from: "users",
          localField: "seller",
          foreignField: "_id",
          as: "sellerDetails",
        },
      },
      {
        $unwind: { path: "$sellerDetails", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "products",
          localField: "products",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "reviews",
          foreignField: "_id",
          as: "reviewDetails",
        },
      },
      {
        $project: {
          _id: 1,
          businessName: 1,
          description: 1,
          city: 1,
          categoryOfBusiness: 1,
          address: 1,
          isActive: 1,
          "sellerDetails._id": 1,
          "sellerDetails.name": 1,
          "sellerDetails.username": 1,
          "sellerDetails.email": 1,
          productCount: { $size: "$productDetails" },
          reviewCount: { $size: "$reviewDetails" },
        },
      },
    ]);

    if (!businesses.length) {
      return res
        .status(200)
        .json({ success: false, message: "No active businesses found" });
    }

    res.status(200).json({
      success: true,
      message: { businesses },
    });
  } catch (error) {
    console.error("Error fetching businesses:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const fetchAllDeletedBusinesses = async (req, res) => {
  try {
    const businesses = await Business.aggregate([
      {
        $match: { isDeleted: true },
      },
      {
        $lookup: {
          from: "users",
          localField: "seller",
          foreignField: "_id",
          as: "sellerDetails",
        },
      },
      {
        $unwind: { path: "$sellerDetails", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "products",
          localField: "products",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "reviews",
          foreignField: "_id",
          as: "reviewDetails",
        },
      },
      {
        $project: {
          _id: 1,
          businessName: 1,
          description: 1,
          city: 1,
          categoryOfBusiness: 1,
          address: 1,
          isActive: 1,
          "sellerDetails._id": 1,
          "sellerDetails.name": 1,
          "sellerDetails.username": 1,
          "sellerDetails.email": 1,
          productCount: { $size: "$productDetails" },
          reviewCount: { $size: "$reviewDetails" },
        },
      },
    ]);

    if (!businesses.length) {
      return res
        .status(200)
        .json({ success: false, message: "No active businesses found" });
    }

    res.status(200).json({
      success: true,
      message: { businesses },
    });
  } catch (error) {
    console.error("Error fetching businesses:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
