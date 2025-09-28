import express from "express"
import {getproduct , addProduct} from "../Controllers/Products"
import upload from "../middleware/multer";
import handleMulterError from "../middleware/multer/handleMulterError.js"
import multer from "multer";
let ProductRouter = express.Router()

ProductRouter.get("/" , getproduct);
ProductRouter.post("/add-product" , upload.array("image" , 2) , handleMulterError  , multer)


export default ProductRouter