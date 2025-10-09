import express from "express"
import authMiddleware from "../middleware/passwordVrification.js"
import{addToCart , getCart , updateCart} from "../Controllers/Cart.js"
let cartRouter = express.Router()

cartRouter.post("/add" , authMiddleware , addToCart)
cartRouter.get("/get" , authMiddleware , getCart)
cartRouter.post("/update" , authMiddleware , updateCart)

export default cartRouter