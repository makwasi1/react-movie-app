const express = require("express")
const router = express.Router()
const {Signup,Login,Logout,Authchecker,Users} = require("../controllers/login")
const {authenticate} = require("../helpers/auth")

router.route("/signup").post(Signup)
router.route("/login").post(Login)
router.route("/users").get(Users)
router.route("/logout").delete(Logout)
router.route("/authchecker").get(Authchecker) 
router.route("/tokenIsValid").post(authenticate)

module.exports = router