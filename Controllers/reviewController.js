const Review = require("../Models/reviewModel.js")
const Listing = require("../Models/listingModel.js")

module.exports.createReview = async(req, res) => {
    let { id } = req.params;
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    //console.log(`New review with Author: ${newReview}`);
    let listing = await Listing.findById(id);
    listing.reviews.push(newReview);
    
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created.");
    res.redirect(`/listings/${id}`);
    console.log("New review saved.");
}

module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;
    
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}} );    
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted.");
    res.redirect(`/listings/${id}`)
}