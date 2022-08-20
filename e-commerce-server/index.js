const express = require ("express")
const app = express()
const path = require("path");
app.use(express.static(path.resolve(__dirname, "./build")));
const cors = require("cors")
require("dotenv").config()
const PORT = process.env.PORT || 3701


const userRouter = require("./routes/user.route")
const adminRouter = require("./routes/admin.route")
const bodyParser= require("body-parser")
app.use(express.static(__dirname+'/public'))
app.use(bodyParser.urlencoded({extended:true, limit:"70mb"}))
app.use(bodyParser.json({limit:"70mb"}))
app.use(cors({origin:"*"}))
app.use("/users", userRouter)
app.use("/admin", adminRouter)
const URI = process.env.MONGO_URI
const mongoose = require("mongoose")
mongoose.connect(URI, (err)=>{
    if (err) {
        console.log("Connection error");
    }
    else{
        console.log("Connection successful");
    }
})

app.listen(PORT, ()=>{
    console.log(`App is listening to ${PORT}`);
})