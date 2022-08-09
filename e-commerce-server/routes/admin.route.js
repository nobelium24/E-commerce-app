const express = require ("express")
const router = express.Router()
const adminController = require("../controllers/admin.controller")
router.post("/signup", adminController.registerAdmin)
router.post("/signin", adminController.signIn)
router.post("/postproducts", adminController.uploadProducts)
router.get("/getproducts", adminController.displayProducts)
router.post("/delete", adminController.handleDelete)
router.get("/dashcheck", adminController.adminDashCheck)

module.exports = router