import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import "dotenv/config";
import flowerRouter from "./router/flowerRoute.js";
import userRouter from "./router/userRoute.js";
import cartRouter from "./router/cartRouter.js";
import wishListRouter from "./router/wishListRouter.js";
import orderRouter from "./router/orderRouter.js";
import contactRouter from "./router/contactRouter.js";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"], // allow both
  credentials: true,
}));

connectDB();

app.use("/api/flower", flowerRouter);
app.use("/api/user", userRouter);
app.use("/uploads", express.static("uploads"));
app.use("/api/cart",cartRouter)
app.use("/api/wishlist", wishListRouter);
app.use("/api/order",orderRouter)
app.use("/api/contact",contactRouter)

app.all("*", (req, res) => {
  console.log("404 Not Found:", req.method, req.originalUrl);
  res.status(404).json({ message: "Route not found", path: req.originalUrl });
});


app.listen(port, () =>
  console.log(`Port is running on http://localhost:${port}`)
);
