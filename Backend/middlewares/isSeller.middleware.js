import Business from "../models/Business.js";

export const isSeller = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role === "user") {
      return res
        .status(401)
        .json({ message: "Unauthorized: Not a seller", success: false });
    }
    const business = await Business.findOne({ seller: user._id });
    
    if (!business) {
      console.log("not found");
      
      return res
        .status(404)
        .json({ message: "Business not found", success: false });
    }
    if (business.seller.toString() !== user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Not a seller", success: false });
    }

    return next();
  } catch (error) {
    console.error("Error in isSeller middleware:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
