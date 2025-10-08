import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import gatConnection from "./Database/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./Routers/User.js";
import ProductRouter from "./Routers/Products.js";
import cartRouter from "./Routers/Cart.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;  // ⚠️ Make sure this matches your frontend fetch URL

// ✅ CORS setup (very important for cookies + fetch)
app.use(cors({
  origin: "http://localhost:5173",   // React app ka URL
  credentials: true,                 // allow cookies
}));

// ✅ Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Database connection
gatConnection();

// ✅ Routes
app.use("/user", userRouter);
app.use("/product", ProductRouter);
app.use("/cart", cartRouter);

// ✅ Server start
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
