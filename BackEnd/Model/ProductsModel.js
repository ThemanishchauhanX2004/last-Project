import { Schema, Types } from "mongoose";

let productsSchema = new Schema({
    productName :{
        types : String,
        required : true,
        unique : true,
        trim : true
    },
    productImage:{
        types:[String],
        required : true
    },
    productCount :{
        types : Number,
        required: true,
        min : 0
    },
    productCategory :{
        types : Number,
        required: true,
        enum :["Men" , "Women" , "Kids"]
    },
    description :{
        types : Number,
        required: true,
    }
    

})
let products = mongoose.model("Product", productsSchema);

export default products
