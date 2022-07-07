const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    firstname:String,
    lastname: String,
    email: String,
    password: String
})

const adminModel = mongoose.model("admin_tb", userSchema)
module.exports = adminModel