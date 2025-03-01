import express from 'express';
import { fetchCategoryOfBusiness, fetchSeller } from '../controllers/useCity.controller.js';
const router = express.Router();

router.get("/city/:cityname", fetchSeller);
router.get("/city/:cityname/:category", fetchCategoryOfBusiness);

export default router;