
import products from "../Model/ProductsModel.js"
export  async function getproduct (req , res){
try {
    let product = await products.find()
    res.joson(product)
} catch (error) {
    res.state(400).joson({
        error: error
    })
}
}