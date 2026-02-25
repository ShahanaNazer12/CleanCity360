const express = require("express");
const { register, login, logout, profileUpdate, passwordUpdate, viewProfile } = require("../controllers/authController");
const { userAuth } = require("../middlewares/userAuth");



const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(userAuth,logout)
router.route("/profile-update").put(userAuth,profileUpdate)
router.route("/password-update").patch(userAuth,passwordUpdate)
router.route("/view-profile").get(userAuth,viewProfile)

module.exports = router