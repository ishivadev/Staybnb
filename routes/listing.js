const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const { isLoggedIn } = require("../middleware.js");
const { validateListing, isOwner } = require("../middleware.js");

const listingController = require("../Controllers/listingController.js")
const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })

const Listing = require("../Models/listingModel.js")


//Listing Router.route
router.route("/")
    .get( wrapAsync( listingController.index ) )
    .post( isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync( listingController.createListing ));
    

//New route
router.get("/new", isLoggedIn, listingController.renderNewForm );

//Listing Id Router.route
router.route("/:id")
    .get( wrapAsync( listingController.showListing ))
    .put( isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync( listingController.updateListing ))
    .delete( isLoggedIn, isOwner, wrapAsync( listingController.destroyListing ));

//Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync( listingController.renderEditForm ));


module.exports = router;