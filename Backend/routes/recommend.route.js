import { Router } from "express";
import axios from "axios";

const route = Router();

route.post("/", async (req, res) => {
  try {
    const { user_id, city } = req.body;
    console.log(req.body);

    if (!user_id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // 🔹 Call Flask API
    const business = await axios.post(
      `${process.env.FLASK_URL}/recommend`,
      { user_id },
      { headers: { "Content-Type": "application/json" } }
    );

    // ✅ Correctly filter businesses by city
    const filteredBusinesses = business.data.filter((b) => b.city === city);

    return res.json(filteredBusinesses);
  } catch (error) {
    console.error("Error fetching recommendations:", error.message);
    return res.status(500).json({ error: "Failed to fetch recommendations" });
  }
});

export default route;
