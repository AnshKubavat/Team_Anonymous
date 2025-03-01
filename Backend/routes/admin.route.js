import express from "express";
import {
  createContact,
  gettingContact,
  delettingContact,
  fetchAllBusinesses,
} from "../controllers/admin.controller.js";
const router = express.Router();

router.post("/contact", createContact);
router.get("/allcontacts", gettingContact);
router.delete("/allcontacts/:id", delettingContact);
router.get("/allbusinesses", fetchAllBusinesses);

export default router;
