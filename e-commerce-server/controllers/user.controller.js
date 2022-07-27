const userModel = require("../models/user.model")
const cartModel = require("../models/cart.model")


const registerUser = (req, res) => {
    const newUser = req.body
    const email = newUser.email
    userModel.findOne({ email: email }, (err, result) => {
        if (err) {
            res.status(501).send({ message: "Internal server error", status: false })
        } else {
            if (result) {
                res.send({ message: "Email already exists in our database", status: false })
            } else {
                const form = new userModel(newUser)
                form.save((err) => {
                    if (err) {
                        console.log("an error occured");
                        res.send({ message: "user signup failed", status: false })
                    }
                    else { res.send({ message: "registration successful", status: true }) }
                })
            }
        }
    })
}

const signIn = (req, res) => {
    userModel.find({ email: req.body.email, password: req.body.password }, (err, result) => {
        if (err) {
            console.log(err);
            res.send({ message: "Server Error, please hold on", status: false })
        }
        else {
            if (result.length > 0) {
                console.log(result);
                console.log("login successful", result[0]);
                res.send({ message: "Welcome", status: true, result: result[0] })
            }
            else {
                res.send({ message: "Invalid Email or password", status: false })
            }
        }
    })
}

const toCart = (req, res) => {
    let product = req.body
    const cart = new cartModel({ productName: product.productName, description: product.description, price: product.price, quantity: product.quantity, image: product.pImg, subTotal: product.subTotal })
    cartModel.find((err, result) => {
        if (err) {
            console.log(err, "Error");
        } else {
            cart.save((error) => {
                if (error) {
                    console.log(error, "fail");
                } else {
                    console.log(result, "Success");
                }
            })
        }
    })
}

const displayCart = (req, res) => {
    cartModel.find((err, result) => {
        res.send(result)
    })
}

const handleDelete = (req, res) => {
    let myIndex = req.body
    console.log(myIndex)
    cartModel.deleteOne({_id:myIndex}, (err, result)=>{
        if (err) {
            console.log("Delete failed");
        }
        else{
            console.log("delete successful", result);
            

        }
    })
}

module.exports = { registerUser, signIn, toCart, displayCart, handleDelete }