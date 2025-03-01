import Business from "../models/Business.js";

export const fetchSeller = async (req, res) => {
  try {
    const { cityname } = req.params;

    const businesses = await Business.aggregate([
      {
        $match: { city: cityname, isDeleted: false },
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
          from: "reviews", // Collection name for reviews
          localField: "reviews",
          foreignField: "_id",
          as: "reviewDetails",
        },
      },
      {
        $lookup: {
          from: "users", // Collection name for users (seller)
          localField: "seller",
          foreignField: "_id",
          as: "sellerDetails",
        },
      },
      {
        $project: {
          _id: 1,
          businessName: 1,
          seller: { $arrayElemAt: ["$sellerDetails", 0] },
          city: 1,
          categoryOfBusiness: 1,
          address: 1,
          description: 1,
          image: 1,
          businessLocation: 1,
          products: "$productDetails",
          reviews: "$reviewDetails",
        },
      },
    ]);

    if (!businesses.length) {
      return res
        .status(200)
        .json({ message: "No businesses found in this city.", success: false });
    }

    res.status(200).json({ message: { businesses }, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const fetchCategoryOfBusiness = async (req, res) => {
  try {
    const { cityname, category } = req.params;

    const matchCondition = {
      city: cityname,
      isDeleted: false,
    };

    if (category !== "all") {
      matchCondition.categoryOfBusiness = category;
    }

    const businesses = await Business.aggregate([
      { $match: matchCondition },
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
        $lookup: {
          from: "users",
          localField: "seller",
          foreignField: "_id",
          as: "sellerDetails",
        },
      },
      {
        $project: {
          _id: 1,
          businessName: 1,
          seller: { $arrayElemAt: ["$sellerDetails", 0] },
          city: 1,
          categoryOfBusiness: 1,
          address: 1,
          description: 1,
          image: 1,
          businessLocation: 1,
          products: "$productDetails",
          reviews: "$reviewDetails",
        },
      },
    ]);

    if (!businesses.length) {
      return res.status(200).json({
        message: "No businesses found for this city and category.",
        success: false,
      });
    }

    res.status(200).json({ message: { businesses }, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
