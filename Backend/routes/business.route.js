import express from "express";
const router = express.Router();
import upload from "../middlewares/multer.middleware.js";
import {
  createBusiness,
  getOwnBusiness,
  getBusiness,
  updateBusiness,
} from "../controllers/business.controller.js";
import {
  addProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { isSeller } from "../middlewares/isSeller.middleware.js";
import { isOwnProduct } from "../middlewares/isOwnProduct.middleware.js";

router.post("/", upload.single("image"), createBusiness);
router.get("/seller", isSeller, getOwnBusiness);
router.put("/:businessId", isSeller, updateBusiness);


router.get("/:businessId", getBusiness);

//ONLY FOR SELLER

router.post("/product", isSeller, upload.single("image"), addProduct);
router.put("/product/:productId", isSeller, isOwnProduct, updateProduct);
router.delete("/product/:productId", isSeller, isOwnProduct, deleteProduct);

router.get("/product/:productId", isSeller, isOwnProduct, getProduct);

export default router;
