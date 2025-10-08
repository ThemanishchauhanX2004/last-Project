import express from "express"
import authMiddleware from "../middleware/passwordVrification.js"
import{addToCart , getCart} from "../Controllers/Cart.js"
let cartRouter = express.Router()

cartRouter.post("/add" , authMiddleware , addToCart)
cartRouter.get("/get" , authMiddleware , getCart)

export default cartRouter