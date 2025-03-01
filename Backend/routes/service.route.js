import express from "express";
import {
  createService,
  deleteService,
  updateServiceStatus,
} from "../controllers/service.controller.js";
import { isSeller } from "../middlewares/isSeller.middleware.js";
const router = express();

router.post("/create", createService);
router.put("/:serviceId/status", isSeller, updateServiceStatus);
router.delete("/:serviceId", isSeller, deleteService);

export default router;
