import cloudinary from "../config/Cloudinary.js";
import products from "../Model/ProductsModel.js";
import fs from "fs"; 

export async function getproduct(req, res) {
  try {
    let product = await products.find();
    res.json(product);
  } catch (error) {
    res.status(400).json({  
      error: error,
    });
  }
}
export async function addProduct(req, res) {
  try {
    let imageUrl = [];

    if (req.files) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "uploads",
        });

        imageUrl.push(result.secure_url);
        fs.unlinkSync(file.path); 
      }
    }

    const newProduct = new products({ 
      productName: req.body.productName,
      productPrice: Number(req.body.productPrice),
      description: req.body.description,
      productCategory: req.body.productCategory,
      productImage: imageUrl,
      productCount: Number(req.body.productCount),
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    console.log("Product add error:", err);
    res.status(400).json({ error: err.message || "Failed to add product" });
  }
}

export async function  updateProduct(req , res){
    
}