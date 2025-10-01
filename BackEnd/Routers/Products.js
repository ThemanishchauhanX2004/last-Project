import express from "express";
import { getproduct, addProduct, updateProduct, deleteProduct } from "../Controllers/Products.js";
import upload, { handleMulterError } from "../middleware/multer.js";

const ProductRouter = express.Router();

ProductRouter.get("/", getproduct);
ProductRouter.post("/add-product", upload.array("image", 2), handleMulterError, addProduct);
ProductRouter.patch("/update-product/:id", updateProduct);
ProductRouter.delete("/delete-product/:id", deleteProduct);

export default ProductRouter;
