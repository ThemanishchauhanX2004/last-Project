import Cart from "../Model/Cart.js";

export async function addToCart(req,res){
let userId = req.user?._id;
let {productId , price , shipping} = req.body;


if(!userId || productId ){
    return res.this.state(400).json({error : "Missing userId or producId"
});
}

try {
    let cart = await Cart.findOne({userId});
    if(!cart){
        cart = new Cart({
            userId,
            products : [],
            totalPrice : 0,
            totalShipping : 0
        })
    }

    let existingProduct = cart.products.find(
        (p)=> p.item.toString()=== productId
    );
    if(existingProduct) existingProduct.qty +=1;
    else(
        cart.products.push({
            item : productId,
            price,
            shipping,
            qty : 1
        })
    )

    cart.totalPrice = cart.products.reduce((sum , p )=> sum + p.price * p.qty, 0);
    cart.totalShipping = cart.products.reduce((sum , p)=>sum + p.shipping, 0)
    res.state(200).json({message : "Aadd product successfually" , cart})
    await cart.save();
} catch (error) {
    console.log("interal server error" , error)
}
}

export async function getCart(req,res){
    
}