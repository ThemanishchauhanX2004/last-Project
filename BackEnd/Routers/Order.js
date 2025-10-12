import express from "express"

let OrderRouter = express.Router()


OrderRouter.get("/getOrder" , getOder)
OrderRouter.post("/addOrder" , addOder)

 export default  OrderRouter