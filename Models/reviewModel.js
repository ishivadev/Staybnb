const mongoose = require("mongoose");
const Schema = require("mongoose");

const reviewSchema = new mongoose.Schema({
    comment: String,
    rating: {
        type: String,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;