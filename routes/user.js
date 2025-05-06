const express = require("express");
const router = express.Router();
const User = require("../Models/userModel.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../Controllers/userController.js");

//Signup Router.route
router.route("/signup")
.get( userController.renderSignupForm )
.post( wrapAsync( userController.signup ) );

//Login Router.route
router.route("/login")
.get( userController.renderLoginForm )
.post( saveRedirectUrl, passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), userController.login )

//Logout route
router.get("/logout", userController.logout )


module.exports = router;