import express from "express";
import { toggleWishlist, getWishlist } from "../controllers/wishListController.js";
import authMiddleware from '../middleware/auth.js'

const router = express.Router();

router.post("/toggle", authMiddleware, toggleWishlist);
router.get("/", authMiddleware, getWishlist);

export default router;
