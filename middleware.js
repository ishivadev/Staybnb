const Listing = require("./Models/listingModel.js");
const Review = require("./Models/reviewModel.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js")


module.exports.isLoggedIn = (req, res, next) => {
    //console.log(req);
    //console.log(`Path: ${req.path}, "And the Original Path: ${req.originalUrl}`);
    if(!req.isAuthenticated()) {
        //Storing the req.originUrl 
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in.");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You don't have permission of this listing.");
        return res.redirect(`/listings/${id}`)
    }
    next();
}

//Validation function - Joi schema (sercver side validation)
module.exports.validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    //console.log(error);
    if(error) {
        let errorMsg = error.details.map((el) => el.message).join(",");
        next(new ExpressError(400, errorMsg))
    } else {
        next();
    }
}

//Validation review - Joi schema (sercver side validation)
module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error) {
        let errorMsg = error.details.map((el) => el.message).join(",");
        next(new ExpressError(400, errorMsg));
    } else {
        next();
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You're not the author of this review.");
        return res.redirect(`/listings/${id}`)
    }

    next();
}