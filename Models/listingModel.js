const mongoose = require("mongoose");
const Schema = require("mongoose");
const Review = require("./reviewModel.js")
const User = require("./userModel.js");

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        url: String,
        filename: String
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
    {
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    category: {
        type: String,
        enum: ["Trending", "Rooms", "Iconic Cities", "Mountains", "Castles", "Amazing Pools", "Camping", "Farms", "Arctic","Domes", "Boats"]
    }
    // geometry: {
    //     type: {
    //       type: String, // Don't do `{ location: { type: String } }`
    //       enum: ['Point'], // 'location.type' must be 'Point'
    //       required: true
    //     },
    //     coordinates: {
    //       type: [Number],
    //       required: true
    //     }
    // }
    
})


//POST middleware for DELETE review route
listingSchema.post("findOneAndDelete", async(deletedListing) => {
    console.log("Post Middleware for Delete Listing Route");
    if(deletedListing) {
        await Review.deleteMany({_id: {$in: deletedListing.reviews}});
    }
    
    // for(let reviewId of deletedListing.reviews){
    //     let delReview = await Review.findByIdAndDelete(reviewId);
    //     console.log(`Deleted reviewId: ${reviewId} and Deleted review: ${delReview}`);
    // }
})


const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;