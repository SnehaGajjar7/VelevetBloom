import express from "express";
import multer from "multer";
import fs from "fs";
import { addFlower, createReview, getFlowerById, getRelatedFlowers, listFlower, removeFlower } from "../controllers/flowerController.js";
import authMiddleware from '../middleware/auth.js'

const flowerRouter = express.Router();

// Ensure uploads directory exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage:storage });

flowerRouter.post(
  "/add",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 5 }, 
  ]),
  addFlower
);

  
flowerRouter.get("/list",listFlower)
flowerRouter.post("/remove",removeFlower)
flowerRouter.get("/:id",getFlowerById)
flowerRouter.post("/:id/reviews",authMiddleware, createReview);
flowerRouter.get('/:id/related', getRelatedFlowers);

export default flowerRouter;
