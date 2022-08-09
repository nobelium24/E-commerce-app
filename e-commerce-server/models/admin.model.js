const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String
})

let saltRound = 10
userSchema.pre("save", function (next) {
    bcrypt.hash(this.password, saltRound, (err, hashedPassword) => {
        if (err) {
            console.log(err, "Error occured");
        }
        else{
            this.password = hashedPassword
            next()
        }
    })
})

const adminModel = mongoose.model("admin_tb", userSchema)
module.exports = adminModel