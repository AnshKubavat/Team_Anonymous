import Business from "../models/Business.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

export const addProduct = async (req, res) => {
  try {
    const imageFile = req.file;
    const user = req.user;
    const { name, price, description } = req.body;
    const business = await Business.findOne({ seller: user._id });
    if (!business) {
      return res
        .status(404)
        .json({ message: "Business not found", success: false });
    }

    if (!name || !price) {
      return res
        .status(400)
        .json({ message: "Please provide all details", success: false });
    }

    let imageUrl = null;

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        folder: "NearByGo",
        resource_type: "auto",
      });

      imageUrl = imageUpload.secure_url;
    }

    const newProduct = await new Product({
      name,
      price,
      description,
      image: imageUrl,
      owner: business._id,
    }).save();

    business.products.push(newProduct._id);
    await business.save();

    res.status(201).json({ message: { product: newProduct }, success: true });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message, success: false });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ message: "Invalid Product ID", success: false });
    }

    const productData = await Product.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(productId),
          isDeleted: { $ne: true },
        },
      },
      {
        $lookup: {
          from: "businesses",
          localField: "owner",
          foreignField: "_id",
          as: "businessDetails",
        },
      },
      { $unwind: "$businessDetails" },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          description: 1,
          image: 1,
          owner: 1,
          "businessDetails.businessName": 1,
          "businessDetails.city": 1,
        },
      },
    ]);

    const product = productData.length ? productData[0] : null;

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }

    res.status(200).json({ product, success: true });
  } catch (error) {
    console.error("Error in getProduct:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, price, description } = req.body;
    const user = req.user;
    const imageFile = req.file;

    const business = await Business.findOne({ seller: user._id });

    if (!business) {
      return res
        .status(404)
        .json({ message: "Business not found", success: false });
    }

    let updatedFields = { name, price, description };

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        folder: "NearByGo",
        resource_type: "auto",
      });
      updatedFields.image = imageUpload.secure_url;
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId, owner: business._id },
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }

    res.status(200).json({ product: updatedProduct, success: true });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = req.user;

    const business = await Business.findOne({ seller: user._id });
    if (!business) {
      return res
        .status(404)
        .json({ message: "Business not found", success: false });
    }

    const product = await Product.findOne({
      _id: productId,
      owner: business._id,
    });
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }

    product.isDeleted = true;
    await product.save();

    res
      .status(200)
      .json({ message: "Product soft deleted successfully", success: true });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });7
  }
};
