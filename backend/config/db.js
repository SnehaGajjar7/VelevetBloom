import mongoose from "mongoose";

export const connectDB = async () => {
    try {
      await mongoose.connect("mongodb+srv://snehagajjar2004:sriP51BQ4NB0CKH5@cluster0.xi9lxae.mongodb.net/", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("✅ MongoDB connected");
    } catch (error) {
      console.error("❌ MongoDB connection failed:", error.message);
      process.exit(1);
    }
  };
  