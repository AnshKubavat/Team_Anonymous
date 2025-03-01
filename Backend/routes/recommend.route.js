import { Router } from "express";
import axios from "axios";

const route = Router();

route.post("/", async (req, res) => {
    try {
      const { user_id } = req.body;
  
      if (!user_id) {
        
        return res.status(400).json({ error: "User ID is required" });
      }
      // Forward request to Flask server
      const response = await axios.post(
        `${process.env.FLASK_URL}/recommend`,
        { user_id },
        { headers: { "Content-Type": "application/json" } }
      );
  
    
      return res.json(response.data);
    } catch (error) {
    
      return res.status(500).json({ error: "Failed to fetch recommendations" });
    }
  });
  
  export default route;