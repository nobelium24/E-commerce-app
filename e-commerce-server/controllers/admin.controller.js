const adminModel = require("../models/admin.model");
const productsModel = require("../models/products.model")
const cloudinary = require("cloudinary")
const jwt = require("jsonwebtoken")
const SECRET = process.env.JWT_SECRET
const bcrypt = require("bcryptjs")
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})


const registerAdmin = (req, res) => {
    const newAdmin = req.body
    adminModel.find({ email: req.body.email, username: req.body.username }, (err, result) => {
        if (err) {
            console.log(err, "There is an error");
        }
        else {
            if (result.length > 0) {
                console.log(result);
                console.log("User Exist");
                res.send({ message: "User or email exists", status: false })
            }
            else {
                const form = new adminModel(newAdmin)
                form.save((err) => {
                    if (err) {
                        console.log("Registration unsuccessful");
                        res.send({ message: "Registration unsuccessful", status: false })
                    }
                    else {
                        res.send({ message: "Registration successful", status: true })

                    }
                })
            }
        }
    })
}

const signIn = (req, res) => {
    const password = req.body.password
    const email = req.body.email
    adminModel.findOne({ email: email }, (err, user) => {
        // if (err) {
        //     console.log(err);
        //     res.send({ message: "Server error", status: false })
        // }
        // else {
        //     if (result.length > 0) {
        //         console.log(result);
        //         res.send({ message: `welcome`, status: true, result: result[0] })
        //     }
        //     else {
        //         console.log(result);
        //         console.log("Login unsuccessful");
        //         res.send({ message: `Invalid email or password`, status: false })
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
                        console.log(err, "Error");
                    }
                    else if (same == true) {
                        console.log("Success");
                        jwt.sign({ email }, SECRET, (err, token) => {
                            if (token) {
                                res.send({ token: token, message: "Welcome admin", status: true, result: { firstname: user.firstname, email: user.email, lastname: user.lastname } })
                            } else { res.send({ message: "error", status: false }) }
                        })
                    }
                    else if (same == false) {
                        res.send({ message: "Invalid log in details", status: "false" })
                    }
                })
            }
        }
    })
}

const adminDashCheck = (req, res) => {
    const auth = req.headers.authorization
    const token = auth.split(' ')[1]
    console.log(token);
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            console.log(err.message);
            res.send({ message: "Failed" })
        }
        else {
            console.log(decoded.email)
            res.send({ message: 'verification successful', email: decoded.email })
        }
    })

}

const uploadProducts = (req, res) => {
    const file = req.body.files
    cloudinary.v2.uploader.upload(file, (err, result) => {
        if (err) {
            console.log(err);
            res.send({ message: "upload failed" })
        }
        else {
            console.log(result.secure_url);
            res.send({ message: "Upload successful", image: result.secure_url })
            const products = new productsModel({ products: result.secure_url, description: req.body.description, price: req.body.price, productName: req.body.productName })
            productsModel.find((err, result) => {
                if (err) {
                    console.log(err, "Upload failed");
                }
                else {

                    products.save((err) => {
                        if (err) {
                            console.log(err, "Fail");
                        }
                        else {
                            console.log(result, "Success");
                        }
                    })
                }
            })
        }
    })
}

const displayProducts = (req, res) => {
    productsModel.find((err, result) => {
        res.send(result)
        // console.log(result);
    })
}

const handleDelete = (req, res) => {
    let myIndex = req.body
    console.log(myIndex)
    productsModel.deleteOne({ _id: myIndex }, (err, result) => {
        if (err) {
            console.log("Delete failed");
        }
        else {
            console.log("delete successful", result);


        }
    })
}



module.exports = { registerAdmin, signIn, uploadProducts, displayProducts, handleDelete, adminDashCheck }