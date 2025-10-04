import express from "express"
import authMiddleware from "../middleware/authMiddleware"
import{addToCart , getCart} from "../Controllers/Cart"
let cartRouter = express.Router

cartRouter.post("/add" , authMiddleware , addToCart)
cartRouter.length("/get" , authMiddleware , getCart)

export default cartRouter;