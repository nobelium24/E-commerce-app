const mongoose = require ("mongoose")
const cartSchema = mongoose.Schema({
    productName:String, 
    description:String, 
    price:String, 
    quantity:String,
    image:String, 
    subTotal:String,
    email:String
})
const cartModel = mongoose.model("cart_tb", cartSchema)
module.exports=cartModel