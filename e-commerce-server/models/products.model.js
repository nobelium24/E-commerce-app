const mongoose = require("mongoose")
const productsSchema = mongoose.Schema({
    products:String,
    productName:String,
    description:String, 
    price:String,


})
const productsModel = mongoose.model("products_tb", productsSchema)
module.exports = productsModel