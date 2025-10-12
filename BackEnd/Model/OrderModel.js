import mongoose, { Schema } from "mongoose";

let OrderModel = new mongoose.Schema({
    userId: {type: Schema.Types.ObjectId, ref: "User" , required : true},
    products:[
        {
            productId:{
                type:Schema.Types.ObjectId, ref: "Product" , required : true
            },
            quantity :{
                type:Number , required:true
            },
            price:{type:Number, required : true},

        }
    ],
    totalAmount : {type:Number , required:true},
    status:{type: String, default : "Pending"}
},{
    timestamps:true
})

let order  = mongoose.model("Oeder" , OrderModel)
export default order