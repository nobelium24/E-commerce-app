const express = require ("express")
const router = express.Router()
const userController = require ("../controllers/user.controller")
router.post("/signup", userController.registerUser)
router.post("/signin", userController.signIn)
router.post("/postcart", userController.toCart)
router.post("/getcart", userController.displayCart)
router.post("/deletecart", userController.handleDelete)


module.exports = router