import products from "../Model/ProductsModel.js";
import cloudinary from "../config/Cloudinary.js";
import fs from "fs";

export async function getproduct(req, res) {
  try { res.json(await products.find()); }
  catch (err) { res.status(500).json({ error: "Failed to fetch products" }); }
}


export async function addProduct(req, res) {
  try {
    const imageUrls = [];
    if (req.files) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, { folder: "uploads" });
        imageUrls.push(result.secure_url);
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
      }
    }

    const newProduct = new products({
      productName: req.body.productName,
      productPrice: Number(req.body.productPrice),
      description: req.body.description,
      productCategory: req.body.productCategory,
      productCount: Number(req.body.productCount),
      productImage: imageUrls
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) { res.status(500).json({ error: "Failed to add product" }); }
}

export async function updateProduct(req, res) {
  try {
    const updatedProduct = await products.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ error: "Product not found" });
    res.json(updatedProduct);
  } catch (err) { res.status(500).json({ error: "Failed to update product" }); }
}


export async function deleteProduct(req, res) {
  try {
    const deleted = await products.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) { res.status(500).json({ error: "Failed to delete product" }); }
}
