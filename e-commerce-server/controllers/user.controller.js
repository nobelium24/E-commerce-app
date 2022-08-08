const userModel = require("../models/user.model")
const cartModel = require("../models/cart.model")
const jwt = require("jsonwebtoken")
const SECRET = process.env.JWT_SECRET
const bcrypt = require("bcryptjs")


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
    const password = req.body.password
    const email = req.body.email
    userModel.findOne({ email: email }, (err, user) => {
        console.log(user);
        // if (err) {
        //     console.log(err);
        //     res.send({ message: "Server Error, please hold on", status: false })
        // }
        // else {
        //     if (result.length > 0) {
        //         console.log(result);
        //         console.log("login successful", result[0]);
        //         res.send({ message: "Welcome", status: true, result: result[0] })
        //     }
        //     else {
        //         res.send({ message: "Invalid Email or password", status: false })
        //     }
        // }
        if (err) {
            res.status(501).send({ message: "Server Error", status: false })
        } else {
            if (!user) {
                res.send({ message: "Invalid Email", status: false })
            } else {
                bcrypt.compare(password, user.password, (err, same) => {
                    if (err) {
                        console.log(err, 33);
                    }
                    else if (same == true) {

                        console.log("Success");
                        jwt.sign({ email }, SECRET, (err, token) => {
                            if (token) {
                                console.log(`token: ${token}`)
                                res.send({ token: token, message: "welcome", status: "true", result: { firstname: user.firstname, email: user.email, lastname: user.lastname } })
                            }
                            else { res.send({ message: "error", status: false }) }

                        })

                    }
                    else if (same == false) {
                        res.send({ message: "Invalid log in details", status: "false", })
                        console.log("Fail")
                    }
                })
            }
        }
    })
}
const dashCheck = (request, response) => {
    const auth = request.headers.authorization
    // const token = auth.split(' ')[1]
    const token = request.token
    console.log(token)
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log(err.message)
            response.send({ message: err.message })
        }

        else {
            console.log(decoded.username)

            response.send({ message: 'verification successful', username: decoded.username })
        }
    })
}
const toCart = (req, res) => {
    let product = req.body
    const cart = new cartModel({
        productName: product.productName,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        image: product.pImg,
        subTotal: product.subTotal,
        email: product.email
    })
    console.log(cart);
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
    console.log(req.body.email)
    cartModel.find({ email: req.body.email }, (err, result) => {
        res.send(result)
        // console.log(result);
    })
}

const handleDelete = (req, res) => {
    let myIndex = req.body
    console.log(myIndex)
    cartModel.deleteOne({ _id: myIndex }, (err, result) => {
        if (err) {
            console.log("Delete failed");
        }
        else {
            console.log("delete successful", result);


        }
    })
}

const clearCart = (req, res) => {
    let clear = req.body

    console.log(req.body)
    cartModel.deleteMany({ email: clear.email }, (err, result) => {
        if (err) {
            console.log(err, "Delete failed");
        }
        else {
            console.log("delete successful", result);
        }
    })

}



module.exports = { registerUser, signIn, toCart, displayCart, handleDelete, clearCart, dashCheck}