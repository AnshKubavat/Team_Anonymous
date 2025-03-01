import express from "express";
import { getDistance } from "../controllers/location.controller.js";
const router = express.Router();

router.post("/", getDistance)


export default router