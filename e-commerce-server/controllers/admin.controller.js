const adminModel = require("../models/admin.model");
const productsModel = require("../models/products.model")
const cloudinary = require("cloudinary")
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
    adminModel.find({ email: req.body.email, password: req.body.password }, (err, result) => {
        if (err) {
            console.log(err);
            res.send({ message: "Server error", status: false })
        }
        else {
            if (result.length > 0) {
                console.log(result);
                res.send({ message: `welcome`, status: true, result: result[0] })
            }
            else {
                console.log(result);
                console.log("Login unsuccessful");
                res.send({ message: `Invalid email or password`, status: false })
            }
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
            const products = new productsModel({ products: result.secure_url, description:req.body.description, price:req.body.price})
            productsModel.find((err, res) => {
                if (err) {
                    console.log(err, "Upload failed");
                }
                else {
                    
                    products.save((err)=>{
                        if (err) {
                            console.log(err, "Fail");
                        }
                        else{
                            console.log(res, "Success");
                        }
                    })
                }
            })
        }
    })
}

const displayProducts = (req, res) => {
    productsModel.find((err, result)=>{
        res.send(result)
        // console.log(result);
    })
}

const handleDelete = (req, res) => {
    let myIndex = req.body.ind
    productsModel.deleteOne({_id:myIndex}, (err, result)=>{
        if (err) {
            console.log("Delete failed");
        }
        else{
            console.log("delete successful", result);
            

        }
    })
}



module.exports = { registerAdmin, signIn, uploadProducts, displayProducts, handleDelete }