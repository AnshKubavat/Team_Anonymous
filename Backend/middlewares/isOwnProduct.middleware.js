import Business from "../models/Business.js";

export const isOwnProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const user = req.user;

    const business = await Business.findOne({ seller: user._id }).populate(
      "products"
    );

    if (!business) {
      return res
        .status(404)
        .json({ message: "Business not found", success: false });
    }

    const product = business.products.find(
      (product) => product._id.toString() === productId
    );

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }

    return next();
  } catch (error) {
    console.error("Error in isOwnProduct middleware:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
