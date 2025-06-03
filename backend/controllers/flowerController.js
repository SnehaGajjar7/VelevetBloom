import flowerModel from "../model/flowerModel.js";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import path from "path";
import userModel from "../model/userModel.js";

const addFlower = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      occassion,
      decoration,
      type,
      contains,
      isNew,
      isTrending,
    } = req.body;

    // Assuming you're uploading one main image and multiple gallery images
    const mainImage = req.files["mainImage"]?.[0]?.filename;
    const galleryImages =
      req.files["galleryImages"]?.map((file) => file.filename) || [];

    if (!mainImage) {
      return res
        .status(400)
        .json({ success: false, message: "Main image is required" });
    }

    const flower = new flowerModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      occassion: req.body.occassion,
      decoration: req.body.decoration,
      type: req.body.type,
      contains: req.body.contains,
      image: req.files.mainImage[0].filename,
      imageGallery: req.files.galleryImages.map((file) => file.filename),
      isNew: isNew === "true", // convert string to boolean
      isTrending: isTrending === "true",
    });

    await flower.save();
    res.json({ success: true, message: "Flower added with gallery" });
  } catch (error) {
    console.error("Error in addFlower:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const listFlower = async (req, res) => {
  try {
    const flowers = await flowerModel.find({});

    // Add averageRating to each flower
    const flowersWithRatings = flowers.map((flower) => {
      const avg =
        flower.reviews.length > 0
          ? (
              flower.reviews.reduce((sum, review) => sum + review.rating, 0) /
              flower.reviews.length
            ).toFixed(1)
          : 0;

      return {
        ...flower._doc,
        averageRating: avg,
      };
    });

    res.json({ success: true, data: flowersWithRatings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching flowers" });
  }
};

const removeFlower = async (req, res) => {
  try {
    const flower = await flowerModel.findById(req.body.id);

    if (!flower) {
      return res
        .status(404)
        .json({ success: false, message: "Flower not found" });
    }

    if (
      flower.image &&
      typeof flower.image === "string" &&
      flower.image.trim() !== ""
    ) {
      const mainImagePath = path.join(__dirname, "../uploads", flower.image);
      if (fs.existsSync(mainImagePath)) {
        fs.unlinkSync(mainImagePath);
      }
    }

    if (Array.isArray(flower.imageGallery)) {
      flower.imageGallery.forEach((filename) => {
        if (
          filename &&
          typeof filename === "string" &&
          filename.trim() !== ""
        ) {
          const imgPath = path.join(__dirname, "../uploads", filename);
          if (fs.existsSync(imgPath)) {
            fs.unlinkSync(imgPath);
          }
        }
      });
    }

    await flowerModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Flower deleted successfully" });
  } catch (error) {
    console.error("Error in removeFlower:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error while deleting flower" });
  }
};

const getFlowerById = async (req, res) => {
  try {
    const flower = await flowerModel.findById(req.params.id);
    if (!flower) {
      return res
        .status(404)
        .json({ success: false, message: "Flower not found" });
    }

    res.json({ success: true, data: flower });
  } catch (error) {
    console.error("Error in getFlowerById:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const createReview = async (req, res) => {
  try {
    const flower = await flowerModel.findById(req.params.id);
    if (!flower) {
      return res
        .status(404)
        .json({ success: false, message: "Flower not found" });
    }

    const { rating, comment } = req.body;
    if (!rating || !comment) {
      return res
        .status(400)
        .json({ success: false, message: "Rating and comment required" });
    }
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const newReview = {
      user: req.userId,
      name: user.name,
      rating,
      comment,
      createdAt: new Date(),
    };

    flower.reviews.push(newReview);
    flower.numReviews = flower.reviews.length;
    flower.rating =
      flower.reviews.reduce((acc, item) => acc + item.rating, 0) /
      flower.reviews.length;

    await flower.save();

    res.json({ success: true, message: "Review added", data: flower });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getRelatedFlowers = async (req, res) => {
  try {
    const flower = await flowerModel.findById(req.params.id);
    if (!flower) return res.status(404).json({ message: "Flower not found" });

    const related = await flowerModel
      .find({
        _id: { $ne: flower._id },
        category: flower.category,
      })
      .limit(100);

    res.json({ success: true, data: related });
  } catch (error) {
    console.error("Error in getRelatedFlowers:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export {
  addFlower,
  listFlower,
  removeFlower,
  getFlowerById,
  createReview,
  getRelatedFlowers,
};
