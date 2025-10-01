import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  description: { type: String },
  productCategory: { type: String, enum: ["Men","Women","Kids"], default: "Men" },
  productImage: { type: [String], default: [] },
  productCount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);
