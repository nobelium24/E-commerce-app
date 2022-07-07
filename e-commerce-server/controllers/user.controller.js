const userModel = require("../models/user.model")


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
    userModel.find({email:req.body.email, password:req.body.password}, (err, result)=>{
        if (err) {
            console.log(err);
            res.send({message:"Server Error, please hold on", status:false})
        }
        else{
            if (result.length > 0) {
                console.log(result);
                console.log("login successful", result[0]);
                res.send({message:"Welcome", status:true, result:result[0]})
            }
            else{
                res.send({message:"Invalid Email or password", status:false})
            }
        }
    })
}

module.exports = {registerUser, signIn}